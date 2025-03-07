
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PatientsList from "./components/patients/PatientsList";
import ProfessionalsList from "./components/professionals/ProfessionalsList";
import AppointmentCalendar from "./components/appointments/AppointmentCalendar";
import FinanceOverview from "./components/finance/FinanceOverview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/pacientes" element={<PatientsList />} />
            <Route path="/profissionais" element={<ProfessionalsList />} />
            <Route path="/agendamentos" element={<AppointmentCalendar />} />
            <Route path="/financeiro" element={<FinanceOverview />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
