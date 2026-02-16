# README Técnico — Assets Manager

Este documento descreve como configurar, executar e testar o projeto **assets-manager** em ambiente local de desenvolvimento. A arquitetura é um monorepo Fullstack. O uso do **Docker** é **obrigatório** para garantir a consistência do ambiente de banco de dados e a conteinerização da aplicação.

---

## 🛠️ Pré-requisitos

Para o desenvolvimento local, certifique-se de ter as seguintes ferramentas instaladas:

- **Docker & Docker Compose** — Obrigatório para subir a stack completa ou apenas o PostgreSQL.
- **Java 17 (LTS)** — Necessário para compilação, testes e execução do Backend via Maven/IDE.
- **Node.js (v18+ ou v20+)** — Necessário para rodar o servidor de desenvolvimento do Frontend (Vite) e os Git Hooks.

---

## 🚀 Execução Completa (Orquestração via Docker)

Se o objetivo é apenas rodar a aplicação para testes e validações (sem necessidade de _Hot Reload_ no código), utilize a orquestração completa. Na raiz do monorepo, execute:

```bash
docker-compose up -d --build

```

Isso subirá 3 containers configurados na mesma rede:

1. `postgres` (Banco de Dados)
2. `backend` (Spring Boot API na porta `8080`)
3. `frontend` (React/Vite servido via Nginx na porta `5173`)

---

## 💻 Desenvolvimento Local (Modo Dev)

Para atuar no código com _Hot Reload_, você precisará subir a infraestrutura base e rodar as aplicações localmente.

### 1. Subir a Infraestrutura (PostgreSQL)

Na raiz do projeto, suba apenas o serviço do banco de dados utilizando o `docker-compose`:

```bash
docker-compose up -d postgres

```

### 2. Executar o Backend (Spring Boot)

Abra um terminal, entre no diretório do backend e inicie a API:

```bash
cd backend
mvn spring-boot:run

```

- **API Mapeada em:** `http://localhost:8080`
- **Swagger UI:** `http://localhost:8080/swagger-ui/index.html`

### 3. Executar o Frontend (React/Vite)

Abra um novo terminal, entre no diretório do frontend e inicie o servidor de desenvolvimento:

```bash
cd frontend
npm install
npm run dev

```

- **Interface Mapeada em:** `http://localhost:5173`

---

## 🧪 Como Executar os Testes

O projeto conta com testes automatizados em ambas as camadas.

**Testes do Backend (JUnit / Testcontainers):**
_Nota: O Docker precisa estar em execução para que o Testcontainers consiga provisionar o banco de testes efêmero._

```bash
cd backend
mvn test

```

**Testes do Frontend (Vitest / Testing Library):**
Os testes validam os custom hooks, serviços de API (com mocks do Axios) e as regras de negócio de integração.

```bash
cd frontend
npm run test
# Ou para rodar apenas uma vez no terminal:
npm run test:run

```

---

## ⚙️ Variáveis de Ambiente

As aplicações foram desenhadas para rodar de forma conteinerizada (via `docker-compose`), mas caso precise sobrescrever as configurações localmente, utilize as variáveis abaixo.

### Backend (`backend/src/main/resources/application.yml`)

| Variável            | Descrição          | Padrão (Local) |
| ------------------- | ------------------ | -------------- |
| `POSTGRES_DB`       | Nome do banco      | `assets_db`    |
| `POSTGRES_USER`     | Usuário PostgreSQL | `admin`        |
| `POSTGRES_PASSWORD` | Senha PostgreSQL   | `admin`        |
| `SERVER_PORT`       | Porta da aplicação | `8080`         |

### Frontend (`frontend/.env`)

Para rodar localmente sem o Docker, você pode criar um arquivo `.env` na pasta `frontend` com:
| Variável | Descrição | Padrão (Local) |
|-------------------------|-------------------------------------------|--------------------------|
| `VITE_BASE_URL` | URL base para chamadas da API do Backend | `http://localhost:8080` |
| `VITE_AUTH_STORAGE_KEY` | Chave de persistência de sessão (Storage) | `app_auth_user` |

---

### Resumo do Fluxo de Trabalho:

1. Docker obrigatoriamente ligado.
2. `npm install` na raiz para configurar o **Husky** (validador de commits).
3. `docker-compose up -d postgres` para ter o banco.
4. Rode as aplicações nas suas respectivas pastas para começar a codar.
