
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
  Calendar, 
  Pencil, 
  Trash2, 
  Search,
  BarChart 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for professionals
const professionals = [
  {
    id: 1,
    name: "Dr. Carlos Mendes",
    specialty: "Psicólogo Clínico",
    email: "carlos.mendes@exemplo.com",
    phone: "(11) 98765-4321",
    insurances: ["Unimed", "Bradesco Saúde", "Particular"],
    status: "Ativo",
    appointmentsThisMonth: 45,
  },
  {
    id: 2,
    name: "Dra. Juliana Alves",
    specialty: "Psicóloga Infantil",
    email: "juliana.alves@exemplo.com",
    phone: "(11) 91234-5678",
    insurances: ["Unimed", "SulAmérica", "Amil", "Particular"],
    status: "Ativo",
    appointmentsThisMonth: 38,
  },
  {
    id: 3,
    name: "Dr. Ricardo Sousa",
    specialty: "Terapeuta Familiar",
    email: "ricardo.sousa@exemplo.com",
    phone: "(11) 99876-5432",
    insurances: ["Bradesco Saúde", "Particular"],
    status: "Ativo",
    appointmentsThisMonth: 27,
  },
  {
    id: 4,
    name: "Dra. Mariana Costa",
    specialty: "Psicóloga Social",
    email: "mariana.costa@exemplo.com",
    phone: "(11) 97654-3210",
    insurances: ["Particular"],
    status: "Inativo",
    appointmentsThisMonth: 0,
  },
  {
    id: 5,
    name: "Dr. Fernando Lima",
    specialty: "Psicólogo Organizacional",
    email: "fernando.lima@exemplo.com",
    phone: "(11) 95432-1098",
    insurances: ["SulAmérica", "Amil", "Particular"],
    status: "Ativo",
    appointmentsThisMonth: 32,
  }
];

export default function ProfessionalsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const filteredProfessionals = professionals.filter(professional => 
    professional.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    professional.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    professional.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewProfessional = () => {
    toast({
      title: "Novo Profissional",
      description: "Funcionalidade de cadastro de profissional em desenvolvimento",
    });
  };

  const handleAction = (action: string, professional: typeof professionals[0]) => {
    toast({
      title: `${action}: ${professional.name}`,
      description: `Funcionalidade de ${action.toLowerCase()} em desenvolvimento`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Profissionais</h2>
        <Button className="w-full sm:w-auto" onClick={handleNewProfessional}>
          <BadgePlus className="mr-2 h-4 w-4" />
          Novo Profissional
        </Button>
      </div>

      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Equipe de Profissionais</CardTitle>
          <CardDescription>
            Gerencie todos os profissionais da clínica
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar profissionais..."
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
                  <TableHead className="hidden md:table-cell">Especialidade</TableHead>
                  <TableHead className="hidden lg:table-cell">Contato</TableHead>
                  <TableHead className="hidden md:table-cell">Convênios</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProfessionals.length > 0 ? (
                  filteredProfessionals.map((professional) => (
                    <TableRow key={professional.id} className="transition-colors hover:bg-muted/50">
                      <TableCell className="font-medium">{professional.name}</TableCell>
                      <TableCell className="hidden md:table-cell">{professional.specialty}</TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="text-sm">
                          {professional.email}
                          <br />
                          {professional.phone}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {professional.insurances.slice(0, 2).map((insurance, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary"
                            >
                              {insurance}
                            </span>
                          ))}
                          {professional.insurances.length > 2 && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted">
                              +{professional.insurances.length - 2}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          professional.status === 'Ativo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {professional.status}
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
                            <DropdownMenuItem onClick={() => handleAction("Ver Agenda", professional)}>
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>Ver Agenda</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Relatórios", professional)}>
                              <BarChart className="mr-2 h-4 w-4" />
                              <span>Relatórios</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Editar", professional)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleAction("Excluir", professional)}
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
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum profissional encontrado.
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
