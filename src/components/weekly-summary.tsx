import { CheckCircle2, Plus } from "lucide-react";
import { InOrbitIcon } from "./in-orbit-icon";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Button } from "./ui/button";
import { Progress, ProgressIndicator } from "./ui/progress-bar";
import { Separator } from "./ui/separator";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-BR";
import { PendingGoals } from "./pending-goals";
import { deleteGoalCompletion } from "../services/completion-service";
import { useQueryClient } from "@tanstack/react-query";
import type { GetSummaryResponse } from "../models/interfaces/summary";

dayjs.locale(ptBR);

interface WeeklySummaryProps {
  summary: GetSummaryResponse["summary"];
}

export function WeeklySummary({ summary }: WeeklySummaryProps) {
  const fromDate = dayjs().startOf("week").format("D[ de ]MMMM");
  const toDate = dayjs().endOf("week").format("D[ de ]MMMM");

  const queryClient = useQueryClient();

  const completedPercentage = Math.round(
    (summary.completed * 100) / summary.total
  );

  const handleDeleteGoalCompletion = async (completionId: string) => {
    await deleteGoalCompletion({ completionId });

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
  };

  return (
    <main className="max-w-[540px] py-10 px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <InOrbitIcon />
          <span className="text-lg font-semibold capitalize">
            {fromDate} - {toDate}
          </span>
        </div>

        <DialogTrigger asChild>
          <Button size="sm">
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <div className="flex flex-col gap-3">
        <Progress value={summary.completed} max={summary.total}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>
            Você completou{" "}
            <span className="text-zinc-100">{summary.completed}</span> de{" "}
            <span className="text-zinc-100">{summary.total}</span> metas nessa
            semana.
          </span>
          <span>{completedPercentage}%</span>
        </div>
      </div>

      <Separator />

      <PendingGoals />

      <div className="space-y-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(summary.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format("dddd");
          const parsedDate = dayjs(date).format("D[ de ]MMMM");

          return (
            <div className="space-y-4" key={date}>
              <h3 className="font-medium capitalize">
                {weekDay}{" "}
                <span className="text-zinc-400 text-xs">({parsedDate})</span>
              </h3>

              <ul className="space-y-3">
                {goals.map((goal) => {
                  const parsedTime = dayjs(goal.createdAt).format("HH:mm[h]");

                  return (
                    <li className="flex items-center gap-2" key={goal.id}>
                      <CheckCircle2 className="size-4 text-pink-500" />

                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às{" "}
                        <span className="text-zinc-100">{parsedTime}</span>
                      </span>

                      <button
                        type="button"
                        className="text-xs text-zinc-500 underline hover:text-zinc-300"
                        onClick={() => handleDeleteGoalCompletion(goal.id)}
                      >
                        Desfazer
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </main>
  );
}
