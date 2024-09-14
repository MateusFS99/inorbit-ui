export interface GetPendingGoalsResponse {
  pendingGoals: {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    completionCount: number;
  }[];
}

export interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}