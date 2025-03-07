
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppointmentHeaderProps {
  onNewAppointment: () => void;
}

export function AppointmentHeader({ onNewAppointment }: AppointmentHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
      <h2 className="text-3xl font-bold tracking-tight">Agendamentos</h2>
      <Button className="w-full sm:w-auto" onClick={onNewAppointment}>
        <Plus className="mr-2 h-4 w-4" />
        Novo Agendamento
      </Button>
    </div>
  );
}
