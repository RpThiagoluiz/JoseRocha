import { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { routesConfig } from '@/routes/routes.config'
import { PageLoading } from '@/components/common/PageLoading'

export const AppRoutes = () => {
  const element = useRoutes(routesConfig)
  return <Suspense fallback={<PageLoading />}>{element}</Suspense>
}
