# Padrões da API — CRUD de Assets

Este documento descreve os **endpoints obrigatórios** do CRUD de Assets, em português do Brasil (PT-BR), com tom profissional.

---

## Base URL

Em ambiente local, a base da API é:

```
http://localhost:8080
```

A documentação interativa (Swagger UI) está disponível em:

```
http://localhost:8080/swagger-ui.html
```

---

## Endpoints obrigatórios

### 1. Listar Assets — `GET /assets`

Retorna a lista de assets (com suporte a paginação e ordenação, quando implementado).

| Aspecto    | Descrição |
|-----------|-----------|
| **Método**| `GET`     |
| **Path**  | `/assets` |
| **Resposta** | `200 OK` — corpo com lista de assets (array). |
| **Exemplo** | `GET /assets` |

---

### 2. Criar Asset — `POST /assets`

Cria um novo asset. O corpo da requisição deve conter os dados obrigatórios do asset (definidos no DTO de criação).

| Aspecto    | Descrição |
|-----------|-----------|
| **Método**| `POST`    |
| **Path**  | `/assets` |
| **Corpo** | JSON com os campos do asset (conforme contrato do DTO). |
| **Resposta** | `201 Created` — corpo com o asset criado (incluindo identificador). |
| **Erros** | `400 Bad Request` — dados inválidos ou falha de validação. |

---

### 3. Atualizar Asset — `PUT /assets/{id}`

Atualiza um asset existente identificado por `id`. O corpo deve conter os dados completos do asset (atualização total).

| Aspecto    | Descrição |
|-----------|-----------|
| **Método**| `PUT`     |
| **Path**  | `/assets/{id}` |
| **Parâmetro** | `id` — identificador único do asset (path variable). |
| **Corpo** | JSON com os campos do asset a serem atualizados. |
| **Resposta** | `200 OK` — corpo com o asset atualizado. |
| **Erros** | `400 Bad Request` — dados inválidos. `404 Not Found` — asset não encontrado para o `id` informado. |

---

### 4. Excluir Asset — `DELETE /assets/{id}`

Remove um asset existente identificado por `id`.

| Aspecto    | Descrição |
|-----------|-----------|
| **Método**| `DELETE`  |
| **Path**  | `/assets/{id}` |
| **Parâmetro** | `id` — identificador único do asset (path variable). |
| **Resposta** | `204 No Content` — exclusão realizada com sucesso (corpo vazio). |
| **Erros** | `404 Not Found` — asset não encontrado para o `id` informado. |

---

## Resumo

| Ação      | Método | Endpoint        | Resposta de sucesso |
|-----------|--------|-----------------|----------------------|
| Listar    | GET    | `/assets`       | 200 OK               |
| Criar     | POST   | `/assets`       | 201 Created          |
| Atualizar | PUT    | `/assets/{id}`  | 200 OK               |
| Excluir   | DELETE | `/assets/{id}`  | 204 No Content       |

Os contratos detalhados (campos dos DTOs, códigos de erro e exemplos) devem ser mantidos alinhados à implementação e à documentação gerada pelo Springdoc (Swagger) em `/swagger-ui.html` e `/v3/api-docs`.
