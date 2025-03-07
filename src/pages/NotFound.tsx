
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 animate-fadeIn">
        <div className="flex justify-center">
          <FileQuestion className="h-20 w-20 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold">Página não encontrada</h1>
        <p className="text-xl text-muted-foreground max-w-md">
          Desculpe, não conseguimos encontrar a página que você está procurando.
        </p>
        <Button asChild className="mt-4">
          <a href="/">Voltar para o Início</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
