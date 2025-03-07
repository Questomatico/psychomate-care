
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
  FilePlus, 
  MoreHorizontal, 
  FileText, 
  Download, 
  Pencil, 
  Trash2, 
  Search 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for medical records
const medicalRecords = [
  {
    id: 1,
    patientName: "Ana Silva",
    professionalName: "Dr. Carlos Mendes",
    date: "15/06/2023",
    recordType: "Sessão Inicial",
    status: "Completo",
  },
  {
    id: 2,
    patientName: "João Oliveira",
    professionalName: "Dra. Juliana Alves",
    date: "12/06/2023",
    recordType: "Acompanhamento",
    status: "Completo",
  },
  {
    id: 3,
    patientName: "Mariana Costa",
    professionalName: "Dr. Ricardo Sousa",
    date: "10/06/2023",
    recordType: "Avaliação Psicológica",
    status: "Pendente",
  },
  {
    id: 4,
    patientName: "Carlos Santos",
    professionalName: "Dr. Carlos Mendes",
    date: "05/06/2023",
    recordType: "Acompanhamento",
    status: "Completo",
  },
  {
    id: 5,
    patientName: "Patricia Lima",
    professionalName: "Dra. Juliana Alves",
    date: "01/06/2023",
    recordType: "Sessão de Terapia",
    status: "Completo",
  },
];

export default function MedicalRecordsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const filteredRecords = medicalRecords.filter(record => 
    record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.professionalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.recordType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewRecord = () => {
    toast({
      title: "Novo Prontuário",
      description: "Funcionalidade de criação de prontuário em desenvolvimento",
    });
  };

  const handleExport = () => {
    toast({
      title: "Exportar Prontuários",
      description: "Funcionalidade de exportação em desenvolvimento",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Prontuários</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleNewRecord}>
            <FilePlus className="mr-2 h-4 w-4" />
            Novo Prontuário
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Prontuários Eletrônicos</CardTitle>
          <CardDescription>
            Gerencie todos os prontuários dos pacientes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar prontuários..."
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
                  <TableHead>Paciente</TableHead>
                  <TableHead className="hidden md:table-cell">Profissional</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="hidden md:table-cell">Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id} className="transition-colors hover:bg-muted/50">
                      <TableCell className="font-medium">{record.patientName}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.professionalName}</TableCell>
                      <TableCell>{record.date}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.recordType}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.status === 'Completo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
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
                              <span>Visualizar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Download className="mr-2 h-4 w-4" />
                              <span>Exportar</span>
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
                      Nenhum prontuário encontrado.
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
