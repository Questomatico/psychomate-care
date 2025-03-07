
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
    activePatients: 15,
  },
  {
    id: 2,
    name: "Bradesco Saúde",
    contactName: "João Silva",
    contactEmail: "joao.silva@bradescosaude.com.br",
    contactPhone: "(11) 2345-6789",
    paymentTerm: "45 dias após envio da fatura",
    activePatients: 8,
  },
  {
    id: 3,
    name: "SulAmérica",
    contactName: "Ana Oliveira",
    contactEmail: "ana.oliveira@sulamerica.com.br",
    contactPhone: "(11) 3456-7891",
    paymentTerm: "30 dias após envio da fatura",
    activePatients: 10,
  },
  {
    id: 4,
    name: "Amil",
    contactName: "Carlos Souza",
    contactEmail: "carlos.souza@amil.com.br",
    contactPhone: "(11) 4567-8901",
    paymentTerm: "60 dias após envio da fatura",
    activePatients: 5,
  },
  {
    id: 5,
    name: "NotreDame Intermédica",
    contactName: "Paula Lima",
    contactEmail: "paula.lima@intermedica.com.br",
    contactPhone: "(11) 5678-9012",
    paymentTerm: "45 dias após envio da fatura",
    activePatients: 12,
  },
];

export default function InsuranceList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [insurances, setInsurances] = useState(initialInsurances);
  const { toast } = useToast();
  
  const filteredInsurances = insurances.filter(insurance => 
    insurance.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insurance.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    insurance.contactEmail.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewInsurance = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    // Create new insurance with form data
    const newInsurance = {
      id: insurances.length + 1,
      name: data.name,
      contactName: data.contactName,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      paymentTerm: data.paymentTerm,
      activePatients: 0,
    };

    // Add new insurance to list
    setInsurances([...insurances, newInsurance]);
  };

  const handleExportInsurances = () => {
    toast({
      title: "Exportar Convênios",
      description: "Lista de convênios exportada com sucesso!",
    });
  };

  const handleAction = (action: string, insurance: typeof insurances[0]) => {
    switch (action) {
      case "Detalhes":
        toast({
          title: `Detalhes: ${insurance.name}`,
          description: "Visualizando detalhes do convênio",
        });
        break;
      case "Pacientes":
        toast({
          title: `Pacientes: ${insurance.name}`,
          description: `Visualizando ${insurance.activePatients} pacientes vinculados`,
        });
        break;
      case "Editar":
        toast({
          title: `Editar: ${insurance.name}`,
          description: "Editando dados do convênio",
        });
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
      />
    </div>
  );
}
