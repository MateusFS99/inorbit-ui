import type {
  CreateGoalRequest,
  GetPendingGoalsResponse,
} from "../models/interfaces/goal";
import * as api from "./api";

export async function getPendingGoals(): Promise<GetPendingGoalsResponse> {
  const response = await api.get("pending-goals");
  const data = await response.json();

  return data;
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
