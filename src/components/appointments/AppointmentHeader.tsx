
import { CalendarPlus, Calendar, Bell, Link, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppointmentHeaderProps {
  onNewAppointment: () => void;
  onOnlineBooking: () => void;
  onSendReminders: () => void;
  onCalendarIntegration: () => void;
  onReminderSettings: () => void;
}

export function AppointmentHeader({ 
  onNewAppointment,
  onOnlineBooking,
  onSendReminders,
  onCalendarIntegration,
  onReminderSettings
}: AppointmentHeaderProps) {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Agendamentos</h2>
        <div className="flex flex-wrap gap-2">
          <Button className="w-full sm:w-auto" onClick={onNewAppointment}>
            <CalendarPlus className="mr-2 h-4 w-4" />
            Novo Agendamento
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={onOnlineBooking}>
            <Calendar className="mr-2 h-4 w-4" />
            Agendamento Online
          </Button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="secondary" size="sm" onClick={onSendReminders}>
          <Bell className="mr-2 h-4 w-4" />
          Enviar Lembretes
        </Button>
        <Button variant="secondary" size="sm" onClick={onCalendarIntegration}>
          <Link className="mr-2 h-4 w-4" />
          Integrar Calendário
        </Button>
        <Button variant="secondary" size="sm" onClick={onReminderSettings}>
          <Users className="mr-2 h-4 w-4" />
          Configurar Lembretes
        </Button>
      </div>
    </div>
  );
}
