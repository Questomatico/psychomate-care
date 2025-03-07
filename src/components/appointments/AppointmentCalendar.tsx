
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  Plus,
  User
} from "lucide-react";

// Sample data for appointments
const appointments = [
  {
    id: 1,
    patientName: "Ana Silva",
    professionalName: "Dr. Carlos Mendes",
    date: "2023-06-15",
    time: "09:00",
    duration: 50,
    type: "Terapia Individual",
    status: "Confirmado",
    insurance: "Unimed",
  },
  {
    id: 2,
    patientName: "João Oliveira",
    professionalName: "Dra. Juliana Alves",
    date: "2023-06-15",
    time: "10:00",
    duration: 50,
    type: "Terapia Infantil",
    status: "Confirmado",
    insurance: "Bradesco Saúde",
  },
  {
    id: 3,
    patientName: "Mariana Costa",
    professionalName: "Dr. Ricardo Sousa",
    date: "2023-06-15",
    time: "11:00",
    duration: 50,
    type: "Terapia Familiar",
    status: "Pendente",
    insurance: "SulAmérica",
  },
  {
    id: 4,
    patientName: "Carlos Santos",
    professionalName: "Dr. Carlos Mendes",
    date: "2023-06-15",
    time: "14:00",
    duration: 50,
    type: "Terapia Individual",
    status: "Confirmado",
    insurance: "Particular",
  },
  {
    id: 5,
    patientName: "Patricia Lima",
    professionalName: "Dra. Juliana Alves",
    date: "2023-06-15",
    time: "15:00",
    duration: 50,
    type: "Terapia Infantil",
    status: "Confirmado",
    insurance: "Amil",
  },
];

// Sample data for professionals
const professionals = [
  { id: 1, name: "Dr. Carlos Mendes" },
  { id: 2, name: "Dra. Juliana Alves" },
  { id: 3, name: "Dr. Ricardo Sousa" },
  { id: 4, name: "Dra. Mariana Costa" },
  { id: 5, name: "Dr. Fernando Lima" },
];

export default function AppointmentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState<string | undefined>();

  // Format the selected date for display
  const formattedDate = date
    ? format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
    : "";

  // Get appointments for the selected date and (optionally) professional
  const getFilteredAppointments = () => {
    if (!date) return [];
    
    const dateString = format(date, "yyyy-MM-dd");
    
    return appointments.filter(app => {
      const matchesDate = app.date === dateString;
      const matchesProfessional = !selectedProfessional || 
        app.professionalName === selectedProfessional;
      
      return matchesDate && matchesProfessional;
    }).sort((a, b) => {
      // Sort by time
      return a.time.localeCompare(b.time);
    });
  };

  const filteredAppointments = getFilteredAppointments();

  // Create time slots from 8:00 to 18:00
  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = i + 8;
    return `${hour.toString().padStart(2, '0')}:00`;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Agendamentos</h2>
        <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Novo Agendamento
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 overflow-hidden transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              className="p-0 w-full rounded-md border mx-auto"
            />

            <Separator className="my-4" />

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Filtrar por Profissional</label>
                <Select
                  value={selectedProfessional}
                  onValueChange={setSelectedProfessional}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Todos os profissionais" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={undefined}>Todos os profissionais</SelectItem>
                    {professionals.map((professional) => (
                      <SelectItem key={professional.id} value={professional.name}>
                        {professional.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <div className="flex items-center space-x-1">
                  <Button variant="outline" size="icon">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="capitalize">{formattedDate}</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="p-4 border rounded-lg transition-all hover:bg-muted/50"
                  >
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
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {appointment.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Nenhum agendamento para esta data.
                  </p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Agendar Consulta
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
