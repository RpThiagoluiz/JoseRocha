# Guia de Criação de Páginas

Este documento descreve o **passo a passo para criar uma nova página** no backoffice, mantendo:

- **Arquitetura limpa** (pasta correta em `src/pages/`).
- **Layout e UX padronizados** (DashboardLayout, PageContainer, componentes shadcn/ui).
- **Rotas protegidas** (ProtectedRoute + AuthContext).
- **Registro no menu lateral (Sidebar)**.
- **Testes alinhados ao produto**.

Tudo deve ser mantido em **TypeScript** e **React 19**, seguindo as regras de arquitetura do projeto.

---

## 1. Antes de começar

Confirme:

- **A rota será protegida?**
  - Sim → ficará **dentro do Dashboard** (`/dashboard/...`) e será protegida por `ProtectedRoute`.
- **Ela é uma página de autenticação (ex.: login)?**
  - Sim → mantenha em `src/pages/Auth/...` e não use o layout do Dashboard.

Este guia foca no caso mais comum: **nova página dentro do Dashboard**.

---

## 2. Criar a página em `src/pages/`

1. Escolha um nome claro para a página (ex.: `UsersRegisterPage`, `UserProfilePage`).
2. Crie o arquivo em `src/pages/Dashboard/` (enquanto as telas ficarem agrupadas sob o dashboard):

```text
src/
  pages/
    Dashboard/
      UsersRegisterPage.tsx
      UserProfilePage.tsx
      index.ts
```

3. Use **PageContainer** para manter o padrão visual:

```tsx
// src/pages/Dashboard/UsersRegisterPage.tsx
import { PageContainer } from '@/components/layout/Dashboard';

export function UsersRegisterPage() {
  return (
    <PageContainer title="Usuários cadastrados">
      {/* Conteúdo da página aqui (tabelas, filtros, formulários etc.) */}
    </PageContainer>
  );
}
```

4. Exporte a página no `index.ts` do diretório:

```ts
// src/pages/Dashboard/index.ts
export { DashboardPage } from './DashboardPage';
export { UsersRegisterPage } from './UsersRegisterPage';
export { UserProfilePage } from './UserProfilePage';
```

---

## 3. Registrar a rota em `AppRoutes`

Rotas são configuradas em `src/routes/AppRoutes.tsx`.  
Todas as rotas do Dashboard devem estar:

- protegidas por `ProtectedRoute`;
- dentro do `DashboardLayout` (Sidebar + Header + área de conteúdo).

Exemplo de estrutura (simplificado):

```tsx
// src/routes/AppRoutes.tsx
import { Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/pages/Auth/LoginPage';
import {
  DashboardPage,
  UsersRegisterPage,
  UserProfilePage,
} from '@/pages/Dashboard';
import { ProtectedRoute } from '@/components/routes/ProtectedRoute';
import { DashboardLayout } from '@/components/layout/Dashboard';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route
            path="/dashboard/users/register"
            element={<UsersRegisterPage />}
          />
          <Route
            path="/dashboard/users/profile"
            element={<UserProfilePage />}
          />
        </Route>
      </Route>
    </Routes>
  );
}
```

> **Regra:** **nunca** renderize página protegida fora de `ProtectedRoute` + `DashboardLayout`.

---

## 4. Registrar a página no menu lateral (Sidebar)

O menu do Dashboard é configurado em:

- `src/components/layout/Dashboard/dashboardNav.types.ts`
- `src/components/layout/Dashboard/dashboardNav.config.tsx`

### 4.1. Estrutura de tipos

```ts
// dashboardNav.types.ts
import type { LucideIcon } from 'lucide-react';

export interface NavItemSingle {
  type: 'single';
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface NavItemGroup {
  type: 'group';
  label: string;
  icon: LucideIcon;
  children: Array<{ label: string; path: string }>;
}

export type NavItem = NavItemSingle | NavItemGroup;
```

### 4.2. Adicionando um item no menu

Abra `dashboardNav.config.tsx` e:

- Para um **link simples**:

```ts
import { LayoutDashboard, Users } from 'lucide-react';
import type { NavItem } from './dashboardNav.types';

export const dashboardNavItems: NavItem[] = [
  {
    type: 'single',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  // Novo item simples
  {
    type: 'single',
    label: 'Relatórios',
    path: '/dashboard/relatorios',
    icon: Users,
  },
];
```

