import * as api from "./api";

export interface CreateGoalCompletionRequest {
  goalId: string;
}

export async function createGoalCompletion({
  goalId,
}: CreateGoalCompletionRequest): Promise<void> {
  const response = await api.post("completions", { goalId });

  if (!response.ok) {
    throw new Error("Error while creating the goal completion");
  }
}
