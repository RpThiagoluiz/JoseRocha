# Diretrizes de Testes

Este documento descreve como os testes devem ser escritos neste projeto e por que eles precisam ser **relevantes ao produto**.

---

## Por que os testes devem ser relevantes ao produto

Testes não existem só para “deixar o build verde”. Eles devem proteger **resultados reais de usuário e de negócio**:

- **Fluxos de usuário**: O usuário consegue fazer login? Enviar um formulário? Ver o feedback correto?
- **Proteção contra regressões**: Mudanças que quebram o comportamento principal são detectadas antes do merge.
- **Documentação viva**: Os testes descrevem como a aplicação deve se comportar do ponto de vista do usuário.

Um teste que só verifica detalhes de implementação (ex.: estado interno ou funções privadas) sem ligar a um resultado visível agrega pouco e vira custo de manutenção quando refatoramos.

---

## Princípios

### 1. Teste comportamento, não implementação

- Prefira testar **o que o usuário vê e faz**: rótulos, botões, mensagens, navegação, feedback de validação.
- Evite depender de estado interno, classes CSS usadas só para estilo ou helpers privados, a menos que sejam a única forma de garantir um comportamento relevante.
- Use **queries que reflitam a interação do usuário**: `getByRole`, `getByLabelText`, `getByText` com o conteúdo que o usuário realmente vê.

### 2. Um componente/feature, um arquivo de teste

- Coloque os testes junto ao código que eles cobrem: `ComponentName.test.tsx` (ou `ComponentName.spec.tsx`) na mesma pasta do `ComponentName.tsx`.
- Para páginas, use `PageName.test.tsx` (ou dentro de `PageName/`) conforme a [arquitetura](./README.md) do projeto.

### 3. Descrições dos testes em inglês no código

- No **código** dos testes, use **inglês** nas descrições e na estrutura:
  - `describe('LoginForm', () => { ... })`
  - `it('shows error when email is invalid', () => { ... })`
- As asserções podem continuar usando o texto da UI no idioma da aplicação (ex.: português); o importante é que a **intenção do teste** fique clara em inglês no código.

### 4. Estrutura: describe → it

- **describe**: agrupe por feature ou comportamento (ex.: “Initial render”, “Field validation”, “Form submit”).
- **it**: um cenário concreto por teste (ex.: “shows error when email is empty and field loses focus”).
- Mantenha cada teste focado para que uma falha aponte para um único tipo de problema.

### 5. Checklist de relevância

Antes de adicionar ou manter um teste, pergunte:

- Ele verifica algo com que o **usuário** ou o **produto** se importam?
- Se esse teste falhasse, consideraríamos um **bug real** que vale corrigir?
- Ele ainda faz sentido após um **refactor** que mantém o comportamento?

Se a resposta for “não” nas duas primeiras, ou “não” na terceira porque o teste está atrelado à implementação, simplifique ou remova o teste.

---

## Como escrever um teste

### 1. Arrange – Act – Assert

- **Arrange**: Renderize o componente (e forneça props/mocks necessários).
- **Act**: Simule ações do usuário (clique, digitação, blur) ou eventos que disparam o comportamento.
- **Assert**: Verifique o resultado (texto visível, estado desabilitado, dados enviados, etc.).

### 2. Prefira queries orientadas ao usuário

- `getByRole('button', { name: /submit/i })` — bom: reflete o que o usuário vê e faz.
- `getByLabelText('Email')` — bom: corresponde aos rótulos que o usuário lê.
- `container.querySelector('.css-class')` — evite para comportamento; use só quando necessário e documente o motivo.

### 3. Comportamento assíncrono

- Use `waitFor` (ou `findBy*`) para atualizações de estado, mocks de API ou mensagens de validação que aparecem após uma ação.
- Evite asserções em detalhes de implementação; assira o **resultado observável** (ex.: texto da mensagem, estado desabilitado).

### 4. Mocks

- Mocke dependências externas (API, roteador) para o teste ser rápido e determinístico.
- Mantenha mocks próximos ao arquivo de teste ou em um `__tests__/mocks` compartilhado (ou similar), conforme a estrutura do projeto.
- Garanta que as respostas mockadas reflitam casos de **sucesso/erro realistas** que importam para o produto.

---

## O que testar (exemplos)

- **Formulários**: Campos obrigatórios, mensagens de validação, envio com dados válidos/inválidos, estado de loading, feedback de sucesso/erro.
- **Navegação / links**: Presença de links e `href` (ou rota) corretos para os fluxos principais.
- **Acessibilidade**: `aria-label`, `aria-invalid`, `aria-live` onde impactam comportamento ou leitores de tela.
- **Caminhos críticos do usuário**: Login, ações principais e qualquer fluxo que o time de produto considere essencial.

---

## O que evitar

- Testes que só verificam “o componente renderiza” sem nenhum comportamento adicional.
- Testes que dependem de detalhes de estilo (ex.: nomes de classes específicas), a menos que sejam a única forma de garantir um comportamento acessível ou funcional.
- `console.log` ou código de debug temporário deixado nos testes.
- Testes que duplicam a implementação (ex.: testar que uma função foi chamada com X em vez de testar o **resultado visível ao usuário** dessa chamada).

---

## Referências

- [Testing Library – Guiding Principles](https://testing-library.com/docs/guiding-principles/)
- Arquitetura do projeto: [documentation/README.md](./README.md)
- Padrão de formulários e onde os testes ficam: [FORM-PATTERN.md](./FORM-PATTERN.md)
