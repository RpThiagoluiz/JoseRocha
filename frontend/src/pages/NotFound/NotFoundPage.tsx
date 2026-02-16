import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

/**
 * 404 Not Found page component.
 * Displays a user-friendly error page when a route is not found.
 */
export const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        <h2 className="text-3xl font-semibold text-foreground">
          Página não encontrada
        </h2>
        <p className="text-muted-foreground text-lg">
          A página que você está procurando não existe ou foi movida para outro
          endereço.
        </p>
        <div className="pt-4">
          <Button asChild size="lg">
            <Link to="/">Voltar para o Início</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