- Para um **grupo com sub-itens** (usando `Collapsible`):

```ts
// Ainda em dashboardNav.config.tsx
export const dashboardNavItems: NavItem[] = [
  {
    type: 'single',
    label: 'Dashboard',
    path: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    type: 'group',
    label: 'Gestão de Usuários',
    icon: Users,
    children: [
      { label: 'Cadastrados', path: '/dashboard/users/register' },
      { label: 'Perfis', path: '/dashboard/users/profile' },
    ],
  },
];
```

> **Importante:** A `path` do nav **deve existir** em `AppRoutes.tsx`, e o prefixo `/dashboard/...` garante a proteção pela `ProtectedRoute`.

---

## 5. Componentes e padrões visuais

Para **manter o padrão de UI/UX**:

- Use **PageContainer** (`@/components/layout/Dashboard`) como wrapper das páginas do dashboard.
- Use componentes **shadcn/ui** de `@/components/ui/`:
  - `Button`, `Card`, `Input`, `ScrollArea`, `Separator`, `Collapsible`, etc.
- Evite CSS manual fora de Tailwind; use classes semânticas:
  - `bg-background`, `bg-primary`, `text-primary-foreground`, `text-muted-foreground`, etc.
- Não use cores hardcoded (`#FFF`, `bg-blue-500`); siga o `colors.config.ts` + tokens em `index.css`.

---

## 6. Proteção de rota e autenticação

As páginas do Dashboard:

- dependem de `AuthContext` (`useAuth`) para saber se o usuário está autenticado;
- são protegidas por `ProtectedRoute` em `AppRoutes.tsx`.

Regras:

- **Nunca** chame `logout` direto na página (DashboardPage, UsersRegisterPage, etc.).
  - O botão de sair fica no **Header do Dashboard** (`src/components/layout/Dashboard/Header/Header.tsx`).
- Para acessar informações do usuário:

```ts
import { useAuth } from '@/contexts/AuthContext';

const { user, isAuthenticated } = useAuth();
```

Use isso apenas para exibição ou lógica de tela, **não** para mudar fluxo de autenticação (isso é responsabilidade do `ProtectedRoute`).

---

## 7. Testes da nova página

Sempre que criar uma página nova, escreva testes que validem o comportamento relevante.  
Diretrizes:

- Arquivo de teste ao lado da página:

```text
src/pages/Dashboard/UsersRegisterPage.tsx
src/pages/Dashboard/UsersRegisterPage.test.tsx
```

- Use **Testing Library** (`@testing-library/react`) e **Jest**:
  - Testar **texto importante**, títulos, botões principais.
  - Testar **interações** (ex.: clique em botões que abrem modais, disparam submits, mudam filtros).
  - Se a página consome `useAuth`, envolver em `AuthProvider` e `BrowserRouter`, como já feito em `DashboardPage.test.tsx`.

Exemplo mínimo:

```tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { UsersRegisterPage } from './UsersRegisterPage';

function TestWrapper({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}

describe('UsersRegisterPage', () => {
  it('renders page title', () => {
    render(
      <TestWrapper>
        <UsersRegisterPage />
      </TestWrapper>,
    );

    expect(
      screen.getByRole('heading', { name: /usuários cadastrados/i }),
    ).toBeInTheDocument();
  });
});
```

> Para diretrizes gerais de testes, consulte [`TESTING.md`](../.cursor/tests/TESTING.md).

---

## 8. Checklist rápido para criar uma nova página

1. **Criar a página** em `src/pages/<Domínio>/` usando `PageContainer`.
2. **Exportar** a página no `index.ts` da pasta.
3. **Adicionar rota** correspondente em `src/routes/AppRoutes.tsx`:
   - Dentro de `<ProtectedRoute>` e `<DashboardLayout>` (se for parte do dashboard).
4. **Registrar no menu** em `dashboardNav.config.tsx` (single ou group).
5. **Usar componentes padronizados**:
   - `PageContainer`, componentes shadcn (`Button`, `Card`, etc.).
6. **Escrever testes** (`*.test.tsx`) validando conteúdo e interações principais.
7. **Rodar os testes** relacionados (`npm test -- --testPathPattern="<NomeDaPage>"`).

Seguindo este fluxo, todas as páginas novas permanecem consistentes com a arquitetura e o design do projeto.
