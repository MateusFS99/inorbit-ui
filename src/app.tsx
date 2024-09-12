import { Dialog } from "./components/ui/dialog";
import { CreateGoal } from "./components/create-goal";
//import { EmptyGoals } from "./components/empty-goals";
import { WeeklySummary } from "./components/weekly-summary";

export function App() {
  return (
    <Dialog>
      {/* <EmptyGoals /> */}

      <WeeklySummary />

      <CreateGoal />
    </Dialog>
  );
}
