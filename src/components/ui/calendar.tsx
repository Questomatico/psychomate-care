
import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, DayPickerSingleProps, MonthChangeEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Define CalendarProps by extending DayPickerSingleProps
export type CalendarProps = Omit<DayPickerSingleProps, "mode"> & {
  showManualInput?: boolean;
};

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  showManualInput = false,
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  // State for manual date input
  const [manualDate, setManualDate] = React.useState<string>("");
  const [currentMonth, setCurrentMonth] = React.useState<Date>(selected as Date || new Date());
  
  // Generate years from 1900 to current year + 10
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 20 }, (_, i) => 1900 + i);
  
  // Months for select dropdown
  const months = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Handle manual date input change
  const handleManualDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualDate(e.target.value);
  };

  // Handle manual date input submit
  const handleManualDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse the date from the input (format: DD/MM/YYYY)
    const [day, month, year] = manualDate.split('/').map(Number);
    
    // Check if it's a valid date
    if (day && month && year && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
      const dateObj = new Date(year, month - 1, day);
      
      // Ensure it's a valid date (e.g., not 31st of February)
      if (dateObj.getDate() === day) {
        onSelect?.(dateObj);
        setCurrentMonth(dateObj);
      }
    }
  };

  // Handle month change in the calendar
  const handleMonthChange: MonthChangeEventHandler = (month) => {
    setCurrentMonth(month);
  };
  
  // Handle month selection from dropdown
  const handleMonthSelect = (value: string) => {
    const monthIndex = parseInt(value);
    const newDate = new Date(currentMonth);
    newDate.setMonth(monthIndex);
    setCurrentMonth(newDate);
  };
  
  // Handle year selection from dropdown
  const handleYearSelect = (value: string) => {
    const year = parseInt(value);
    const newDate = new Date(currentMonth);
    newDate.setFullYear(year);
    setCurrentMonth(newDate);
  };

  return (
    <div className="flex flex-col space-y-4">
      {/* Month and Year selectors */}
      <div className="flex space-x-2">
        <Select value={currentMonth.getMonth().toString()} onValueChange={handleMonthSelect}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Mês" />
          </SelectTrigger>
          <SelectContent>
            {months.map((month, index) => (
              <SelectItem key={index} value={index.toString()}>
                {month}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Select 
          value={currentMonth.getFullYear().toString()} 
          onValueChange={handleYearSelect}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto">
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Manual date input */}
      {showManualInput && (
        <form onSubmit={handleManualDateSubmit} className="flex space-x-2">
          <Input
            type="text"
            placeholder="DD/MM/AAAA"
            value={manualDate}
            onChange={handleManualDateChange}
            className="flex-1"
          />
          <button
            type="submit"
            className={buttonVariants({ variant: "outline", size: "sm" })}
          >
            Aplicar
          </button>
        </form>
      )}
      
      <DayPicker
        mode="single"
        showOutsideDays={showOutsideDays}
        className={cn("p-3 pointer-events-auto", className)}
        month={currentMonth}
        onMonthChange={handleMonthChange}
        selected={selected}
        onSelect={onSelect}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
