
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
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
  Search, 
  Eye, 
  Download, 
  Pencil, 
  Trash2,
  FileDown 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MedicalRecordForm } from "./MedicalRecordForm";

// Sample data for medical records
const initialRecords = [
  {
    id: 1,
    patientName: "Ana Silva",
    professionalName: "Dr. Carlos Mendes",
    date: "2023-06-10",
    type: "Avaliação Inicial",
    hasAttachments: true,
  },
  {
    id: 2,
    patientName: "João Oliveira",
    professionalName: "Dra. Juliana Alves",
    date: "2023-06-08",
    type: "Terapia Individual",
    hasAttachments: false,
  },
  {
    id: 3,
    patientName: "Mariana Costa",
    professionalName: "Dr. Ricardo Sousa",
    date: "2023-06-05",
    type: "Terapia Familiar",
    hasAttachments: true,
  },
  {
    id: 4,
    patientName: "Carlos Santos",
    professionalName: "Dr. Carlos Mendes",
    date: "2023-06-03",
    type: "Acompanhamento",
    hasAttachments: false,
  },
  {
    id: 5,
    patientName: "Patricia Lima",
    professionalName: "Dra. Juliana Alves",
    date: "2023-05-28",
    type: "Terapia Individual",
    hasAttachments: true,
  },
];

export default function MedicalRecordsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [records, setRecords] = useState(initialRecords);
  const { toast } = useToast();
  
  const filteredRecords = records.filter(record => 
    record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.professionalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNewRecord = () => {
    setIsFormOpen(true);
  };

  const handleFormSubmit = (data: any) => {
    // Get patient and professional names from their IDs
    // In a real app, you would fetch these from your API
    const patientName = "Ana Silva"; // This would be fetched based on patientId
    const professionalName = "Dr. Carlos Mendes"; // This would be fetched based on professionalId

    // Create a new record
    const newRecord = {
      id: records.length + 1,
      patientName,
      professionalName,
      date: format(data.date, "yyyy-MM-dd"),
      type: data.sessionType,
      hasAttachments: data.fileUpload && data.fileUpload.length > 0,
    };

    // Add the new record to the list
    setRecords([newRecord, ...records]);
  };

  const handleExportRecords = () => {
    toast({
      title: "Exportar Prontuários",
      description: "Lista de prontuários exportada com sucesso!",
    });
  };

  const handleAction = (action: string, record: typeof records[0]) => {
    switch (action) {
      case "Visualizar":
        toast({
          title: `Prontuário de ${record.patientName}`,
          description: `Visualizando prontuário do dia ${formatDate(record.date)}`,
        });
        break;
      case "Baixar":
        toast({
          title: `Download de Prontuário`,
          description: `Prontuário de ${record.patientName} baixado com sucesso!`,
        });
        break;
      case "Editar":
        toast({
          title: `Editar Prontuário`,
          description: `Editando prontuário de ${record.patientName}`,
        });
        break;
      case "Excluir":
        // Remove record from list
        setRecords(records.filter(r => r.id !== record.id));
        toast({
          title: `Prontuário Excluído`,
          description: `Prontuário de ${record.patientName} excluído com sucesso!`,
        });
        break;
      default:
        toast({
          title: `${action}: ${record.patientName}`,
          description: `Funcionalidade em desenvolvimento`,
        });
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yyyy", { locale: ptBR });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Prontuários</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleExportRecords}
          >
            <FileDown className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button 
            className="w-full sm:w-auto" 
            onClick={handleNewRecord}
          >
            <FilePlus className="mr-2 h-4 w-4" />
            Novo Registro
          </Button>
        </div>
      </div>

      <Card className="overflow-hidden transition-all hover:shadow-md">
        <CardHeader className="pb-2">
          <CardTitle>Registros de Prontuários</CardTitle>
          <CardDescription>
            Gerencie os prontuários de todos os seus pacientes
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
                  <TableHead>Anexos</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((record) => (
                    <TableRow key={record.id} className="transition-colors hover:bg-muted/50">
                      <TableCell className="font-medium">{record.patientName}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.professionalName}</TableCell>
                      <TableCell>{formatDate(record.date)}</TableCell>
                      <TableCell className="hidden md:table-cell">{record.type}</TableCell>
                      <TableCell>
                        {record.hasAttachments ? (
                          <span className="text-green-600">Sim</span>
                        ) : (
                          <span className="text-gray-400">Não</span>
                        )}
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
                            <DropdownMenuItem onClick={() => handleAction("Visualizar", record)}>
                              <Eye className="mr-2 h-4 w-4" />
                              <span>Visualizar</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleAction("Baixar", record)}
                              disabled={!record.hasAttachments}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              <span>Baixar Anexos</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleAction("Editar", record)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Editar</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-destructive"
                              onClick={() => handleAction("Excluir", record)}
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
                      Nenhum prontuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <MedicalRecordForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
