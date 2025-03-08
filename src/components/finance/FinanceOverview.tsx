import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  DollarSign,
  Download, 
  Filter, 
  PlusCircle,
  ReceiptText,
  Wallet
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TransactionForm from "./TransactionForm";
import InsurancePaymentForm from "./InsurancePaymentForm";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Sample data for financial overview
const financialSummary = {
  thisMonth: {
    revenue: 28450,
    expenses: 12340,
    profit: 16110
  },
  lastMonth: {
    revenue: 24120,
    expenses: 10980,
    profit: 13140
  }
};

// Sample data for transactions
const transactions = [
  {
    id: 1,
    date: "12/06/2023",
    description: "Consulta - Ana Silva",
    type: "revenue",
    amount: 250,
    status: "Pago",
    paymentMethod: "Cartão de Crédito",
    category: "Consulta Particular"
  },
  {
    id: 2,
    date: "11/06/2023",
    description: "Aluguel do Consultório",
    type: "expense",
    amount: 3500,
    status: "Pago",
    paymentMethod: "Transferência",
    category: "Aluguel"
  },
  {
    id: 3,
    date: "10/06/2023",
    description: "Consulta - João Oliveira",
    type: "revenue",
    amount: 250,
    status: "Pago",
    paymentMethod: "Dinheiro",
    category: "Consulta Particular"
  },
  {
    id: 4,
    date: "08/06/2023",
    description: "Salário - Secretária",
    type: "expense",
    amount: 2200,
    status: "Pago",
    paymentMethod: "Transferência",
    category: "Salários"
  },
  {
    id: 5,
    date: "05/06/2023",
    description: "Repasse Unimed",
    type: "revenue",
    amount: 3850,
    status: "Pendente",
    paymentMethod: "Transferência",
    category: "Repasse Convênio"
  },
];

// Sample data for insurance breakdown
const insuranceBreakdown = [
  { name: "Unimed", value: 12500, color: "#3D9AFF" },
  { name: "Bradesco", value: 8200, color: "#66AFFF" },
  { name: "SulAmérica", value: 4800, color: "#8FC5FF" },
  { name: "Amil", value: 2950, color: "#B8DAFF" },
];

// Sample data for insurance payments
const insurancePayments = [
  { 
    id: 1,
    insurance: "Unimed",
    amount: 4500,
    expectedDate: "15/07/2023",
    status: "Pendente",
    referenceMonth: "Junho/2023",
    patients: 18
  },
  { 
    id: 2,
    insurance: "Bradesco",
    amount: 3200,
    expectedDate: "20/07/2023",
    status: "Pendente",
    referenceMonth: "Junho/2023",
    patients: 12
  },
  { 
    id: 3,
    insurance: "SulAmérica",
    amount: 2150,
    expectedDate: "10/07/2023",
    status: "Recebido",
    receiveDate: "08/07/2023",
    referenceMonth: "Junho/2023",
    patients: 8
  },
  { 
    id: 4,
    insurance: "Amil",
    amount: 1800,
    expectedDate: "25/07/2023",
    status: "Pendente",
    referenceMonth: "Junho/2023",
    patients: 7
  },
];

// Sample data for monthly expenses by category
const expensesByCategory = [
  { name: "Aluguel", value: 3500, color: "#FF6B6B" },
  { name: "Salários", value: 5400, color: "#FF8E8E" },
  { name: "Materiais", value: 1200, color: "#FFA8A8" },
  { name: "Serviços", value: 850, color: "#FFC2C2" },
  { name: "Outros", value: 1390, color: "#FFD8D8" },
];

// Sample data for monthly performance
const monthlyPerformance = [
  { name: "Jan", revenue: 22150, expenses: 10340 },
  { name: "Fev", revenue: 20840, expenses: 9820 },
  { name: "Mar", revenue: 25600, expenses: 11050 },
  { name: "Abr", revenue: 23750, expenses: 10680 },
  { name: "Mai", revenue: 24120, expenses: 10980 },
  { name: "Jun", revenue: 28450, expenses: 12340 },
];

