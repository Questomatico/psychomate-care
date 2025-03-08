import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

// Lista de convênios
const insuranceOptions = [
  "Unimed",
  "Bradesco Saúde",
  "SulAmérica",
  "Amil",
  "NotreDame Intermédica",
  "Outros"
];

// Esquema de validação para o formulário
const formSchema = z.object({
  insurance: z.string({
    required_error: "O convênio é obrigatório",
  }),
  referenceMonth: z.string({
    required_error: "O mês de referência é obrigatório",
  }),
  amount: z.coerce.number().positive({
    message: "O valor deve ser maior que zero",
  }),
  patients: z.coerce.number().int().positive({
    message: "O número de pacientes deve ser maior que zero",
  }),
  expectedDate: z.date({
    required_error: "A data prevista de recebimento é obrigatória",
  }),
  alreadyReceived: z.boolean().default(false),
  receiveDate: z.date().optional(),
  notes: z.string().optional(),
});

interface InsurancePaymentFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function InsurancePaymentForm({ onSubmit, onCancel }: InsurancePaymentFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      insurance: "",
      referenceMonth: "",
      amount: undefined,
      patients: undefined,
      expectedDate: new Date(),
      alreadyReceived: false,
      notes: "",
    },
  });

  // Observar mudança no alreadyReceived para definir receiveDate quando marcado
  const alreadyReceived = form.watch("alreadyReceived");
  
  // Gerar opções para os meses de referência (últimos 12 meses)
  const referenceMonthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    return {
      value: `${date.toLocaleString('pt-BR', { month: 'long' })}/${date.getFullYear()}`,
      label: `${date.toLocaleString('pt-BR', { month: 'long' })}/${date.getFullYear()}`
    };
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit({
      ...data,
      status: data.alreadyReceived ? "Recebido" : "Pendente",
      receiveDate: data.alreadyReceived ? (data.receiveDate || new Date()) : undefined,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="insurance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Convênio</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o convênio" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {insuranceOptions.map((insurance) => (
                      <SelectItem key={insurance} value={insurance}>
                        {insurance}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referenceMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mês de Referência</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o mês" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {referenceMonthOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor (R$)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="0,00" 
                    {...field} 
                    onChange={(e) => {
                      // Remover caracteres não numéricos, exceto ponto e vírgula
                      const value = e.target.value.replace(/[^\d.,]/g, "");
                      // Substituir vírgula por ponto para conversão para número
                      const numericValue = parseFloat(value.replace(",", "."));
                      
                      if (!isNaN(numericValue)) {
                        field.onChange(numericValue);
                      } else if (value === "" || value === "." || value === ",") {
                        field.onChange(undefined);
                      }
                      
                      // Atualizar o valor exibido
                      e.target.value = value;
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="patients"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Número de Pacientes</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="0" 
                    {...field} 
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(isNaN(value) ? undefined : value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="expectedDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data Prevista de Recebimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="alreadyReceived"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-6">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Já recebido</FormLabel>
                  <FormDescription>
                    Marque se o pagamento já foi recebido
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* Mostrar campo de data de recebimento apenas se "Já recebido" estiver marcado */}
        {alreadyReceived && (
          <FormField
            control={form.control}
            name="receiveDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Data de Recebimento</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: ptBR })
                        ) : (
                          <span>Selecione uma data</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      selected={field.value || new Date()}
                      onSelect={field.onChange}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Observações adicionais (opcional)" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            Registrar Repasse
          </Button>
        </div>
      </form>
    </Form>
  );
}
