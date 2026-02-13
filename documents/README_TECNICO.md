# README Técnico — Assets Manager

Este documento descreve como executar o projeto **assets-manager** em ambiente local. O uso do **Docker** é **obrigatório** para garantir consistência de ambiente (banco de dados e, quando aplicável, demais serviços).

---

## Pré-requisitos

- **Docker** — Obrigatório. Utilizado para subir o PostgreSQL e manter o ambiente alinhado ao que será usado em outros ambientes.
- **Java 17 (LTS)** — Necessário para desenvolvimento local (compilação, testes e execução da aplicação via Maven ou IDE).

Certifique-se de que o Docker está em execução antes de rodar a aplicação ou os testes.

---

## Como rodar o projeto

### 1. Subir o PostgreSQL com Docker

Na raiz do monorepo (ou no diretório onde estiver o `docker-compose`, se houver), execute:

```bash
docker run -d --name assets-postgres \
  -e POSTGRES_DB=assets_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 \
  postgres:16-alpine
```

Ou, se existir um `docker-compose.yml` na raiz:

```bash
docker-compose up -d
```

### 2. Executar a aplicação

Entre no diretório do backend e inicie a aplicação com Maven:

```bash
cd backend
mvn spring-boot:run
```

A API ficará disponível em `http://localhost:8080`. A documentação Swagger UI estará em `http://localhost:8080/swagger-ui.html`.

### 3. Executar os testes

Com o Docker em execução (para testes que usam Testcontainers):

```bash
cd backend
mvn test
```

---

## Variáveis de ambiente (opcional)

É possível sobrescrever a configuração padrão do `application.yml`:

| Variável           | Descrição              | Padrão    |
|--------------------|------------------------|-----------|
| `POSTGRES_DB`      | Nome do banco          | `assets_db` |
| `POSTGRES_USER`    | Usuário PostgreSQL     | `postgres`  |
| `POSTGRES_PASSWORD`| Senha PostgreSQL       | `postgres`  |
| `SERVER_PORT`      | Porta da aplicação     | `8080`      |

---

## Resumo

- **Docker** é obrigatório para o banco de dados (e para testes com Testcontainers).
- **Java 17** é exigido para build e execução em desenvolvimento.
- Suba o PostgreSQL via Docker, depois execute `mvn spring-boot:run` no diretório `backend`.
