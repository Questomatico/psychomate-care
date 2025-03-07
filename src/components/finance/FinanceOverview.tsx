
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
  Download, 
  Filter, 
  Plus 
} from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

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
  },
  {
    id: 2,
    date: "11/06/2023",
    description: "Aluguel do Consultório",
    type: "expense",
    amount: 3500,
    status: "Pago",
    paymentMethod: "Transferência",
  },
  {
    id: 3,
    date: "10/06/2023",
    description: "Consulta - João Oliveira",
    type: "revenue",
    amount: 250,
    status: "Pago",
    paymentMethod: "Dinheiro",
  },
  {
    id: 4,
    date: "08/06/2023",
    description: "Salário - Secretária",
    type: "expense",
    amount: 2200,
    status: "Pago",
    paymentMethod: "Transferência",
  },
  {
    id: 5,
    date: "05/06/2023",
    description: "Repasse Unimed",
    type: "revenue",
    amount: 3850,
    status: "Pendente",
    paymentMethod: "Transferência",
  },
];

// Sample data for insurance breakdown
const insuranceBreakdown = [
  { name: "Unimed", value: 12500, color: "#3D9AFF" },
  { name: "Bradesco", value: 8200, color: "#66AFFF" },
  { name: "SulAmérica", value: 4800, color: "#8FC5FF" },
  { name: "Amil", value: 2950, color: "#B8DAFF" },
];

export default function FinanceOverview() {
  // For tab state
  const [activeTab, setActiveTab] = useState("overview");
  
  // Calculate percentage increase in profit
  const profitIncrease = (
    (financialSummary.thisMonth.profit - financialSummary.lastMonth.profit) / 
    financialSummary.lastMonth.profit * 100
  ).toFixed(1);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Financeiro</h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filtrar
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Nova Transação
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="transactions">Transações</TabsTrigger>
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
        </TabsContent>
        
        <TabsContent value="transactions" className="animate-fadeIn">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle>Todas as Transações</CardTitle>
              <CardDescription>
                Histórico completo de transações financeiras
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
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
      </Tabs>
    </div>
  );
}
