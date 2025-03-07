
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
  FilePlus, 
  Calendar, 
  Pencil, 
  Trash2, 
  Search 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for patients
const patients = [
  {
    id: 1,
    name: "Ana Silva",
    email: "ana.silva@exemplo.com",
    phone: "(11) 98765-4321",
    dateOfBirth: "12/05/1985",
    lastAppointment: "22/05/2023",
    nextAppointment: "15/06/2023",
    status: "Ativo",
    insurance: "Unimed",
  },
  {
    id: 2,
    name: "João Oliveira",
    email: "joao.oliveira@exemplo.com",
    phone: "(11) 91234-5678",
    dateOfBirth: "30/11/1978",
    lastAppointment: "18/05/2023",
    nextAppointment: "18/06/2023",
    status: "Ativo",
    insurance: "Bradesco Saúde",
  },
  {
    id: 3,
    name: "Mariana Costa",
    email: "mariana.costa@exemplo.com",
    phone: "(11) 99876-5432",
    dateOfBirth: "25/03/1992",
    lastAppointment: "05/05/2023",
    nextAppointment: "05/06/2023",
    status: "Ativo",
    insurance: "SulAmérica",
  },
  {
    id: 4,
    name: "Carlos Santos",
    email: "carlos.santos@exemplo.com",
    phone: "(11) 97654-3210",
    dateOfBirth: "08/07/1980",
    lastAppointment: "10/04/2023",
    nextAppointment: null,
    status: "Inativo",
    insurance: "Particular",
  },
  {
    id: 5,
    name: "Patricia Lima",
    email: "patricia.lima@exemplo.com",
    phone: "(11) 95432-1098",
    dateOfBirth: "17/09/1990",
    lastAppointment: "28/05/2023",
    nextAppointment: "28/06/2023",
    status: "Ativo",
    insurance: "Amil",
  }
];

export default function PatientsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.phone.includes(searchQuery)
  );

  const handleNewPatient = () => {
    toast({
      title: "Novo Paciente",
      description: "Funcionalidade de cadastro de paciente em desenvolvimento",
    });
  };

  const handleAction = (action: string, patient: typeof patients[0]) => {
    toast({
      title: `${action}: ${patient.name}`,
      description: `Funcionalidade de ${action.toLowerCase()} em desenvolvimento`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Pacientes</h2>
        <Button className="w-full sm:w-auto" onClick={handleNewPatient}>
          <BadgePlus className="mr-2 h-4 w-4" />
          Novo Paciente
        </Button>
      </div>

      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Lista de Pacientes</CardTitle>
          <CardDescription>
            Gerencie todos os seus pacientes e seus dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pacientes..."
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
                  <TableHead className="hidden lg:table-cell">Nascimento</TableHead>
                  <TableHead className="hidden md:table-cell">Convênio</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <TableRow key={patient.id} className="transition-colors hover:bg-muted/50">
                      <TableCell className="font-medium">{patient.name}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="text-sm">
                          {patient.email}
                          <br />
                          {patient.phone}
                        </div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{patient.dateOfBirth}</TableCell>
                      <TableCell className="hidden md:table-cell">{patient.insurance}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          patient.status === 'Ativo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {patient.status}
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
                            <DropdownMenuItem onClick={() => handleAction("Prontuário", patient)}>
                              <FilePlus className="mr-2 h-4 w-4" />
                              <span>Prontuário</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Agendamento", patient)}>
                              <Calendar className="mr-2 h-4 w-4" />
                              <span>Agendar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Editar", patient)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleAction("Excluir", patient)}
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
                      Nenhum paciente encontrado.
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
