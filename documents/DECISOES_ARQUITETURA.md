# Decisões de Arquitetura — Assets Manager

Este documento registra as principais decisões técnicas e arquiteturais do projeto, em português do Brasil (PT-BR).

---

## Java 17 (LTS) e Spring Boot 3

A stack escolhida é **Java 17** com **Spring Boot 3.2.x**.

- **Java 17** é a versão LTS (Long Term Support) adotada como base pelo Spring Boot 3. O framework exige no mínimo Java 17, o que torna essa escolha alinhada ao ecossistema e às recomendações oficiais.
- **Estabilidade e suporte**: LTS garante correções de segurança e bugs por um ciclo prolongado, adequado para projetos que precisam de previsibilidade.
- **Recursos da linguagem**: Java 17 traz **Records**, **pattern matching** e **text blocks**, permitindo código mais enxuto (por exemplo, DTOs e value objects com Records) e melhor legibilidade.

Spring Boot 3, por sua vez, traz suporte nativo a Jakarta EE 9+ e integração moderna com ferramentas como Springdoc (OpenAPI 3) e Testcontainers.

---

## PostgreSQL via Docker

O uso do **PostgreSQL via Docker** é obrigatório no desenvolvimento e recomendado para consistência em outros ambientes.

- **Ambiente reproduzível**: Mesma versão do SGBD (ex.: 16-alpine) para todos os desenvolvedores e para pipelines (CI), reduzindo “funciona na minha máquina”.
- **Isolamento**: O banco roda em container, sem conflito com instalações locais de PostgreSQL.
- **Integração com testes**: Testcontainers utiliza a mesma imagem (PostgreSQL em Docker) nos testes de integração, alinhando ambiente de desenvolvimento e de teste.

A aplicação conecta ao PostgreSQL usando as configurações definidas em `application.yml` (com possibilidade de override por variáveis de ambiente), conforme descrito no README Técnico.

---

## Arquitetura em camadas

O backend segue uma **arquitetura em camadas** dentro do pacote base `com.challenge.assets`:

| Camada        | Pacote      | Responsabilidade |
|---------------|-------------|-------------------|
| **Controller**| `controller`| Recebe requisições HTTP, valida entrada, delega ao Service e devolve respostas (REST). |
| **Service**   | `service`   | Regras de negócio, orquestração e transações. Não conhece detalhes de HTTP ou persistência. |
| **Repository**| `repository`| Acesso a dados (JPA). Abstração sobre o banco PostgreSQL. |
| **Domain**    | `domain`    | Entidades JPA e modelos de domínio. Representam o que é persistido. |
| **DTO**       | `dto`       | Objetos de entrada/saída da API (request/response). Desacoplam o contrato da API das entidades. |
| **Mapper**    | `mapper`    | Conversão entre entidades e DTOs (MapStruct). Mantém a lógica de mapeamento centralizada. |
| **Exception** | `exception` | Exceções de negócio e tratamento global (ex.: `@ControllerAdvice`) para respostas padronizadas. |
| **Config**    | `config`    | Configurações da aplicação (beans, OpenAPI, CORS, etc.). |

Fluxo típico de uma requisição: **Controller** → **Service** → **Repository**; o Service usa **Mapper** para converter entre **Domain** e **DTO**. Erros são tratados na camada **Exception** e expostos de forma consistente na API.

Essa divisão facilita testes unitários (mockando Service ou Repository), testes de integração (com Testcontainers) e evolução do modelo de domínio sem acoplar à API.
