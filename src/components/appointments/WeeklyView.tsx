
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Appointment } from "./AppointmentCalendar";
import { AppointmentCard } from "./AppointmentCard";
import { Plus } from "lucide-react";

interface WeeklyViewProps {
  date: Date;
  appointments: Appointment[];
  onNewAppointment: () => void;
  selectedProfessional?: string;
}

export function WeeklyView({ 
  date, 
  appointments, 
  onNewAppointment,
  selectedProfessional 
}: WeeklyViewProps) {
  // Get the start and end of the week
  const start = startOfWeek(date, { weekStartsOn: 1 }); // start on Monday
  const end = endOfWeek(date, { weekStartsOn: 1 });
  
  // Get all days in the week
  const days = eachDayOfInterval({ start, end });
  
  // Group appointments by day
  const appointmentsByDay = days.map(day => {
    const dayStr = format(day, "yyyy-MM-dd");
    const dayApps = appointments.filter(app => app.date === dayStr);
    return {
      date: day,
      appointments: dayApps
    };
  });

  return (
    <Card className="lg:col-span-2 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">
          Semana de {format(start, "d", { locale: ptBR })} a {format(end, "d 'de' MMMM", { locale: ptBR })}
          {selectedProfessional && ` - ${selectedProfessional}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {appointmentsByDay.map(day => (
            <div key={format(day.date, "yyyy-MM-dd")} className="border rounded-md p-4">
              <h3 className="font-medium mb-3 capitalize">
                {format(day.date, "EEEE, d", { locale: ptBR })}
              </h3>
              
              {day.appointments.length > 0 ? (
                <div className="space-y-3">
                  {day.appointments.map(appointment => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-20 border border-dashed rounded-md">
                  <Button variant="ghost" onClick={onNewAppointment}>
                    <Plus className="mr-2 h-4 w-4" />
                    Agendar consulta
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