export default function FinanceOverview() {
  // For tab state
  const [activeTab, setActiveTab] = useState("overview");
  const [transactionType, setTransactionType] = useState<"payment" | "expense" | null>(null);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    dateRange: "all",
    transactionType: "all",
    status: "all",
    category: "all"
  });
  const { toast } = useToast();
  
  // Calculate percentage increase in profit
  const profitIncrease = (
    (financialSummary.thisMonth.profit - financialSummary.lastMonth.profit) / 
    financialSummary.lastMonth.profit * 100
  ).toFixed(1);

  const handleNewTransaction = (type: "payment" | "expense") => {
    setTransactionType(type);
  };

  const handleNewInsurancePayment = () => {
    setShowInsuranceForm(true);
  };

  const handleTransactionSubmit = (data: any) => {
    // Em um caso real, integraríamos com um backend
    toast({
      title: "Transação Registrada",
      description: `${data.type === 'revenue' ? 'Receita' : 'Despesa'} de R$ ${data.amount} registrada com sucesso.`,
    });
    setTransactionType(null);
  };

  const handleInsurancePaymentSubmit = (data: any) => {
    // Em um caso real, integraríamos com um backend
    toast({
      title: "Repasse de Convênio Registrado",
      description: `Repasse de ${data.insurance} no valor de R$ ${data.amount} registrado com sucesso.`,
    });
    setShowInsuranceForm(false);
  };

  const handleFilter = () => {
    toast({
      title: "Filtros Aplicados",
      description: "Os resultados foram filtrados conforme selecionado.",
    });
  };

  const handleConfirmPayment = (id: number) => {
    toast({
      title: "Pagamento Confirmado",
      description: "O pagamento foi confirmado como recebido.",
    });
  };

  const handleExport = () => {
    // Em um cenário real, isso geraria um arquivo CSV ou PDF
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Data,Descrição,Tipo,Valor,Status,Método de Pagamento\n"
      + transactions.map(t => {
          return `${t.date},"${t.description}",${t.type},${t.amount},${t.status},${t.paymentMethod}`;
        }).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `relatorio_financeiro_${format(new Date(), "dd-MM-yyyy")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Relatório Exportado",
      description: "O relatório financeiro foi exportado com sucesso.",
    });
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filterOptions.transactionType !== "all" && transaction.type !== filterOptions.transactionType) {
      return false;
    }
    if (filterOptions.status !== "all" && transaction.status !== filterOptions.status) {
      return false;
    }
    if (filterOptions.category !== "all" && transaction.category !== filterOptions.category) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleFilter}>
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" className="w-full sm:w-auto" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Transação
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Escolha o tipo de transação</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-32 space-y-2"
                  onClick={() => handleNewTransaction("payment")}
                >
                  <Wallet className="h-8 w-8 text-green-500" />
                  <span>Registrar Pagamento</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-32 space-y-2"
                  onClick={() => handleNewTransaction("expense")}
                >
                  <ReceiptText className="h-8 w-8 text-red-500" />
                  <span>Registrar Despesa</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex flex-col items-center justify-center h-32 space-y-2 md:col-span-2"
                  onClick={handleNewInsurancePayment}
                >
                  <DollarSign className="h-8 w-8 text-blue-500" />
                  <span>Controle de Repasses</span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
          <TabsTrigger value="insurance">Convênios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 animate-fadeIn">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Receita Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {financialSummary.thisMonth.revenue.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-green-500">
                  +{((financialSummary.thisMonth.revenue - financialSummary.lastMonth.revenue) / financialSummary.lastMonth.revenue * 100).toFixed(1)}% em relação ao mês anterior
                </p>
                <Progress 
                  value={80} 
                  className="h-1 mt-3" 
                />
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Despesa Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {financialSummary.thisMonth.expenses.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-red-500">
                  +{((financialSummary.thisMonth.expenses - financialSummary.lastMonth.expenses) / financialSummary.lastMonth.expenses * 100).toFixed(1)}% em relação ao mês anterior
                </p>
                <Progress 
                  value={65} 
                  className="h-1 mt-3" 
                />
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Lucro Mensal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  R$ {financialSummary.thisMonth.profit.toLocaleString('pt-BR')}
                </div>
                <p className="text-xs text-green-500">
                  +{profitIncrease}% em relação ao mês anterior
                </p>
                <Progress 
                  value={75} 
                  className="h-1 mt-3" 
                />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Receita por Convênio</CardTitle>
                <CardDescription>
                  Distribuição da receita entre os convênios
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px] p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={insuranceBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#3D9AFF"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {insuranceBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
                        contentStyle={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Fluxo de Caixa Recente</CardTitle>
                <CardDescription>
                  Últimas 5 transações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-2 rounded-lg transition-all hover:bg-muted/50"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'revenue' 
                            ? 'bg-green-100' 
                            : 'bg-red-100'
                        }`}>
                          {transaction.type === 'revenue' ? (
                            <ArrowUpCircle className={`h-5 w-5 text-green-600`} />
                          ) : (
                            <ArrowDownCircle className={`h-5 w-5 text-red-600`} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          transaction.type === 'revenue' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {transaction.type === 'revenue' ? '+' : '-'}
                          R$ {transaction.amount.toLocaleString('pt-BR')}
                        </p>
                        <p className="text-xs text-muted-foreground">{transaction.paymentMethod}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Despesas por Categoria</CardTitle>
                <CardDescription>
                  Distribuição das despesas do mês atual
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px] p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expensesByCategory}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#FF6B6B"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {expensesByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Despesa']}
                        contentStyle={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden transition-all hover:shadow-md">
              <CardHeader>
                <CardTitle>Desempenho Mensal</CardTitle>
                <CardDescription>
                  Receitas e despesas nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[300px] p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyPerformance}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                        contentStyle={{
                          backgroundColor: 'white',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        }}
                      />
                      <Legend />
                      <Bar dataKey="revenue" name="Receita" fill="#3D9AFF" />
                      <Bar dataKey="expenses" name="Despesas" fill="#FF6B6B" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="transactions" className="animate-fadeIn">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Todas as Transações</CardTitle>
                <CardDescription>
                  Histórico completo de transações financeiras
                </CardDescription>
              </div>
              <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                <Select 
                  value={filterOptions.transactionType}
                  onValueChange={(value) => setFilterOptions({...filterOptions, transactionType: value})}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Tipo de Transação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value="revenue">Receitas</SelectItem>
                    <SelectItem value="expense">Despesas</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={filterOptions.status}
                  onValueChange={(value) => setFilterOptions({...filterOptions, status: value})}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="Pago">Pago</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={filterOptions.category}
                  onValueChange={(value) => setFilterOptions({...filterOptions, category: value})}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas Categorias</SelectItem>
                    <SelectItem value="Consulta Particular">Consulta Particular</SelectItem>
                    <SelectItem value="Repasse Convênio">Repasse Convênio</SelectItem>
                    <SelectItem value="Aluguel">Aluguel</SelectItem>
                    <SelectItem value="Salários">Salários</SelectItem>
                    <SelectItem value="Materiais">Materiais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.paymentMethod}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          transaction.status === 'Pago'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {transaction.status}
                        </div>
                      </TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.type === 'revenue' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'revenue' ? '+' : '-'}
                        R$ {transaction.amount.toLocaleString('pt-BR')}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="animate-fadeIn space-y-6">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>Controle de Repasses</CardTitle>
                <CardDescription>
                  Acompanhamento dos repasses de convênios
                </CardDescription>
              </div>
              <Button onClick={handleNewInsurancePayment}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Registrar Repasse
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Convênio</TableHead>
                    <TableHead>Mês Referência</TableHead>
                    <TableHead>Pacientes</TableHead>
                    <TableHead>Data Prevista</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {insurancePayments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.insurance}</TableCell>
                      <TableCell>{payment.referenceMonth}</TableCell>
                      <TableCell>{payment.patients}</TableCell>
                      <TableCell>{payment.expectedDate}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          payment.status === 'Recebido'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {payment.status}
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        R$ {payment.amount.toLocaleString('pt-BR')}
                      </TableCell>
                      <TableCell className="text-right">
                        {payment.status === 'Pendente' ? (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleConfirmPayment(payment.id)}
                          >
                            Confirmar Recebimento
                          </Button>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Recebido em {payment.receiveDate}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Resumo de Repasses por Convênio</CardTitle>
              <CardDescription>
                Valores pendentes e recebidos por convênio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={[
                      { name: "Unimed", pendente: 4500, recebido: 8000 },
                      { name: "Bradesco", pendente: 3200, recebido: 5000 },
                      { name: "SulAmérica", pendente: 0, recebido: 4800 },
                      { name: "Amil", pendente: 1800, recebido: 1150 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, '']}
                      contentStyle={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Legend />
                    <Bar dataKey="recebido" name="Recebido" fill="#4ade80" />
                    <Bar dataKey="pendente" name="Pendente" fill="#fbbf24" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Formulário de transação */}
      {transactionType && (
        <Dialog open={!!transactionType} onOpenChange={() => setTransactionType(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {transactionType === "payment" ? "Registrar Pagamento" : "Registrar Despesa"}
              </DialogTitle>
            </DialogHeader>
            <TransactionForm
              type={transactionType}
              onSubmit={handleTransactionSubmit}
              onCancel={() => setTransactionType(null)}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* Formulário de repasse de convênio */}
      {showInsuranceForm && (
        <Dialog open={showInsuranceForm} onOpenChange={() => setShowInsuranceForm(false)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Registrar Repasse de Convênio</DialogTitle>
            </DialogHeader>
            <InsurancePaymentForm
              onSubmit={handleInsurancePaymentSubmit}
              onCancel={() => setShowInsuranceForm(false)}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
