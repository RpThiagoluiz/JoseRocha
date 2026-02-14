## Arquitetura de Pastas

Este documento descreve a arquitetura de pastas da aplicação React (CRA) deste projeto.

### Visão Geral

- **`api/`**: Centraliza toda a comunicação com APIs externas e internas.
- **`assets/`**: Armazena recursos estáticos (imagens, fontes, estilos globais).
- **`components/`**: Componentes reutilizáveis de UI, layout, formulários, comuns e específicos de features.
- **`contexts/`**: Contextos React para estado global compartilhado.
- **`hooks/`**: Hooks customizados para lógica reutilizável.
- **`pages/`**: Páginas/Views mapeadas para rotas.
- **`routes/`**: Configuração de rotas e componentes de proteção de rota.
- **`store/`**: Gerenciamento de estado global (Redux/Zustand/etc).
- **`types/`**: Tipos TypeScript globais.
- **`utils/`**: Funções utilitárias, constantes e bibliotecas de suporte.
- **`__tests__/`**: Testes de integração/e2e e mocks.

---

### 📁 `api/`

**Propósito**: Centralizar todas as chamadas de API.

- **`axiosConfig.ts`**: Configuração base do Axios (interceptors, headers, `baseURL`).
- **`endpoints/`**: URLs e métodos de API organizados por domínio (`auth.endpoints.ts`, `user.endpoints.ts`, `products.endpoints.ts`).
- **`services/`**: Funções que consomem os endpoints (`auth.service.ts`, `user.service.ts`, `products.service.ts`).
- **`types/`**: Tipos TypeScript específicos para respostas de API (`auth.types.ts`, `api.types.ts`).

---

### 📁 `assets/`

**Propósito**: Armazenar recursos estáticos.

- **`fonts/`**: Fontes customizadas.
- **`images/`**: Imagens e ícones (subpastas `icons/`, `logos/`, `backgrounds/`).
- **`styles/`**: Estilos globais adicionais (`globals.css`).

**Convenções**:

- Usar nomes descritivos em `kebab-case`.
- Otimizar imagens antes de adicionar ao projeto.
- Organizar por tipo e função.

---

### 📁 `components/`

**Propósito**: Componentes reutilizáveis da UI.

**Estrutura por responsabilidade**:

- **`ui/`**: Componentes básicos de UI (botão, card, etc. — baseados em shadcn/ui).
- **`layout/`**: Componentes que definem a estrutura da página (`Header`, `Footer`, `Sidebar`, `Layout`).
- **`forms/`**: Componentes relacionados a formulários (`InputField`, `SelectField`, `FormValidator`).
- **`common/`**: Componentes utilitários genéricos (`LoadingSpinner`, `ErrorBoundary`, `Modal`).
- **`features/`**: Componentes específicos de funcionalidades (`ProductCard`, `UserProfile`, `SearchBar`).

**Regras**:

- Um componente por pasta.
- Incluir teste e arquivo de exportação (`index.ts`) quando o componente for implementado.
- Usar **named exports**.

---

### 📁 `contexts/`

**Propósito**: Gerenciar estado global com React Context.

**Uso**:

- Para estado que precisa ser acessado por múltiplos componentes não diretamente conectados (ex.: autenticação, tema, notificações).

Exemplos de contextos:

- `AuthContext.tsx`
- `ThemeContext.tsx`
- `NotificationContext.tsx`

---

### 📁 `hooks/`

**Propósito**: Hooks customizados para encapsular lógica reutilizável.

**Convenções**:

- Sempre prefixar com `use` (ex.: `useAuth`, `useLocalStorage`, `useDebounce`, `useApi`).
- Seguir as regras dos hooks do React (chamados no topo de componentes/hooks, nunca em loops ou condicionais).

---

### 📁 `pages/`

**Propósito**: Componentes de página/rota.

**Estrutura**:

- Uma pasta por página principal:
  - `HomePage/`
  - `Auth/` (subpastas `LoginPage/`, `RegisterPage/`, `ForgotPasswordPage/`)
  - `Dashboard/`
  - `Error/` (`NotFoundPage.tsx`, `ErrorPage.tsx`)
- Componentes específicos da página dentro de `components/` (ex.: `HomePage/components/HeroSection`).
- Testes junto ao componente principal da página (`HomePage.test.tsx`, etc.).

---

### 📁 `routes/`

**Propósito**: Configuração de roteamento da aplicação.

**Componentes principais**:

- `AppRoutes.tsx`: Configuração principal de rotas.
- `PrivateRoute.tsx`: Rotas que requerem autenticação.
- `PublicRoute.tsx`: Rotas públicas (acesso livre).
- `routes.config.ts`: Definições de rotas (paths, metas, permissões).

---

### 📁 `store/`

**Propósito**: Gerenciamento de estado global.

**Opções possíveis**:

- Redux Toolkit.
- Zustand.
- Context API (casos mais simples).

**Organização**:

- `slices/` por domínio de negócio (`auth.slice.ts`, `user.slice.ts`, `products.slice.ts`).
- `store.ts`: Criação e configuração da store.
- `hooks.ts`: Hooks tipados (`useAppDispatch`, `useAppSelector`, etc.).

---

### 📁 `types/`

**Propósito**: Tipos TypeScript globais.

**Organização**:

- Por domínio/entidade:
  - `user.types.ts`
  - `product.types.ts`
  - `common.types.ts`
- `global.d.ts`: Declarações de tipos globais.
- `index.ts`: Barrel file com reexports de tipos principais.

---

### 📁 `utils/`

**Propósito**: Funções utilitárias e constantes.

**Organização**:

- `helpers/`: Funções helper (`formatDate`, `currencyFormatter`, `stringUtils`, etc.).
- `constants/`: Constantes da aplicação (`app.constants.ts`, `routes.constants.ts`, `validation.constants.ts`).
- `validators/`: Funções de validação (`formValidators.ts`, `schemaValidators.ts`).
- `lib/`: Bibliotecas/configurações auxiliares (`shadcn.ts`, `tailwind.ts`).

**Regras**:

- Preferir funções puras sempre que possível.
- Evitar dependência circular com camadas de domínio.

---

### 📁 `__tests__/`

**Propósito**: Testes de integração/e2e e infraestrutura de mocks.

**Estrutura base**:

- `integration/`: Testes de integração da aplicação.
- `mocks/`: Mocks de API e handlers:
  - `server.ts`
  - `handlers.ts`
