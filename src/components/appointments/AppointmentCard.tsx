
import { Clock, User } from "lucide-react";

interface AppointmentCardProps {
  appointment: {
    id: number;
    patientName: string;
    professionalName: string;
    date: string;
    time: string;
    duration: number;
    type: string;
    status: string;
    insurance: string;
  };
}

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <div className="p-4 border rounded-lg transition-all hover:bg-muted/50">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0 w-1.5 h-14 bg-brand-400 rounded-full mt-1"></div>
          <div>
            <div className="flex items-center mb-1">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span className="text-sm font-medium">
                {appointment.time} - {parseInt(appointment.time.split(':')[0]) + 1}:00
              </span>
            </div>
            <h4 className="font-medium mb-1">
              {appointment.type}
            </h4>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                <span>{appointment.patientName}</span>
              </div>
              <div className="hidden sm:block">•</div>
              <span>{appointment.professionalName}</span>
            </div>
          </div>
        </div>
        <div className="flex items-start">
          <div className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            appointment.status === 'Confirmado'
              ? 'bg-green-100 text-green-800'
              : appointment.status === 'Pendente'
              ? 'bg-yellow-100 text-yellow-800'
              : appointment.status === 'Cancelado'
              ? 'bg-red-100 text-red-800'
              : 'bg-blue-100 text-blue-800'
          }`}>
            {appointment.status}
          </div>
        </div>
      </div>
    </div>
  );
}
