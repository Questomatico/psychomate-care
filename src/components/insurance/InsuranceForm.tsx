
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// Validation schema for insurance form
const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  contactName: z.string().min(3, "Nome do contato deve ter pelo menos 3 caracteres"),
  contactEmail: z.string().email("Email inválido"),
  contactPhone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  paymentTerm: z.string().min(1, "Prazo de pagamento é obrigatório"),
  serviceValues: z.string().min(1, "Valores dos serviços são obrigatórios"),
  notes: z.string().optional(),
});

type InsuranceFormValues = z.infer<typeof formSchema>;

interface InsuranceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: InsuranceFormValues) => void;
  defaultValues?: any;
}

export function InsuranceForm({ 
  open, 
  onOpenChange, 
  onSubmit,
  defaultValues
}: InsuranceFormProps) {
  const { toast } = useToast();
  
  const form = useForm<InsuranceFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      paymentTerm: "",
      serviceValues: "",
      notes: "",
    },
  });

  // Update form when editing an existing insurance
  useEffect(() => {
    if (defaultValues) {
      form.reset({
        name: defaultValues.name,
        contactName: defaultValues.contactName,
        contactEmail: defaultValues.contactEmail,
        contactPhone: defaultValues.contactPhone,
        paymentTerm: defaultValues.paymentTerm,
        serviceValues: defaultValues.serviceValues,
        notes: defaultValues.notes || "",
      });
    } else {
      form.reset({
        name: "",
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        paymentTerm: "",
        serviceValues: "",
        notes: "",
      });
    }
  }, [defaultValues, form, open]);

  const handleSubmit = (data: InsuranceFormValues) => {
    onSubmit?.(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {defaultValues ? "Editar Convênio" : "Cadastrar Convênio"}
          </DialogTitle>
          <DialogDescription>
            {defaultValues 
              ? "Atualize as informações do convênio."
              : "Preencha o formulário abaixo com os dados do convênio."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações Básicas */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Informações do Convênio</h3>
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Convênio</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do convênio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contato */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Informações de Contato</h3>
                
                <FormField
                  control={form.control}
                  name="contactName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Contato</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da pessoa de contato" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="email@exemplo.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="(11) 99999-9999" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Pagamentos e Valores */}
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-lg font-medium">Pagamentos e Valores</h3>
                
                <FormField
                  control={form.control}
                  name="paymentTerm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prazo de Pagamento</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 30 dias após o envio da fatura" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="serviceValues"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valores dos Serviços</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Ex: Terapia Individual: R$ 100,00; Terapia de Casal: R$ 150,00" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Liste os valores acordados para cada tipo de atendimento
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Observações */}
              <div className="space-y-4 md:col-span-2">
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Observações adicionais sobre o convênio" 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Inclua regras específicas, limites de sessões, carências ou outras informações importantes
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {defaultValues ? "Atualizar Convênio" : "Salvar Convênio"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
