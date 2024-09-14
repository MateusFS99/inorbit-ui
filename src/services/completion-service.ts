import type {
  CreateGoalCompletionRequest,
  DeleteGoalCompletionRequest,
} from "../models/interfaces/completion";
import * as api from "./api";

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest): Promise<void> {
  const response = await api.post("completions", { goalId });

  if (!response.ok) {
    throw new Error("Error while creating the goal completion");
  }
}

export async function deleteGoalCompletion({
  completionId,
}: DeleteGoalCompletionRequest): Promise<void> {
  const response = await api.remove("completions", { completionId });

  if (!response.ok) {
    throw new Error("Error while removing the goal completion");
  }
}
