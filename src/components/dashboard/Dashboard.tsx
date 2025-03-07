
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  UserPlus, 
  Users 
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data for charts
const revenueData = [
  { name: 'Jan', total: 5800 },
  { name: 'Fev', total: 6200 },
  { name: 'Mar', total: 8100 },
  { name: 'Abr', total: 7400 },
  { name: 'Mai', total: 9600 },
  { name: 'Jun', total: 8900 },
];

const appointmentData = [
  { name: 'Seg', total: 12 },
  { name: 'Ter', total: 18 },
  { name: 'Qua', total: 15 },
  { name: 'Qui', total: 21 },
  { name: 'Sex', total: 16 },
  { name: 'Sáb', total: 8 },
];

export default function Dashboard() {
  const stats = [
    {
      title: "Pacientes Ativos",
      value: "145",
      icon: Users,
      change: "+4.3%",
      trend: "up",
    },
    {
      title: "Novos Pacientes",
      value: "12",
      icon: UserPlus,
      change: "+10.2%",
      trend: "up",
    },
    {
      title: "Consultas Hoje",
      value: "24",
      icon: Calendar,
      change: "+2.1%",
      trend: "up",
    },
    {
      title: "Receita Mensal",
      value: "R$ 28.450",
      icon: DollarSign,
      change: "+18.7%",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="overflow-hidden transition-all hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change} em relação ao mês anterior
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Receita Mensal</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `R$${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`R$${value}`, 'Receita']}
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="total"
                    stroke="#3D9AFF"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, fill: '#3D9AFF' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>Consultas por Dia</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={appointmentData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}`, 'Consultas']}
                    contentStyle={{
                      backgroundColor: 'white',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Bar 
                    dataKey="total" 
                    fill="#3D9AFF" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden transition-all hover:shadow-md lg:col-span-2">
          <CardHeader>
            <CardTitle>Próximas Consultas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((_, i) => (
                <div 
                  key={i} 
                  className="flex items-center p-3 space-x-4 border rounded-lg transition-all hover:bg-muted/50"
                >
                  <div className="flex-shrink-0 w-2 h-12 bg-brand-400 rounded-full"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">Ana Silva</p>
                    <p className="text-xs text-muted-foreground">Terapia Individual • Dr. Carlos Mendes</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">14:30</p>
                    <p className="text-xs text-muted-foreground">Hoje</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden transition-all hover:shadow-md">
          <CardHeader>
            <CardTitle>Convênios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {['Unimed', 'Bradesco Saúde', 'SulAmérica', 'Amil'].map((plan, i) => (
                <div 
                  key={i} 
                  className="flex items-center justify-between p-3 border rounded-lg transition-all hover:bg-muted/50"
                >
                  <p className="text-sm font-medium">{plan}</p>
                  <p className="text-sm">{25 - i * 5} pacientes</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
