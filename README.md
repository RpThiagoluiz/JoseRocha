# Jose Rocha — Monorepo

Este repositório é um monorepo que contém o backend (Assets Manager) e a governança de código na raiz.

## Commits

Para commitar alterações, é **obrigatório** seguir o padrão **Conventional Commits**. As mensagens de commit são validadas automaticamente por um hook (Commitlint).

Exemplos válidos:

- `feat: adiciona endpoint GET /assets`
- `fix: corrige validação do DTO de criação`
- `docs: atualiza README técnico`
- `chore: atualiza dependência do Spring Boot`

Tipos comuns: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`, `build`.

## Pré-requisito para os hooks

É necessário ter **Node.js** instalado na máquina para que os git hooks (Husky + Commitlint) funcionem. Sem Node.js, o hook `commit-msg` falhará e o commit será rejeitado.

Após clonar o repositório, na raiz do projeto execute:

```bash
npm install
```

O script `prepare` configurará o Husky. A partir daí, todo commit estará sujeito à validação das mensagens no padrão Conventional Commits.

## Estrutura

- **backend/** — API REST Spring Boot (Assets Manager)
- **documents/** — Documentação técnica e decisões de arquitetura
- **.husky/** — Hooks do Git (validação de commit)

Documentação detalhada de como rodar o backend está em `documents/README_TECNICO.md`.
