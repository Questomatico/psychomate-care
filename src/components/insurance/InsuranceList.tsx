
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
  BarChart, 
  Pencil, 
  Trash2, 
  Search,
  Download 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for insurances
const insurances = [
  {
    id: 1,
    name: "Unimed",
    paymentDeadline: 30,
    activePatients: 45,
    sessionPrice: 120.00,
    status: "Ativo",
  },
  {
    id: 2,
    name: "Bradesco Saúde",
    paymentDeadline: 45,
    activePatients: 38,
    sessionPrice: 110.00,
    status: "Ativo",
  },
  {
    id: 3,
    name: "SulAmérica",
    paymentDeadline: 30,
    activePatients: 22,
    sessionPrice: 105.00,
    status: "Ativo",
  },
  {
    id: 4,
    name: "Amil",
    paymentDeadline: 60,
    activePatients: 15,
    sessionPrice: 95.00,
    status: "Ativo",
  },
  {
    id: 5,
    name: "NotreDame Intermédica",
    paymentDeadline: 45,
    activePatients: 8,
    sessionPrice: 100.00,
    status: "Inativo",
  },
];

export default function InsuranceList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const filteredInsurances = insurances.filter(insurance => 
    insurance.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewInsurance = () => {
    toast({
      title: "Novo Convênio",
      description: "Funcionalidade de criação de convênio em desenvolvimento",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportar Convênios",
      description: "Funcionalidade de exportação em desenvolvimento",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Convênios</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleNewInsurance}>
            <BadgePlus className="mr-2 h-4 w-4" />
            Novo Convênio
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Lista de Convênios</CardTitle>
          <CardDescription>
            Gerencie todos os convênios da clínica
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
                  <TableHead className="hidden md:table-cell">Prazo (dias)</TableHead>
                  <TableHead className="hidden lg:table-cell">Pacientes</TableHead>
                  <TableHead>Valor Sessão</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInsurances.length > 0 ? (
                  filteredInsurances.map((insurance) => (
                    <TableRow key={insurance.id} className="transition-colors hover:bg-muted/50">
                      <TableCell className="font-medium">{insurance.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{insurance.paymentDeadline}</TableCell>
                      <TableCell className="hidden lg:table-cell">{insurance.activePatients}</TableCell>
                      <TableCell>R$ {insurance.sessionPrice.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          insurance.status === 'Ativo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {insurance.status}
                        </div>
                      </TableCell>
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
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              <span>Detalhes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart className="mr-2 h-4 w-4" />
                              <span>Relatórios</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
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
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum convênio encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
