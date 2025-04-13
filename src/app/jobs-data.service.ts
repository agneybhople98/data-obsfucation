import { Injectable } from '@angular/core';
import { concat, map, Observable, of, switchMap, timer } from 'rxjs';

export interface JobElement {
  jobId: string;
  jobName: any;
  jobDescription: string;
  triggeredOn: string;
  progress: number;
  status: 'success' | 'in-progress' | 'failed';
  tasks: any;
}

export interface JobDataControlElement {
  jobControlId: string;
  jobControlName: any;
  jobControlDescription: string;
  lastTriggeredOn: string;
}

const ELEMENT_DATA: JobElement[] = [
  {
    jobId: 'RUN-98765',
    jobName: 'Healthcare service US',
    jobDescription: 'Healthcare Service Prod data - US',
    triggeredOn: '04/01/2025 07:23:12AM',
    status: 'in-progress',
    progress: 17,
    tasks: [
      {
        taskId: 'TASK-12345',
        taskDescription: 'Masking customer names',
        status: 'In Progress',
        errorMessage: 'TASK-12345 was successfull',
        startTime: '2024-04-01 08:30:15',
        endTime: '2024-04-01 08:45:00',
      },
      {
        taskId: 'TASK-12346',
        taskDescription: 'Encrypting social security numbers',
        status: 'In Progress',
        errorMessage: 'TASK-12345 was successfull',
        startTime: '2024-04-01 08:45:30',
        endTime: '2024-04-01 09:00:45',
      },
      {
        taskId: 'TASK-12347',
        taskDescription: 'Anonymizing addresses',
        status: 'In Progress',
        errorMessage: 'TASK-12345 was successfull',
        startTime: '2024-04-01 09:01:10',
        endTime: '2024-04-01 09:15:22',
      },
      {
        taskId: 'TASK-12348',
        taskDescription: 'Masking phone numbers',
        status: 'In Progress',
        errorMessage: 'Task is in on going progress',
        startTime: '2024-04-01 09:20:00',
        endTime: '2024-04-01 09:30:18',
      },
      {
        taskId: 'TASK-12349',
        taskDescription: 'Shuffling demographic data',
        status: 'In Progress',
        errorMessage: 'TASK-12345 was on going progress',
        startTime: '2024-04-01 09:35:10',
        endTime: '2024-04-01 10:15:30',
      },
      {
        taskId: 'TASK-12350',
        taskDescription: 'Substituting email addresses',
        status: 'In Progress',
        errorMessage: null,
        startTime: '2024-04-01 10:20:00',
        endTime: '2024-04-01 10:25:18',
      },
    ],
  },
  {
    jobId: 'RUN-00123',
    jobName: 'Insurance Claims Db',
    jobDescription: 'Insurance claims settlement prod instance',
    triggeredOn: '04/02/2025 07:33:22AM',
    status: 'success',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12346',
        taskDescription: 'Encrypting social security numbers',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 08:45:30',
        endTime: '2024-04-01 09:00:45',
      },
    ],
  },
  {
    jobId: 'RUN-98763',
    jobName: 'Healthcare service US',
    jobDescription: 'Healthcare Service Prod data - NA',
    triggeredOn: '04/04/2025 08:22:10AM',
    status: 'failed',
    progress: 50,
    tasks: [
      {
        taskId: 'TASK-12347',
        taskDescription: 'Anonymizing addresses',
        status: 'Failed',
        errorMessage: 'Invalid address format detected',
        startTime: '2024-04-01 09:01:10',
        endTime: '2024-04-01 09:15:22',
      },
    ],
  },
  {
    jobId: 'RUN-98762',
    jobName: 'Healthcare service US',
    jobDescription: 'Healthcare Service Prod data - AUS',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12349',
        taskDescription: 'Masking phone numbers',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 10:05:12',
        endTime: '2024-04-01 10:30:45',
      },
    ],
  },
  {
    jobId: 'RUN-98762',
    jobName: 'RadiologyImages_Metadata',
    jobDescription:
      'Metadata about X-rays, MRIs, and CT scans (excluding actual images)',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12350',
        taskDescription: 'Shuffling demographic data',
        status: 'Completed',
        errorMessage: null,
        startTime: '2024-04-01 10:35:10',
        endTime: '2024-04-01 11:15:30',
      },
    ],
  },
  {
    jobId: 'RUN-98762',
    jobName: 'PATIENT_MASTER_PROD',
    jobDescription: 'Master Db for patient demographics',
    triggeredOn: '04/05/2025 09:30:33AM',
    status: 'success',
    progress: 100,
    tasks: [
      {
        taskId: 'TASK-12351',
        taskDescription: 'Substituting email addresses',
        status: 'Failed',
        errorMessage: `'SQL Error: ORA-00904: "EMAILID": invalid identifier https://docs.oracle.com/error-help/db/ora-00904/00904. 00000 - "%s: invalid identifier"'`,
        startTime: '2024-04-01 11:20:00',
        endTime: '2024-04-01 11:25:18',
      },
    ],
  },
];

