import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts'
import { AppRoutes } from '@/routes'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
