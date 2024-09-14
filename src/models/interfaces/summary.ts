export interface GetSummaryResponse {
  summary: {
    completed: number;
    total: number;
    goalsPerDay: Record<
      string,
      {
        id: string;
        title: string;
        createdAt: string;
      }[]
    >;
  };
}