const ELEMENT_DATA_JOB_CONTROL: JobDataControlElement[] = [
  {
    jobControlId: 'RUN-98765',
    jobControlName: 'Healthcare service US',
    jobControlDescription: 'Healthcare Service Prod data - US',
    lastTriggeredOn: '04/01/2025 07:23:12AM',
  },
  {
    jobControlId: 'RUN-00123',
    jobControlName: 'Insurance Claims Db',
    jobControlDescription: 'Insurance claims settlement prod instance',
    lastTriggeredOn: '04/02/2025 07:33:22AM',
  },
  {
    jobControlId: 'RUN-98763',
    jobControlName: 'Healthcare service US',
    jobControlDescription: 'Healthcare Service Prod data - NA',
    lastTriggeredOn: '04/04/2025 08:22:10AM',
  },
  {
    jobControlId: 'RUN-98762',
    jobControlName: 'Healthcare service US',
    jobControlDescription: 'Healthcare Service Prod data - AUS',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
  },
  {
    jobControlId: 'RUN-98762',
    jobControlName: 'RadiologyImages_Metadata',
    jobControlDescription:
      'Metadata about X-rays, MRIs, and CT scans (excluding actual images)',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
  },
  {
    jobControlId: 'RUN-98762',
    jobControlName: 'PATIENT_MASTER_PROD',
    jobControlDescription: 'Master Db for patient demographics',
    lastTriggeredOn: '04/05/2025 09:30:33AM',
  },
];

@Injectable({
  providedIn: 'root',
})
export class JobsDataService {
  private jobsData: JobElement[] = ELEMENT_DATA;
  private jobsDataControlData: JobDataControlElement[] =
    ELEMENT_DATA_JOB_CONTROL;

  constructor() {}

  getJobById(jobId: string): JobElement | undefined {
    return this.jobsData.find((job) => job.jobId === jobId);
  }

  getAllJobs(): JobElement[] {
    return this.jobsData;
  }

  getAllJobControlData(): JobDataControlElement[] {
    return this.jobsDataControlData;
  }

  /**
   * Updates a single task status to "Completed"
   * @param jobId The ID of the job containing the task
   * @param taskIndex The index of the task in the tasks array
   * @returns The updated job if successful, undefined otherwise
   */
  private updateSingleTaskStatus(
    jobId: string,
    taskIndex: number
  ): JobElement | undefined {
    const job = this.getJobById(jobId);
    if (!job || !job.tasks || taskIndex >= job.tasks.length) {
      return undefined;
    }

    // Update the task at the specified index
    const task = job.tasks[taskIndex];
    task.status = 'Completed';
    // Set end time if it doesn't exist
    if (!task.endTime) {
      task.endTime = new Date()
        .toISOString()
        .replace('T', ' ')
        .substring(0, 19);
    }

    // Calculate progress based on completed tasks
    const completedTasks = job.tasks.filter(
      (t: any) => t.status === 'Completed'
    ).length;
    job.progress = Math.round((completedTasks / job.tasks.length) * 100);

    // Update job status if all tasks are completed
    if (completedTasks === job.tasks.length) {
      job.status = 'success';
    }

    return job;
  }

  /**
   * Updates task statuses one by one with a 1-second interval between each update
   * @param jobId The ID of the job containing the tasks
   * @returns An Observable that emits the updated job after each task update
   */
  updateTasksSequentially(jobId: string): Observable<JobElement | undefined> {
    const job = this.getJobById(jobId);
    if (!job || !job.tasks || job.tasks.length === 0) {
      return of(undefined);
    }

    // Create an array of observables, each updating one task after a delay
    const taskCount = job.tasks.length;
    const updateObservables: Observable<JobElement | undefined>[] = [];

    for (let i = 0; i < taskCount; i++) {
      // The delay increases by 1 second for each task
      const updateObservable = timer(400 * (i + 1)).pipe(
        map(() => this.updateSingleTaskStatus(jobId, i))
      );
      updateObservables.push(updateObservable);
    }

    // Concat all observables to run them sequentially
    return concat(...updateObservables);
  }
}
