export interface TimeLogSegment {
  id?: number;
  startTime: string;
  endTime?: string;
}

export interface TimeLog {
  id?: number;
  freelancerId: number;
  jobId: number;
  startTime?: string;
  endTime?: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  segments: TimeLogSegment[];
}
