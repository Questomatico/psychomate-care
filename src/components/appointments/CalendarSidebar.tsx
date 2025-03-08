
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ViewMode } from "./AppointmentCalendar";

interface CalendarSidebarProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  selectedProfessional: string | undefined;
  onProfessionalChange: (value: string | undefined) => void;
  professionals: Array<{ id: number; name: string }>;
  onFilterClick: () => void;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
  viewMode: ViewMode;
}

export function CalendarSidebar({
  date,
  onDateChange,
  selectedProfessional,
  onProfessionalChange,
  professionals,
  onFilterClick,
  onNavigatePrevious,
  onNavigateNext,
  viewMode,
}: CalendarSidebarProps) {
  // Format header title based on view mode
  const formatViewTitle = () => {
    if (!date) return "";
    
    if (viewMode === "day") {
      return format(date, "d 'de' MMMM", { locale: ptBR });
    } else if (viewMode === "week") {
      const start = new Date(date);
      start.setDate(start.getDate() - start.getDay() + 1); // Monday
      const end = new Date(start);
      end.setDate(end.getDate() + 6); // Sunday
      return `${format(start, "d", { locale: ptBR })} - ${format(end, "d 'de' MMMM", { locale: ptBR })}`;
    } else {
      return format(date, "MMMM 'de' yyyy", { locale: ptBR });
    }
  };

  return (
    <Card className="lg:col-span-1 overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-xl font-semibold capitalize">
          {formatViewTitle()}
        </CardTitle>
        <div className="flex items-center space-x-1">
          <Button variant="outline" size="icon" onClick={onNavigatePrevious} className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onNavigateNext} className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          locale={ptBR}
          className="p-0 w-full rounded-md border mx-auto pointer-events-auto"
        />

        <Separator className="my-4" />

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Filtrar por Profissional</label>
            <Select
              value={selectedProfessional}
              onValueChange={onProfessionalChange}
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
            <Button variant="outline" size="icon" onClick={onFilterClick}>
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
