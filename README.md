# Jose Rocha — Assets Manager Monorepo

Este repositório é um monorepo que criei para estruturar o Frontend (React/Vite), o Backend (API REST Spring Boot) e a governança de código centralizada na raiz.

## 🚀 Como Executar a Aplicação (Docker)

Deixei a aplicação totalmente conteinerizada para facilitar os testes. Para rodar o Banco de Dados, o Backend e o Frontend simultaneamente, basta executar o comando abaixo na raiz do projeto:

```bash
docker-compose up -d --build

```

### Acessos e Portas

* **Frontend (UI):** [http://localhost:5173](https://www.google.com/search?q=http://localhost:5173)
* **Backend (API):** `http://localhost:8080`
* **Documentação da API (Swagger):** [http://localhost:8080/swagger-ui/index.html](https://www.google.com/search?q=http://localhost:8080/swagger-ui/index.html)

> **⚠️ Nota sobre o Login:** Mockei (simulei) a funcionalidade de autenticação no Frontend para agilizar a avaliação deste desafio. **Qualquer e-mail em formato válido e qualquer senha** permitirão o acesso ao Dashboard.

---

## 🏗️ Estrutura do Projeto

* **`frontend/`** — Aplicação SPA em React que desenvolvi utilizando Vite e Shadcn UI.
* **`backend/`** — API REST construída em Java com Spring Boot.
* **`documents/`** — Documentação técnica detalhada e registro das minhas decisões de arquitetura (ADRs).
* **`.husky/`** e **`.cursor/rules/`** — Hooks do Git (validação de commit) e regras de inteligência artificial (MDC) que configurei.

*(A documentação detalhada sobre como executo o backend de forma isolada encontra-se em `documents/README_TECNICO.md`)*.

---

## 🧠 Minhas Decisões de Arquitetura e DX (Developer Experience)

* **Vite ao invés de Create React App (CRA):** Optei pelo Vite devido ao seu tempo de build extremamente rápido e HMR (Hot Module Replacement) instantâneo. Com isso, eliminei a necessidade de usar bibliotecas de terceiros como o `craco` para sobrescrever as configurações complexas do Webpack que o CRA esconde.
* **Cursor Rules (`.mdc`):** Configurei o projeto utilizando arquivos `.mdc` de governança para o editor Cursor (AI). Isso otimizou meus processos mecânicos de desenvolvimento, garantindo que o assistente de IA seguisse estritamente os padrões de arquitetura, testes e integração que defini para o projeto, escalando a minha produtividade com segurança.

---

## 🛠️ Governança e Commits

Para garantir um histórico limpo, tornei **obrigatório** o uso do padrão **Conventional Commits**. As mensagens de commit são validadas automaticamente por um hook (Commitlint) que implementei.

**Exemplos válidos:**

* `feat: adiciona endpoint GET /assets`
* `fix: corrige validação do DTO de criação`
* `docs: atualiza README técnico`
* `chore: atualiza dependência do Spring Boot`

*(Tipos comuns suportados: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `build`)*.

### Pré-requisito para os Git Hooks

É necessário ter o **Node.js** instalado na máquina hospedeira para que os git hooks (Husky + Commitlint) funcionem localmente. Sem o Node.js, o hook `commit-msg` falhará e o commit será rejeitado.

Após clonar o repositório, execute na raiz do projeto:

```bash
npm install

```

O script `prepare` configurará o Husky automaticamente. A partir daí, todo commit estará sujeito à validação rigorosa das mensagens.

---

## 🔮 Melhorias Futuras (Roadmap)

Pensando na escalabilidade e na experiência do usuário/desenvolvedor, mapeei os seguintes itens como próximos passos para a evolução deste produto:

* [ ] **Edição Rápida na Tabela:** Permitir a edição direta do status (ex: de *AVAILABLE* para *IN_USE*) diretamente pelo menu de ações das linhas (*rows*), sem precisar abrir o formulário completo.
* [ ] **Trava de Segurança na Exclusão:** Adicionar uma validação (tanto no Front quanto no Back) para impedir a exclusão de ativos cujo status seja `IN_USE` (Em Uso).
* [ ] **Otimização de Fetch no Modo Edição:** Como a listagem já devolve todos os dados do ativo, planejo passar esses dados diretamente para a tela de edição via state router, eliminando a necessidade de fazer uma nova requisição `GET /assets/{id}` (reduzindo chamadas de rede desnecessárias).
* [ ] **Paginação:** Implementar paginação no backend e na tabela do frontend para suportar o crescimento do volume de ativos na base de dados.
* [ ] **UX do Date Picker:** Dependendo da regra de negócio (se houver o cadastro de ativos muito antigos), substituir o calendário popover por um "Year/Month Picker" mais prático para a seleção rápida de anos distantes, ou habilitar a digitação nativa via máscara (DD/MM/AAAA).
* [x] **Notificações:** Melhorias de UX aplicadas com wrapper padronizado e cores semânticas.
* [x] **Tabela:** Melhorias de UX com hover states e transições suaves.
* [x] **Filtro:** Melhorias de UX com layout em Card (Glassmorphism) e animações.
* [x] **Criação/Edição de Ativos:** Melhorias de UX no formulário e feedbacks de loading.
* [x] **Empty State:** Exibição amigável de ícone e mensagem quando a tabela está vazia.
