import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Upload } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

// Sample data for patients and professionals
const patients = [
  { id: 1, name: "Ana Silva" },
  { id: 2, name: "João Oliveira" },
  { id: 3, name: "Mariana Costa" },
  { id: 4, name: "Carlos Santos" },
  { id: 5, name: "Patricia Lima" },
];

const professionals = [
  { id: 1, name: "Dr. Carlos Mendes" },
  { id: 2, name: "Dra. Juliana Alves" },
  { id: 3, name: "Dr. Ricardo Sousa" },
  { id: 4, name: "Dra. Mariana Costa" },
  { id: 5, name: "Dr. Fernando Lima" },
];

// Validation schema for medical record form
const formSchema = z.object({
  patientId: z.string({
    required_error: "Selecione um paciente",
  }),
  professionalId: z.string({
    required_error: "Selecione um profissional",
  }),
  date: z.date({
    required_error: "Selecione uma data",
  }),
  sessionType: z.string({
    required_error: "Selecione um tipo de sessão",
  }),
  sessionNotes: z.string().min(1, "Notas da sessão são obrigatórias"),
  fileUpload: z.any().optional(),
});

type MedicalRecordFormValues = z.infer<typeof formSchema>;

interface MedicalRecordFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: MedicalRecordFormValues) => void;
}

export function MedicalRecordForm({ 
  open, 
  onOpenChange, 
  onSubmit 
}: MedicalRecordFormProps) {
  const { toast } = useToast();
  const [fileNames, setFileNames] = useState<string[]>([]);
  
  const form = useForm<MedicalRecordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientId: "",
      professionalId: "",
      date: new Date(),
      sessionType: "",
      sessionNotes: "",
    },
  });

  const handleSubmit = (data: MedicalRecordFormValues) => {
    onSubmit?.(data);
    
    // Get patient and professional names for toast
    const patient = patients.find(p => p.id.toString() === data.patientId);
    const professional = professionals.find(p => p.id.toString() === data.professionalId);
    
    toast({
      title: "Prontuário atualizado",
      description: `Prontuário de ${patient?.name} atualizado com sucesso!`,
    });
    
    onOpenChange(false);
    form.reset();
    setFileNames([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFileNames = Array.from(files).map(file => file.name);
      setFileNames(prevNames => [...prevNames, ...newFileNames]);
      
      // In a real app, you would upload the files to your server here
      toast({
        title: "Arquivo(s) selecionado(s)",
        description: `${files.length} arquivo(s) selecionado(s) para upload.`,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registro de Prontuário</DialogTitle>
          <DialogDescription>
            Registre informações da sessão e atualize o prontuário do paciente.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Paciente e Profissional */}
              <FormField
                control={form.control}
                name="patientId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paciente</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o paciente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {patients.map((patient) => (
                          <SelectItem key={patient.id} value={patient.id.toString()}>
                            {patient.name}
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
                name="professionalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profissional</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o profissional" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {professionals.map((professional) => (
                          <SelectItem key={professional.id} value={professional.id.toString()}>
                            {professional.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Data e Tipo de Sessão */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data da Sessão</FormLabel>
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
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sessionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Sessão</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="avaliacao">Avaliação Inicial</SelectItem>
                        <SelectItem value="terapia_individual">Terapia Individual</SelectItem>
                        <SelectItem value="terapia_casal">Terapia de Casal</SelectItem>
                        <SelectItem value="terapia_familia">Terapia Familiar</SelectItem>
                        <SelectItem value="acompanhamento">Acompanhamento</SelectItem>
                        <SelectItem value="orientacao">Orientação</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Notas da Sessão */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="sessionNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notas da Sessão</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Registre suas observações sobre a sessão..." 
                          className="min-h-[150px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Upload de Arquivos */}
              <div className="md:col-span-2">
                <FormField
                  control={form.control}
                  name="fileUpload"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Anexar Documentos</FormLabel>
                      <FormControl>
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                          <Input
                            type="file"
                            multiple
                            className="cursor-pointer"
                            onChange={handleFileChange}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                      {fileNames.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Arquivos selecionados:</p>
                          <ul className="list-disc pl-5 text-sm">
                            {fileNames.map((name, index) => (
                              <li key={index}>{name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">Salvar Prontuário</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
