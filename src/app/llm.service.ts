import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LlmService {
  private readonly URL =
    'https://chat.ria-ai.riaproducts.com/api/chat/completions';
  private readonly TOKEN = 'sk-6586231d7d864822a4090b2a8db85f4d';

  constructor(private http: HttpClient) {}

  askLLM(userPrompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.TOKEN}`,
    });

    const messages: any[] = [
      {
        role: 'user',
        content: userPrompt,
      },
    ];

    const body: any = {
      model: 'Qwen/Qwen3-32B',
      messages: messages,
      stream: true,
    };

    return this.http.post<any>(this.URL, body, { headers }).pipe(
      catchError((error) => {
        console.error('Error while calling LLM:', error);
        return throwError(
          () => new Error(`Error while calling LLM: ${error.message || error}`)
        );
      })
    );
  }

  // Alternative method that returns a Promise (similar to the Java version)
  async askLLMPromise(userPrompt: string): Promise<string> {
    try {
      const response = await this.askLLM(userPrompt).toPromise();
      return JSON.stringify(response);
    } catch (error: any) {
      return `Error while calling LLM: ${error.message}`;
    }
  }
}
