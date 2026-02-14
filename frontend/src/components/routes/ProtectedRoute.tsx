import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/contexts'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet /> 
}
