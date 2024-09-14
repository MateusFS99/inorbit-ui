import * as api from "./api";

export interface GetPendingGoalsResponse {
  pendingGoals: {
    id: string;
    title: string;
    desiredWeeklyFrequency: number;
    completionCount: number;
  }[];
}

export async function getPendingGoals(): Promise<GetPendingGoalsResponse> {
  const response = await api.get("pending-goals");
  const data = await response.json();

  return data;
}
