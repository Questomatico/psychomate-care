
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyAppointmentsProps {
  onNewAppointment: () => void;
}

export function EmptyAppointments({ onNewAppointment }: EmptyAppointmentsProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <p className="text-muted-foreground">
          Nenhum agendamento para esta data.
        </p>
        <Button variant="outline" className="mt-4" onClick={onNewAppointment}>
          <Plus className="mr-2 h-4 w-4" />
          Agendar Consulta
        </Button>
      </div>
    </div>
  );
}
