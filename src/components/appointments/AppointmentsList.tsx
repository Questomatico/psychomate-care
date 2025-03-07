
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentCard } from "./AppointmentCard";
import { EmptyAppointments } from "./EmptyAppointments";

interface AppointmentsListProps {
  formattedDate: string;
  appointments: Array<{
    id: number;
    patientName: string;
    professionalName: string;
    date: string;
    time: string;
    duration: number;
    type: string;
    status: string;
    insurance: string;
  }>;
  onNewAppointment: () => void;
}

export function AppointmentsList({ 
  formattedDate, 
  appointments, 
  onNewAppointment 
}: AppointmentsListProps) {
  return (
    <Card className="lg:col-span-2 overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="capitalize">{formattedDate}</CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        ) : (
          <EmptyAppointments onNewAppointment={onNewAppointment} />
        )}
      </CardContent>
    </Card>
  );
}
