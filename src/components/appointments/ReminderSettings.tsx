
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Validation schema for reminder settings form
const formSchema = z.object({
  enableEmailReminders: z.boolean(),
  enableSmsReminders: z.boolean(),
  reminderTime: z.enum(["1-day", "2-days", "3-days", "1-week"]),
  customEmailSubject: z.string().optional(),
  customEmailMessage: z.string().optional(),
  sendToProfessionals: z.boolean(),
});

type ReminderSettingsValues = z.infer<typeof formSchema>;

interface ReminderSettingsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReminderSettings({ 
  open, 
  onOpenChange
}: ReminderSettingsProps) {
  const { toast } = useToast();
  
  const form = useForm<ReminderSettingsValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enableEmailReminders: true,
      enableSmsReminders: false,
      reminderTime: "1-day",
      customEmailSubject: "Lembrete de Consulta",
      customEmailMessage: "Olá, este é um lembrete sobre sua consulta agendada.",
      sendToProfessionals: true,
    },
  });

  const handleSubmit = (data: ReminderSettingsValues) => {
    toast({
      title: "Configurações salvas",
      description: "As configurações de lembretes foram salvas com sucesso.",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Configurações de Lembretes</DialogTitle>
          <DialogDescription>
            Configure como os lembretes serão enviados para pacientes e profissionais.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="enableEmailReminders"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Lembretes por Email
                      </FormLabel>
                      <FormDescription>
                        Enviar lembretes automáticos por email
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="enableSmsReminders"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Lembretes por SMS
                      </FormLabel>
                      <FormDescription>
                        Enviar lembretes automáticos por SMS
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reminderTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quando enviar lembretes</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione quando enviar" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1-day">1 dia antes</SelectItem>
                        <SelectItem value="2-days">2 dias antes</SelectItem>
                        <SelectItem value="3-days">3 dias antes</SelectItem>
                        <SelectItem value="1-week">1 semana antes</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Defina quando os lembretes serão enviados antes da consulta
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customEmailSubject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assunto do Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Personalizar o assunto do email de lembrete
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sendToProfessionals"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Enviar para Profissionais
                      </FormLabel>
                      <FormDescription>
                        Enviar lembretes também para os profissionais
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          
            <DialogFooter>
              <Button type="submit">Salvar Configurações</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
