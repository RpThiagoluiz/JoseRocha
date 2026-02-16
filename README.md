# Jose Rocha — Assets Manager Monorepo

Este repositório é um monorepo que contém o Frontend (React/Vite), o Backend (API REST Spring Boot) e a governança de código centralizada na raiz.

## 🚀 Como Executar a Aplicação (Docker)

A aplicação está totalmente conteinerizada. Para rodar o Banco de Dados, o Backend e o Frontend simultaneamente, execute o comando abaixo na raiz do projeto:

```bash
docker-compose up -d --build

```

### Acessos e Portas

- **Frontend (UI):** [http://localhost:5173](http://localhost:5173)
- **Backend (API):** `http://localhost:8080`
- **Documentação da API (Swagger):** [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

> **⚠️ Nota sobre o Login:** A funcionalidade de autenticação no Frontend está mockada (simulada) para facilitar a avaliação do desafio. **Qualquer e-mail em formato válido e qualquer senha** permitirão o acesso ao Dashboard.

---

## 🏗️ Estrutura do Projeto

- **`frontend/`** — Aplicação SPA em React utilizando Vite e Shadcn UI.
- **`backend/`** — API REST construída em Java com Spring Boot.
- **`documents/`** — Documentação técnica detalhada e registro de decisões de arquitetura (ADRs).
- **`.husky/`** e **`.cursor/rules/`** — Hooks do Git (validação de commit) e regras de inteligência artificial (MDC).

_(Documentação detalhada sobre a execução isolada do backend encontra-se em `documents/README_TECNICO.md`)_.

---

## 🧠 Decisões de Arquitetura e DX (Developer Experience)

- **Vite ao invés de Create React App (CRA):** Optamos pelo Vite devido ao seu tempo de build extremamente rápido e HMR (Hot Module Replacement) instantâneo. Isso também elimina a necessidade de usar bibliotecas de terceiros como o `craco` para sobrescrever configurações complexas do Webpack que o CRA esconde.
- **Cursor Rules (`.mdc`):** O projeto utiliza arquivos `.mdc` de governança inseridos para o editor Cursor (AI). Isso otimiza processos mecânicos de desenvolvimento, garantindo que o assistente de IA siga estritamente os padrões de arquitetura, testes e integração definidos pela equipe, escalando a produtividade com segurança.

---

## 🛠️ Governança e Commits

Para commitar alterações, é **obrigatório** seguir o padrão **Conventional Commits**. As mensagens de commit são validadas automaticamente por um hook (Commitlint).

**Exemplos válidos:**

- `feat: adiciona endpoint GET /assets`
- `fix: corrige validação do DTO de criação`
- `docs: atualiza README técnico`
- `chore: atualiza dependência do Spring Boot`

_(Tipos comuns suportados: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `build`)_.

### Pré-requisito para os Git Hooks

É necessário ter o **Node.js** instalado na máquina hospedeira para que os git hooks (Husky + Commitlint) funcionem localmente. Sem o Node.js, o hook `commit-msg` falhará e o commit será rejeitado.

Após clonar o repositório, execute na raiz do projeto:

```bash
npm install

```

O script `prepare` configurará o Husky automaticamente. A partir daí, todo commit estará sujeito à validação rigorosa das mensagens.

---

## 🔮 Melhorias Futuras (Roadmap)

Pensando na escalabilidade e na experiência do usuário/desenvolvedor, os seguintes itens foram mapeados como próximos passos para a evolução do produto:

- [ ] **Edição Rápida na Tabela:** Permitir a edição direta do status (ex: de _AVAILABLE_ para _IN_USE_) diretamente pelo menu de ações das linhas (_rows_), sem precisar abrir o formulário completo.
- [ ] **Trava de Segurança na Exclusão:** Adicionar uma validação (tanto no Front quanto no Back) para impedir a exclusão de ativos cujo status seja `IN_USE` (Em Uso).
- [ ] **Otimização de Fetch no Modo Edição:** Como a listagem já devolve todos os dados do ativo, podemos passar esses dados diretamente para a tela de edição via state router, eliminando a necessidade de fazer uma nova requisição `GET /assets/{id}` (reduzindo chamadas de rede desnecessárias).
- [ ] **Paginação:** Implementar paginação no backend e na tabela do frontend para suportar o crescimento do volume de ativos na base de dados.
- [ ] **UX do Date Picker:** Dependendo da regra de negócio (se houver o cadastro de ativos muito antigos), substituir o calendário popover por um "Year/Month Picker" mais prático para a seleção rápida de anos distantes, ou habilitar a digitação nativa via máscara (DD/MM/AAAA).
- [x] **Notificações:** Melhorias com um UX
- [x] **Tabela:** Melhorias com um UX
- [x] **Filtro:** Melhorias com um UX
- [x] **Criação/Edição de Ativos:** Melhorias com um UX
- [x] **Empty State:** Exibição de ícone quando a tabela está vazia.
