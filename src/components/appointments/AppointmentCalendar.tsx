
import { useState } from "react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, startOfMonth, endOfMonth, addDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, Users, MailCheck, FileExport } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { initialAppointments, professionals } from "./AppointmentData";
import { AppointmentHeader } from "./AppointmentHeader";
import { CalendarSidebar } from "./CalendarSidebar";
import { AppointmentsList } from "./AppointmentsList";
import { AppointmentForm } from "./AppointmentForm";
import { WeeklyView } from "./WeeklyView";
import { MonthlyView } from "./MonthlyView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { OnlineBookingForm } from "./OnlineBookingForm";
import { CalendarIntegration } from "./CalendarIntegration";
import { ReminderSettings } from "./ReminderSettings";

export type ViewMode = "day" | "week" | "month";
export type Appointment = {
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

export default function AppointmentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState<string | undefined>();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isOnlineBookingOpen, setIsOnlineBookingOpen] = useState(false);
  const [isReminderSettingsOpen, setIsReminderSettingsOpen] = useState(false);
  const [isCalendarIntegrationOpen, setIsCalendarIntegrationOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const { toast } = useToast();

  // Format the selected date for display
  const formattedDate = date
    ? format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR })
    : "";

  // Get appointments for the selected date and (optionally) professional
  const getFilteredAppointments = () => {
    if (!date) return [];
    
    let appointmentsToFilter = [...appointments];
    let dateFilter: (app: Appointment) => boolean;
    
    if (viewMode === "day") {
      const dateString = format(date, "yyyy-MM-dd");
      dateFilter = app => app.date === dateString;
    } else if (viewMode === "week") {
      const start = startOfWeek(date, { weekStartsOn: 1 }); // Week starts Monday
      const end = endOfWeek(date, { weekStartsOn: 1 });
      const daysInWeek = eachDayOfInterval({ start, end });
      const datesInWeek = daysInWeek.map(day => format(day, "yyyy-MM-dd"));
      dateFilter = app => datesInWeek.includes(app.date);
    } else { // month
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      const daysInMonth = eachDayOfInterval({ start, end });
      const datesInMonth = daysInMonth.map(day => format(day, "yyyy-MM-dd"));
      dateFilter = app => datesInMonth.includes(app.date);
    }
    
    return appointmentsToFilter.filter(app => {
      const matchesDate = dateFilter(app);
      const matchesProfessional = !selectedProfessional || 
        app.professionalName === selectedProfessional;
      
      return matchesDate && matchesProfessional;
    }).sort((a, b) => {
      // First sort by date
      const dateComparison = a.date.localeCompare(b.date);
      // If dates are the same, sort by time
      return dateComparison !== 0 ? dateComparison : a.time.localeCompare(b.time);
    });
  };

  const filteredAppointments = getFilteredAppointments();

  const handleNewAppointment = () => {
    setIsFormOpen(true);
  };

  const handleAppointmentFormSubmit = (data: any) => {
    // Get patient and professional names from their IDs
    // In a real app, you would fetch these from your API
    const patientName = "Novo Paciente"; // This would be fetched based on patientId
    const professionalName = professionals.find(
      p => p.id.toString() === data.professionalId
    )?.name || "Profissional";

    // Create a new appointment
    const newAppointment = {
      id: appointments.length + 1,
      patientName,
      professionalName,
      date: format(data.date, "yyyy-MM-dd"),
      time: data.time,
      duration: data.duration,
      type: data.type,
      status: data.status,
      insurance: data.insurance || "Particular",
    };

    // Add the new appointment to the list
    setAppointments([...appointments, newAppointment]);
    
    // Update the selected date to the appointment date
    setDate(data.date);
  };

  const handleOnlineBookingSubmit = (data: any) => {
    // Similar to appointment form submit but for online booking
    const newAppointment = {
      id: appointments.length + 1,
      patientName: data.patientName,
      professionalName: professionals.find(
        p => p.id.toString() === data.professionalId
      )?.name || "Profissional",
      date: format(data.date, "yyyy-MM-dd"),
      time: data.time,
      duration: 50, // Default duration
      type: data.type,
      status: "Pendente", // Online bookings start as pending
      insurance: data.insurance || "Particular",
    };

    setAppointments([...appointments, newAppointment]);
    
    toast({
      title: "Agendamento Online",
      description: "Solicitação de agendamento enviada com sucesso.",
    });
    
    setIsOnlineBookingOpen(false);
  };

  const handleSendReminders = () => {
    toast({
      title: "Lembretes Enviados",
      description: "Lembretes automáticos enviados aos pacientes e profissionais.",
    });
  };

  const handleExportCalendar = () => {
    toast({
      title: "Calendário Exportado",
      description: "Os eventos foram exportados para seu calendário digital.",
    });
  };

  const handleFilterClick = () => {
    toast({
      title: "Filtro Avançado",
      description: "Funcionalidade de filtro avançado em desenvolvimento",
    });
  };

  const handleNavigatePrevious = () => {
    if (date) {
      const previousUnit = viewMode === "day" 
        ? addDays(date, -1)
        : viewMode === "week"
          ? addDays(date, -7)
          : startOfMonth(addDays(startOfMonth(date), -1));
          
      setDate(previousUnit);
    }
  };

  const handleNavigateNext = () => {
    if (date) {
      const nextUnit = viewMode === "day" 
        ? addDays(date, 1)
        : viewMode === "week"
          ? addDays(date, 7)
          : startOfMonth(addDays(endOfMonth(date), 1));
          
      setDate(nextUnit);
    }
  };

  return (
    <div className="space-y-6">
      <AppointmentHeader 
        onNewAppointment={handleNewAppointment} 
        onOnlineBooking={() => setIsOnlineBookingOpen(true)}
        onSendReminders={handleSendReminders}
        onCalendarIntegration={() => setIsCalendarIntegrationOpen(true)}
        onReminderSettings={() => setIsReminderSettingsOpen(true)}
      />

      <Tabs defaultValue="calendar" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
          <TabsTrigger value="professionals">Profissionais</TabsTrigger>
        </TabsList>
        
        <TabsContent value="calendar" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <Button 
                variant={viewMode === "day" ? "default" : "outline"} 
                onClick={() => setViewMode("day")}
              >
                Diário
              </Button>
              <Button 
                variant={viewMode === "week" ? "default" : "outline"} 
                onClick={() => setViewMode("week")}
              >
                Semanal
              </Button>
              <Button 
                variant={viewMode === "month" ? "default" : "outline"} 
                onClick={() => setViewMode("month")}
              >
                Mensal
              </Button>
            </div>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleExportCalendar}>
                <FileExport className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <CalendarSidebar
              date={date}
              onDateChange={setDate}
              selectedProfessional={selectedProfessional}
              onProfessionalChange={setSelectedProfessional}
              professionals={professionals}
              onFilterClick={handleFilterClick}
              onNavigatePrevious={handleNavigatePrevious}
              onNavigateNext={handleNavigateNext}
              viewMode={viewMode}
            />

            {viewMode === "day" && (
              <AppointmentsList
                formattedDate={formattedDate}
                appointments={filteredAppointments}
                onNewAppointment={handleNewAppointment}
              />
            )}
            
            {viewMode === "week" && (
              <WeeklyView 
                date={date || new Date()} 
                appointments={filteredAppointments}
                onNewAppointment={handleNewAppointment}
                selectedProfessional={selectedProfessional}
              />
            )}
            
            {viewMode === "month" && (
              <MonthlyView 
                date={date || new Date()} 
                appointments={filteredAppointments}
                onNewAppointment={handleNewAppointment}
                selectedProfessional={selectedProfessional}
              />
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="professionals">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {professionals.map(professional => (
              <div 
                key={professional.id} 
                className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center justify-center bg-primary/10 w-12 h-12 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{professional.name}</h3>
                    <p className="text-sm text-muted-foreground">Psicólogo(a)</p>
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSelectedProfessional(professional.name);
                      setViewMode("day");
                      // Switch to the calendar tab
                      const calendarTab = document.querySelector('[data-value="calendar"]') as HTMLElement;
                      if (calendarTab) calendarTab.click();
                    }}
                  >
                    Ver Agenda
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedProfessional(professional.name);
                      setIsFormOpen(true);
                    }}
                  >
                    Agendar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <AppointmentForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleAppointmentFormSubmit}
        defaultDate={date}
      />
      
      <OnlineBookingForm
        open={isOnlineBookingOpen}
        onOpenChange={setIsOnlineBookingOpen}
        onSubmit={handleOnlineBookingSubmit}
        professionals={professionals}
      />
      
      <ReminderSettings
        open={isReminderSettingsOpen}
        onOpenChange={setIsReminderSettingsOpen}
      />
      
      <CalendarIntegration
        open={isCalendarIntegrationOpen}
        onOpenChange={setIsCalendarIntegrationOpen}
      />
    </div>
  );
}
