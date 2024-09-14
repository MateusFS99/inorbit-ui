import { X } from "lucide-react";
import { Button } from "./ui/button";
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { createGoal } from "../services/goal-service";

const createGoalSchema = z.object({
  title: z.string().min(1, "Informe a atividade que deseja praticar"),
  desiredWeeklyFrequency: z.coerce.number().min(1).max(7),
});

type CreateGoalSchema = z.infer<typeof createGoalSchema>;

export function CreateGoal() {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<CreateGoalSchema>({
    resolver: zodResolver(createGoalSchema),
  });

  const weekDays = [
    {
      frequency: 1,
      emoji: "🥱",
    },
    {
      frequency: 2,
      emoji: "🙂",
    },
    {
      frequency: 3,
      emoji: "😎",
    },
    {
      frequency: 4,
      emoji: "😜",
    },
    {
      frequency: 5,
      emoji: "🤨",
    },
    {
      frequency: 6,
      emoji: "🤯",
    },
    {
      frequency: 7,
      emoji: "🔥",
    },
  ];

  async function handleCreateGoal({
    title,
    desiredWeeklyFrequency,
  }: CreateGoalSchema) {
    try {
      await createGoal({
        title,
        desiredWeeklyFrequency,
      });

      reset();

      queryClient.invalidateQueries({ queryKey: ["pending-goals"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });

      toast.success("Meta criada com sucesso!");
    } catch {
      toast.error("Erro ao criar a meta, tente novamente!");
    }
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full overflow-y-auto">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>

            <DialogClose>
              <X className="size-5 text-zinc-600" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex flex-col justify-between flex-1 gap-6"
        >
          <div className="space-y-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>

              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-red-400">{errors.title.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="desiredWeeklyFrequency">
                Quantas vezes na semana?
              </Label>

              <Controller
                control={control}
                name="desiredWeeklyFrequency"
                defaultValue={3}
                render={({ field }) => {
                  return (
                    <RadioGroup
                      value={String(field.value)}
                      onValueChange={field.onChange}
                    >
                      {weekDays.map((item) => {
                        return (
                          <RadioGroupItem
                            key={item.frequency}
                            value={item.frequency.toString()}
                          >
                            <RadioGroupIndicator />
                            <span className="text-zinc-300 text-sm font-medium leading-none">
                              {item.frequency === 7
                                ? "Todos os dias da semana"
                                : `${item.frequency}x na semana`}
                            </span>
                            <span className="text-lg leading-none">🥱</span>
                          </RadioGroupItem>
                        );
                      })}
                    </RadioGroup>
                  );
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 mt-auto">
            <DialogClose asChild>
              <Button variant="secondary" className="flex-1">
                Fechar
              </Button>
            </DialogClose>

            <Button type="submit" className="flex-1">
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
