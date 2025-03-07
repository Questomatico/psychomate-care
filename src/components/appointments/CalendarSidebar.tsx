
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

interface CalendarSidebarProps {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
  selectedProfessional: string | undefined;
  onProfessionalChange: (value: string | undefined) => void;
  professionals: Array<{ id: number; name: string }>;
  onFilterClick: () => void;
  onNavigatePrevious: () => void;
  onNavigateNext: () => void;
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
}: CalendarSidebarProps) {
  return (
    <Card className="lg:col-span-1 overflow-hidden transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle>Calendário</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          locale={ptBR}
          className="p-0 w-full rounded-md border mx-auto"
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
            <div className="flex items-center space-x-1">
              <Button variant="outline" size="icon" onClick={onNavigatePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={onNavigateNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
