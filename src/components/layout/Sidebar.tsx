
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  CalendarClock, 
  ClipboardList, 
  CreditCard, 
  FileText, 
  Home, 
  Settings, 
  UserCircle, 
  UserCog,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const clinicName = "PsychoCare";

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Pacientes', href: '/pacientes', icon: UserCircle },
    { name: 'Profissionais', href: '/profissionais', icon: UserCog },
    { name: 'Agendamentos', href: '/agendamentos', icon: CalendarClock },
    { name: 'Prontuários', href: '/prontuarios', icon: ClipboardList },
    { name: 'Financeiro', href: '/financeiro', icon: CreditCard },
    { name: 'Relatórios', href: '/relatorios', icon: BarChart3 },
    { name: 'Convênios', href: '/convenios', icon: FileText },
  ];

  const bottomNavigation = [
    { name: 'Configurações', href: '/configuracoes', icon: Settings },
  ];

  const sidebarStyles = cn(
    "fixed inset-y-0 left-0 z-50 flex flex-col w-64 h-full overflow-hidden transition-all duration-300 bg-white border-r",
    {
      "translate-x-0": isOpen,
      "-translate-x-full": !isOpen && isMobile
    }
  );

  const overlayStyles = cn(
    "fixed inset-0 z-40 bg-black/50 transition-opacity duration-300",
    {
      "opacity-100 pointer-events-auto": isOpen && isMobile,
      "opacity-0 pointer-events-none": !isOpen || !isMobile
    }
  );

  return (
    <>
      <div className={overlayStyles} onClick={toggle}></div>
      
      <aside className={sidebarStyles}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <h1 className="text-xl font-medium bg-gradient-to-r from-brand-600 to-brand-500 bg-clip-text text-transparent">
              {clinicName}
            </h1>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggle}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group",
                {
                  "bg-brand-50 text-brand-600": location.pathname === item.href,
                  "text-muted-foreground hover:bg-brand-50 hover:text-brand-600": 
                    location.pathname !== item.href
                }
              )}
            >
              <item.icon className={cn(
                "mr-3 h-5 w-5 transition-colors",
                {
                  "text-brand-600": location.pathname === item.href,
                  "text-muted-foreground group-hover:text-brand-600": 
                    location.pathname !== item.href
                }
              )} />
              {item.name}
            </Link>
          ))}
        </div>

        <div className="p-4 space-y-1">
          <Separator />
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 group",
                {
                  "bg-brand-50 text-brand-600": location.pathname === item.href,
                  "text-muted-foreground hover:bg-brand-50 hover:text-brand-600": 
                    location.pathname !== item.href
                }
              )}
            >
              <item.icon className={cn(
                "mr-3 h-5 w-5 transition-colors",
                {
                  "text-brand-600": location.pathname === item.href,
                  "text-muted-foreground group-hover:text-brand-600": 
                    location.pathname !== item.href
                }
              )} />
              {item.name}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}
