
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { initialAppointments, professionals } from "./AppointmentData";
import { AppointmentHeader } from "./AppointmentHeader";
import { CalendarSidebar } from "./CalendarSidebar";
import { AppointmentsList } from "./AppointmentsList";
import { AppointmentForm } from "./AppointmentForm";

export default function AppointmentCalendar() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedProfessional, setSelectedProfessional] = useState<string | undefined>();
  const [appointments, setAppointments] = useState(initialAppointments);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

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

  const handleFilterClick = () => {
    toast({
      title: "Filtro Avançado",
      description: "Funcionalidade de filtro avançado em desenvolvimento",
    });
  };

  const handleNavigatePrevious = () => {
    if (date) {
      const previousDay = new Date(date);
      previousDay.setDate(previousDay.getDate() - 1);
      setDate(previousDay);
    }
  };

  const handleNavigateNext = () => {
    if (date) {
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      setDate(nextDay);
    }
  };

  return (
    <div className="space-y-6">
      <AppointmentHeader onNewAppointment={handleNewAppointment} />

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
        />

        <AppointmentsList
          formattedDate={formattedDate}
          appointments={filteredAppointments}
          onNewAppointment={handleNewAppointment}
        />
      </div>

      <AppointmentForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleAppointmentFormSubmit}
        defaultDate={date}
      />
    </div>
  );
}
