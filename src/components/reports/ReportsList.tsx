
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  BarChart3,
  Download,
  FileSpreadsheet, 
  PieChart as PieChartIcon, 
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for reports
const monthlyData = [
  { name: 'Jan', consultas: 65, receita: 15800 },
  { name: 'Fev', consultas: 59, receita: 14200 },
  { name: 'Mar', consultas: 80, receita: 19500 },
  { name: 'Abr', consultas: 81, receita: 19800 },
  { name: 'Mai', consultas: 56, receita: 13600 },
  { name: 'Jun', consultas: 55, receita: 13200 },
];

const patientDemographics = [
  { name: 'Feminino', value: 65, color: '#8884d8' },
  { name: 'Masculino', value: 35, color: '#82ca9d' },
];

const professionalPerformance = [
  { name: 'Dr. Carlos Mendes', consultas: 45, receita: 11250 },
  { name: 'Dra. Juliana Alves', consultas: 38, receita: 9500 },
  { name: 'Dr. Ricardo Sousa', consultas: 27, receita: 6750 },
  { name: 'Dra. Mariana Costa', consultas: 18, receita: 4500 },
  { name: 'Dr. Fernando Lima', consultas: 32, receita: 8000 },
];

const insuranceDistribution = [
  { name: 'Unimed', value: 40, color: '#0088FE' },
  { name: 'Bradesco', value: 25, color: '#00C49F' },
  { name: 'SulAmérica', value: 15, color: '#FFBB28' },
  { name: 'Amil', value: 10, color: '#FF8042' },
  { name: 'Particular', value: 10, color: '#8884d8' },
];

export default function ReportsList() {
  const [activeTab, setActiveTab] = useState('financeiro');
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Exportar Relatório",
      description: "Funcionalidade de exportação em desenvolvimento",
    });
  };

  const handleGenerateReport = () => {
    toast({
      title: "Gerar Relatório",
      description: "Funcionalidade de geração de relatório em desenvolvimento",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Relatórios</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleExportReport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button className="w-full sm:w-auto" onClick={handleGenerateReport}>
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Gerar Relatório
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 sm:w-auto">
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          <TabsTrigger value="consultas">Consultas</TabsTrigger>
          <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="financeiro" className="space-y-6 animate-fadeIn">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Relatório Financeiro Mensal</CardTitle>
              <CardDescription>
                Análise de receitas e consultas nos últimos 6 meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="consultas" orientation="left" />
                    <YAxis yAxisId="receita" orientation="right" />
                    <Tooltip formatter={(value, name) => [
                      name === 'receita' ? `R$ ${value}` : value, 
                      name === 'receita' ? 'Receita' : 'Consultas'
                    ]} />
                    <Legend />
                    <Bar yAxisId="consultas" dataKey="consultas" fill="#8884d8" name="Consultas" />
                    <Bar yAxisId="receita" dataKey="receita" fill="#82ca9d" name="Receita (R$)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Desempenho por Profissional</CardTitle>
              <CardDescription>
                Número de consultas e receita gerada por cada profissional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Profissional</TableHead>
                    <TableHead>Consultas</TableHead>
                    <TableHead>Receita</TableHead>
                    <TableHead>Média por Consulta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {professionalPerformance.map((prof) => (
                    <TableRow key={prof.name}>
                      <TableCell className="font-medium">{prof.name}</TableCell>
                      <TableCell>{prof.consultas}</TableCell>
                      <TableCell>R$ {prof.receita.toLocaleString('pt-BR')}</TableCell>
                      <TableCell>R$ {(prof.receita / prof.consultas).toLocaleString('pt-BR')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="consultas" className="space-y-6 animate-fadeIn">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Distribuição por Convênio</CardTitle>
                <CardDescription>
                  Percentual de atendimentos por cada convênio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={insuranceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {insuranceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Tendência de Agendamentos</CardTitle>
                <CardDescription>
                  Evolução do número de consultas nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="consultas" fill="#8884d8" name="Consultas" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="pacientes" className="space-y-6 animate-fadeIn">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Distribuição por Gênero</CardTitle>
                <CardDescription>
                  Proporção de pacientes por gênero
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={patientDemographics}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {patientDemographics.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <div>
                  <CardTitle>Resumo de Pacientes</CardTitle>
                  <CardDescription>
                    Estatísticas sobre a base de pacientes
                  </CardDescription>
                </div>
                <Users className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Total de Pacientes</div>
                    <div className="text-2xl font-bold">125</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Pacientes Ativos</div>
                    <div className="text-2xl font-bold">87</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Novos Pacientes (Mês)</div>
                    <div className="text-2xl font-bold">12</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Taxa de Retorno</div>
                    <div className="text-2xl font-bold">73%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
