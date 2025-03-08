
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  BadgePlus, 
  MoreHorizontal, 
  FileText, 
  Users, 
  Pencil, 
  Trash2, 
  Search,
  FileDown
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { InsuranceForm } from "./InsuranceForm";

// Sample data for insurances
const initialInsurances = [
  {
    id: 1,
    name: "Unimed",
    contactName: "Maria Santos",
    contactEmail: "maria.santos@unimed.com.br",
    contactPhone: "(11) 3456-7890",
    paymentTerm: "30 dias após envio da fatura",
    serviceValues: "Terapia Individual: R$ 120,00; Terapia de Casal: R$ 180,00",
    notes: "Limite de 20 sessões por ano por paciente",
    activePatients: 15,
  },
  {
    id: 2,
    name: "Bradesco Saúde",
    contactName: "João Silva",
    contactEmail: "joao.silva@bradescosaude.com.br",
    contactPhone: "(11) 2345-6789",
    paymentTerm: "45 dias após envio da fatura",
    serviceValues: "Terapia Individual: R$ 140,00; Avaliação Psicológica: R$ 200,00",
    notes: "Necessário enviar relatórios trimestrais",
    activePatients: 8,
  },
  {
    id: 3,
    name: "SulAmérica",
    contactName: "Ana Oliveira",
    contactEmail: "ana.oliveira@sulamerica.com.br",
    contactPhone: "(11) 3456-7891",
    paymentTerm: "30 dias após envio da fatura",
    serviceValues: "Terapia Individual: R$ 130,00; Terapia Infantil: R$ 150,00",
    notes: "",
    activePatients: 10,
  },
  {
    id: 4,
    name: "Amil",
    contactName: "Carlos Souza",
    contactEmail: "carlos.souza@amil.com.br",
    contactPhone: "(11) 4567-8901",
    paymentTerm: "60 dias após envio da fatura",
    serviceValues: "Terapia Individual: R$ 110,00",
    notes: "Limite de 12 sessões por ano",
    activePatients: 5,
  },
  {
    id: 5,
    name: "NotreDame Intermédica",
    contactName: "Paula Lima",
    contactEmail: "paula.lima@intermedica.com.br",
    contactPhone: "(11) 5678-9012",
    paymentTerm: "45 dias após envio da fatura",
    serviceValues: "Terapia Individual: R$ 125,00; Terapia de Casal: R$ 190,00",
    notes: "Necessário autorização prévia para terapia de casal",
    activePatients: 12,
  },
];

export default function InsuranceList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [insurances, setInsurances] = useState(initialInsurances);
  const [editingInsurance, setEditingInsurance] = useState<any>(null);
  const { toast } = useToast();
  
  const filteredInsurances = insurances.filter(insurance => 
    insurance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insurance.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insurance.contactEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewInsurance = () => {
    setEditingInsurance(null);
    setIsFormOpen(true);
  };

  const handleEditInsurance = (insurance: any) => {
    setEditingInsurance(insurance);
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    if (editingInsurance) {
      // Update existing insurance
      const updatedInsurances = insurances.map(insurance => 
        insurance.id === editingInsurance.id 
          ? { ...insurance, ...data } 
          : insurance
      );
      setInsurances(updatedInsurances);
      
      toast({
        title: "Convênio atualizado",
        description: `${data.name} foi atualizado com sucesso!`,
      });
    } else {
      // Create new insurance with form data
      const newInsurance = {
        id: insurances.length + 1,
        name: data.name,
        contactName: data.contactName,
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone,
        paymentTerm: data.paymentTerm,
        serviceValues: data.serviceValues,
        notes: data.notes || "",
        activePatients: 0,
      };

      // Add new insurance to list
      setInsurances([...insurances, newInsurance]);
      
      toast({
        title: "Convênio cadastrado",
        description: `${data.name} foi cadastrado com sucesso!`,
      });
    }
  };

  const handleExportInsurances = () => {
    // Create CSV data
    const headers = "ID,Nome,Contato,Email,Telefone,Prazo de Pagamento,Pacientes Ativos\n";
    const csvContent = headers + filteredInsurances.map(insurance => 
      `${insurance.id},"${insurance.name}","${insurance.contactName}","${insurance.contactEmail}","${insurance.contactPhone}","${insurance.paymentTerm}",${insurance.activePatients}`
    ).join("\n");
    
    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Convênios_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Exportar Convênios",
      description: "Lista de convênios exportada com sucesso!",
    });
  };

  const handleShowDetails = (insurance: typeof insurances[0]) => {
    toast({
      title: `Detalhes: ${insurance.name}`,
      description: "Visualizando detalhes do convênio",
    });
    
    // Show more detailed information in a toast
    toast({
      title: "Informações de Pagamento",
      description: `Prazo: ${insurance.paymentTerm}\nValores: ${insurance.serviceValues}`,
    });
    
    if (insurance.notes) {
      toast({
        title: "Observações",
        description: insurance.notes,
      });
    }
  };
  
  const handleShowPatients = (insurance: typeof insurances[0]) => {
    toast({
      title: `Pacientes: ${insurance.name}`,
      description: `Visualizando ${insurance.activePatients} pacientes vinculados`,
    });
    
    // For demonstration purposes, we're showing a toast
    // In a real app, this would navigate to a filtered patients list
    if (insurance.activePatients > 0) {
      toast({
        title: "Lista de Pacientes",
        description: "Esta funcionalidade estará disponível em breve: mostrar pacientes com este convênio",
      });
    } else {
      toast({
        title: "Sem Pacientes",
        description: "Este convênio não possui pacientes vinculados no momento",
      });
    }
  };

  const handleAction = (action: string, insurance: typeof insurances[0]) => {
    switch (action) {
      case "Detalhes":
        handleShowDetails(insurance);
        break;
      case "Pacientes":
        handleShowPatients(insurance);
        break;
      case "Editar":
        handleEditInsurance(insurance);
        break;
      case "Excluir":
        // Remove insurance from list
        setInsurances(insurances.filter(i => i.id !== insurance.id));
        toast({
          title: `Convênio Excluído`,
          description: `${insurance.name} foi removido com sucesso!`,
        });
        break;
      default:
        toast({
          title: `${action}: ${insurance.name}`,
          description: `Funcionalidade de ${action.toLowerCase()} em desenvolvimento`,
        });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Convênios</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleExportInsurances}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button 
            className="w-full sm:w-auto" 
            onClick={handleNewInsurance}
          >
            <BadgePlus className="mr-2 h-4 w-4" />
            Novo Convênio
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Lista de Convênios</CardTitle>
          <CardDescription>
            Gerencie todos os convênios e suas informações
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar convênios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="hidden md:table-cell">Contato</TableHead>
                  <TableHead className="hidden lg:table-cell">Prazo de Pagamento</TableHead>
                  <TableHead>Pacientes Ativos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInsurances.length > 0 ? (
                  filteredInsurances.map((insurance) => (
                    <TableRow key={insurance.id} className="transition-colors hover:bg-muted/50">
                      <TableCell className="font-medium">{insurance.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">
                          {insurance.contactName}
                          <br />
                          {insurance.contactEmail}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{insurance.paymentTerm}</TableCell>
                      <TableCell>{insurance.activePatients}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleAction("Detalhes", insurance)}>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Detalhes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Pacientes", insurance)}>
                              <Users className="mr-2 h-4 w-4" />
                              <span>Pacientes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Editar", insurance)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleAction("Excluir", insurance)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              <span>Excluir</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhum convênio encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <InsuranceForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        defaultValues={editingInsurance}
      />
    </div>
  );
}
