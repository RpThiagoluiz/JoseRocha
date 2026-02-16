import { Outlet, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuth } from '@/contexts'
import { Button } from '@/components/ui/button'

export const MainLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header
        className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
      >
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-xl font-semibold text-transparent">
            Gestão de Ativos
          </h1>
          <div className="flex items-center gap-3">
            {user?.email && (
              <span className="max-w-[200px] truncate text-sm text-muted-foreground sm:max-w-none">
                {user.email}
              </span>
            )}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="text-foreground hover:bg-muted/80"
              aria-label="Sair"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto animate-fade-in-700 px-4 py-8 sm:px-8">
        <Outlet />
      </main>
    </div>
  )
}
