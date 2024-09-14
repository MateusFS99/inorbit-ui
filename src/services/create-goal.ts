import * as api from "./api";

export interface CreateGoalRequest {
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal({
  title,
  desiredWeeklyFrequency,
}: CreateGoalRequest): Promise<void> {
  const response = await api.post("goals", {
    title,
    desiredWeeklyFrequency,
  });

  if (!response.ok) {
    throw new Error("Error while creating the goal");
  }
}
