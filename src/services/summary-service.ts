import type { GetSummaryResponse } from "../models/interfaces/summary";
import * as api from "./api";

export async function getSummary(): Promise<GetSummaryResponse> {
  const response = await api.get("summary");
  const data = await response.json();

  return data;
}
