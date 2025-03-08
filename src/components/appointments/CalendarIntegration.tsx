
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, CalendarDays, AlertCircle } from "lucide-react";

// Validation schema for calendar integration form
const formSchema = z.object({
  provider: z.enum(["google", "microsoft", "apple", "other"]),
  calendarId: z.string().optional(),
  syncDirection: z.enum(["import", "export", "both"]),
  apiKey: z.string().optional(),
});

type CalendarIntegrationValues = z.infer<typeof formSchema>;

interface CalendarIntegrationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CalendarIntegration({ 
  open, 
  onOpenChange
}: CalendarIntegrationProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("connect");
  const [connected, setConnected] = useState(false);
  
  const form = useForm<CalendarIntegrationValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      provider: "google",
      calendarId: "",
      syncDirection: "both",
      apiKey: "",
    },
  });

  const handleSubmit = (data: CalendarIntegrationValues) => {
    console.log("Calendar integration data:", data);
    
    toast({
      title: "Calendário conectado",
      description: "A integração com o calendário foi configurada com sucesso.",
    });
    
    setConnected(true);
    setActiveTab("settings");
  };

  const handleDisconnect = () => {
    toast({
      title: "Desconectado",
      description: "A integração com o calendário foi removida.",
    });
    
    setConnected(false);
    setActiveTab("connect");
    form.reset();
  };

  const handleExport = () => {
    toast({
      title: "Eventos Exportados",
      description: "Todos os agendamentos foram exportados para seu calendário.",
    });
  };

  const handleImport = () => {
    toast({
      title: "Eventos Importados",
      description: "Eventos do calendário externo foram importados com sucesso.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Integração com Calendário</DialogTitle>
          <DialogDescription>
            Conecte o sistema com calendários externos para sincronizar agendamentos.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connect">Conectar</TabsTrigger>
            <TabsTrigger value="settings" disabled={!connected}>Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="connect" className="space-y-4 py-4">
            {!connected ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="provider"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Provedor de Calendário</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="google" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Google Calendar
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="microsoft" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Microsoft Outlook
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="apple" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Apple Calendar
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="other" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Outro (iCal)
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="syncDirection"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel>Direção da Sincronização</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="import" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Apenas importar eventos
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="export" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Apenas exportar agendamentos
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="both" />
                              </FormControl>
                              <FormLabel className="font-normal">
                                Sincronização bidirecional
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full">
                    Conectar Calendário
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="text-center space-y-4 py-8">
                <div className="flex justify-center">
                  <div className="bg-primary/10 rounded-full p-3">
                    <CalendarClock className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-medium">Calendário Conectado</h3>
                <p className="text-muted-foreground">
                  {form.getValues().provider === "google" && "Google Calendar"}
                  {form.getValues().provider === "microsoft" && "Microsoft Outlook"}
                  {form.getValues().provider === "apple" && "Apple Calendar"}
                  {form.getValues().provider === "other" && "Outro calendário"}
                  {" "}está conectado com sucesso.
                </p>
                <Button variant="outline" onClick={handleDisconnect}>
                  Desconectar
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 py-4">
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Sincronização Manual</h3>
                  <p className="text-sm text-muted-foreground">
                    Exporte ou importe eventos manualmente quando necessário.
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <Button size="sm" variant="outline" onClick={handleExport}>
                      Exportar
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleImport}>
                      Importar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg border p-4 space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-full p-2">
                  <AlertCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Comportamento de Conflitos</h3>
                  <p className="text-sm text-muted-foreground">
                    Define como o sistema deve lidar com conflitos de agendamento.
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <RadioGroup defaultValue="ask" className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ask" id="ask" />
                        <label htmlFor="ask" className="text-sm">Perguntar</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="overwrite" id="overwrite" />
                        <label htmlFor="overwrite" className="text-sm">Sobrescrever</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="keep" id="keep" />
                        <label htmlFor="keep" className="text-sm">Manter original</label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Fechar
              </Button>
              <Button>Salvar Configurações</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
