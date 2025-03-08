
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameMonth, getDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Appointment } from "./AppointmentCalendar";
import { cn } from "@/lib/utils";

interface MonthlyViewProps {
  date: Date;
  appointments: Appointment[];
  onNewAppointment: () => void;
  selectedProfessional?: string;
}

export function MonthlyView({ 
  date, 
  appointments, 
  onNewAppointment,
  selectedProfessional 
}: MonthlyViewProps) {
  // Get the start and end of the month, including padding days
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Add padding days to start from Monday
  const dayOfWeekOfFirstDay = getDay(monthStart); // 0 = Sunday, 1 = Monday, etc.
  const paddingDaysBefore = dayOfWeekOfFirstDay === 0 ? 6 : dayOfWeekOfFirstDay - 1; // Adjust for Monday start
  
  const paddedStart = new Date(monthStart);
  paddedStart.setDate(paddedStart.getDate() - paddingDaysBefore);
  
  // We want to show 6 weeks in total (42 days) for consistency
  const allDays = eachDayOfInterval({
    start: paddedStart, 
    end: new Date(paddedStart.getTime() + 41 * 24 * 60 * 60 * 1000)
  });
  
  // Days of the week headers (starting Monday)
  const daysOfWeek = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  
  // Group appointments by day
  const getAppointmentsForDay = (day: Date) => {
    const dayStr = format(day, "yyyy-MM-dd");
    return appointments.filter(app => app.date === dayStr);
  };

  return (
    <Card className="lg:col-span-2 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">
          {format(date, "MMMM 'de' yyyy", { locale: ptBR })}
          {selectedProfessional && ` - ${selectedProfessional}`}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1">
          {/* Day headers */}
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-medium text-sm p-2">
              {day}
            </div>
          ))}
          
          {/* Calendar days */}
          {allDays.map(day => {
            const dayAppointments = getAppointmentsForDay(day);
            const isCurrentMonth = isSameMonth(day, date);
            
            return (
              <div 
                key={format(day, "yyyy-MM-dd")} 
                className={cn(
                  "min-h-[100px] border rounded-md p-1 relative overflow-hidden",
                  isCurrentMonth ? "bg-background" : "bg-muted/50 text-muted-foreground"
                )}
                onClick={() => {
                  onNewAppointment();
                }}
              >
                <div className="text-right text-sm p-1">
                  {format(day, "d")}
                </div>
                
                <div className="space-y-1">
                  {dayAppointments.slice(0, 3).map(app => (
                    <div 
                      key={app.id} 
                      className="bg-primary/10 text-primary text-xs p-1 rounded truncate"
                      title={`${app.time} - ${app.patientName} com ${app.professionalName}`}
                    >
                      {app.time} {app.patientName.split(" ")[0]}
                    </div>
                  ))}
                  
                  {dayAppointments.length > 3 && (
                    <div className="text-xs text-center text-muted-foreground">
                      +{dayAppointments.length - 3} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
