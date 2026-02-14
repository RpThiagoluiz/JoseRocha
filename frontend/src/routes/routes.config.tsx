import { lazy, type ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '@/components/routes/ProtectedRoute'
import { MainLayout } from '@/components/layout/MainLayout'

/**
 * Resolves a named export from a dynamic import for use with React.lazy.
 */
function load<T extends ComponentType<object>>(
  importFn: () => Promise<Record<string, T>>,
  name: string,
) {
  return lazy(() =>
    importFn().then((module) => ({
      default: module[name] as T,
    })),
  )
}

const LoginPage = load(
  () => import('@/pages/Auth/LoginPage'),
  'LoginPage',
)

const DashboardPage = load(
  () => import('@/pages/Dashboard'),
  'DashboardPage',
)

const AssetFormPage = load(
  () => import('@/pages/AssetForm'),
  'AssetFormPage',
)

export const routesConfig: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/new',
            element: <AssetFormPage />,
          },
          {
            path: '/edit/:id',
            element: <AssetFormPage />,
          },
          {
            path: '*',
            element: <Navigate to="/dashboard" replace />,
          },
        ],
      },
    ],
  },
]

export { load }
