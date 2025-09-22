import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface StreamingProgress {
  currentTable?: string;
  currentColumn?: string;
  totalColumns: number;
  processedColumns: number;
  recommendations: any[];
  isComplete: boolean;
  error?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LlmStreamingService {
  private streamingProgress = new BehaviorSubject<StreamingProgress>({
    totalColumns: 0,
    processedColumns: 0,
    recommendations: [],
    isComplete: false,
  });

  public streamingProgress$ = this.streamingProgress.asObservable();
  // It's recommended to move sensitive data like URLs and tokens to environment variables
  private readonly URL =
    'https://chat.ria-ai.riaproducts.com/api/chat/completions';
  private readonly TOKEN = 'sk-6586231d7d864822a4090b2a8db85f4d';

  constructor(private http: HttpClient) {}

  askLLMStreaming(userPrompt: string): Observable<StreamingProgress> {
    const progressSubject = new Subject<StreamingProgress>();
    let accumulatedContent = '';
    const currentProgress: StreamingProgress = {
      totalColumns: 0,
      processedColumns: 0,
      recommendations: [],
      isComplete: false,
    };

    // Make the streaming request
    fetch(this.URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.TOKEN}`,
      },
      // Corrected: The body must be a JSON string, and 'messages' should be an array.
      body: JSON.stringify({
        model: 'Qwen/Qwen3-32B',
        messages: [{ role: 'user', content: userPrompt }],
        stream: true,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        if (!reader) {
          throw new Error('No readable stream');
        }

        const decoder = new TextDecoder();

        const readStream = (): Promise<void> => {
          return reader.read().then(({ done, value }) => {
            if (done) {
              // Process final accumulated content
              this.processFinalContent(accumulatedContent, progressSubject);
              return;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split('\n');

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const dataStr = line.slice(6); // Remove 'data: ' prefix

                if (dataStr.trim() === '[DONE]') {
                  this.processFinalContent(accumulatedContent, progressSubject);
                  return;
                }

                try {
                  const data = JSON.parse(dataStr);
                  if (
                    data.choices &&
                    data.choices[0] &&
                    data.choices[0].delta &&
                    data.choices[0].delta.content
                  ) {
                    accumulatedContent += data.choices[0].delta.content;

                    // Try to extract partial recommendations and update progress
                    this.updateProgressFromPartialContent(
                      accumulatedContent,
                      progressSubject,
                      currentProgress
                    );
                  }
                } catch (e) {
                  // Ignore JSON parsing errors for partial chunks
                  console.debug('Chunk parsing error (expected):', e);
                }
              }
            }

            return readStream();
          });
        };

        return readStream();
      })
      .catch((error) => {
        progressSubject.next({
          ...currentProgress,
          error: error.message,
          isComplete: true,
        });
        progressSubject.complete();
      });

    return progressSubject.asObservable();
  }

  private updateProgressFromPartialContent(
    content: string,
    progressSubject: Subject<StreamingProgress>,
    currentProgress: StreamingProgress
  ): void {
    // Try to extract partial JSON or detect table/column mentions
    const tableMatches = content.match(/"table":\s*"([^"]+)"/g);
    const columnMatches = content.match(/"column":\s*"([^"]+)"/g);

    if (tableMatches && columnMatches) {
      const tables = tableMatches
        .map((match) => match.match(/"([^"]+)"$/)?.[1])
        .filter(Boolean) as string[];
      const columns = columnMatches
        .map((match) => match.match(/"([^"]+)"$/)?.[1])
        .filter(Boolean) as string[];

      const latestTable = tables[tables.length - 1];
      const latestColumn = columns[columns.length - 1];

      // Try to extract partial recommendations
      const partialRecommendations =
        this.extractPartialRecommendations(content);

      const updatedProgress: StreamingProgress = {
        ...currentProgress,
        currentTable: latestTable,
        currentColumn: latestColumn,
        processedColumns: partialRecommendations.length,
        recommendations: partialRecommendations,
        isComplete: false,
      };

      progressSubject.next(updatedProgress);
      this.streamingProgress.next(updatedProgress);
    }
  }

  private extractPartialRecommendations(content: string): any[] {
    const recommendations: any[] = [];

    // Try to extract complete recommendation objects
    const recRegex =
      /\{\s*"table":\s*"([^"]+)",\s*"column":\s*"([^"]+)",\s*"is_sensitive":\s*(true|false),\s*"recommended_function":\s*"([^"]+)"\s*\}/g;
    let match;

    while ((match = recRegex.exec(content)) !== null) {
      recommendations.push({
        table: match[1],
        column: match[2],
        is_sensitive: match[3] === 'true',
        recommended_function: match[4],
      });
    }

    return recommendations;
  }

  private processFinalContent(
    content: string,
    progressSubject: Subject<StreamingProgress>
  ): void {
    try {
      // Extract JSON from the response
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
      let jsonString = '';

      if (jsonMatch && jsonMatch[1]) {
        jsonString = jsonMatch[1].trim();
      } else {
        const jsonStart = content.indexOf('['); // Often the root is an array
        const jsonEnd = content.lastIndexOf(']');
        if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
          jsonString = content.substring(jsonStart, jsonEnd + 1);
        } else {
          const objStart = content.indexOf('{');
          const objEnd = content.lastIndexOf('}');
          if (objStart !== -1 && objEnd !== -1 && objEnd > objStart) {
            jsonString = content.substring(objStart, objEnd + 1);
          } else {
            throw new Error('No valid JSON found in response');
          }
        }
      }

      const llmResponse = JSON.parse(jsonString);
      const recommendations = llmResponse.recommendations || llmResponse;

      const finalProgress: StreamingProgress = {
        totalColumns: recommendations.length,
        processedColumns: recommendations.length,
        recommendations: recommendations,
        isComplete: true,
        currentTable: undefined,
        currentColumn: undefined,
      };

      progressSubject.next(finalProgress);
      this.streamingProgress.next(finalProgress);
      progressSubject.complete();
    } catch (error: any) {
      progressSubject.next({
        totalColumns: 0,
        processedColumns: 0,
        recommendations: [],
        isComplete: true,
        error: `Error parsing LLM response: ${error.message}`,
      });
      progressSubject.complete();
    }
  }
}
