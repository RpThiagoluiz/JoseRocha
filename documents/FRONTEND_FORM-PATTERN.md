Padrão de Formulários e Validação
Este documento define a arquitetura, bibliotecas e padrões para construção de formulários no backoffice. O objetivo é garantir consistência de UX, tipagem forte e manutenção simplificada.

🛠 Tech Stack
React Hook Form (v7+): Gerenciamento de estado e submissão.

Zod: Schemas de validação e inferência de tipos (TypeScript).

@hookform/resolvers: Integração entre RHF e Zod.

Shadcn UI: Componentes base de UI (Form, FormControl, FormField, Input, Button).

Lucide React: Ícones para feedback visual.

📂 Arquitetura de Pastas
A estrutura separa componentes visuais "burros" (UI) de componentes de formulário "inteligentes" (Forms) e lógica de validação.

Bash
src/
├── components/
│ ├── ui/ # Shadcn Base (Não editar lógica aqui)
│ │ ├── button.tsx
│ │ ├── input.tsx
│ │ └── form.tsx # Wrapper do RHF provider
│ │
│ └── forms/ # Componentes "Smart" (Wrappers com lógica)
│ ├── InputField/ # Encapsula Label, Input, Erro e Máscara
│ ├── SelectField/
│ ├── DatePickerField/
│ └── PasswordField/ # Input com toggle de visibilidade
│
├── utils/
│ ├── validators/
│ │ ├── schemas/ # Schemas Zod por domínio
│ │ │ ├── auth.schema.ts
│ │ │ └── user.schema.ts
│ │ └── masks.ts # Funções de máscara (CPF, Phone)
│ │
│ └── helpers/
│ └── formatters.ts # Funções de 'unmask' para envio à API
📐 Princípios de Implementação

1. Componentes "Smart Wrappers"
   Não utilize o <Input /> do components/ui diretamente nas páginas. Utilize os componentes de components/forms/.

Por que?
Eles padronizam a exibição de Label, Description, ErrorMessage e integram automaticamente com o control do React Hook Form.

TypeScript
// ✅ Correto:
<InputField 
  control={form.control} 
  name="email" 
  label="E-mail" 
/>

// ❌ Evitar (Verbosidade desnecessária na página):
<FormField
control={form.control}
name="email"
render={({ field }) => (
<FormItem>
<FormLabel>Email</FormLabel>
<FormControl><Input {...field} /></FormControl>
</FormItem>
)}
/> 2. Edição de Dados (Reactive Values)
Para formulários de edição, NÃO use useEffect para resetar o formulário.
Utilize a propriedade values do useForm, que reage automaticamente a mudanças nas props.

TypeScript
// ✅ Padrão Recomendado (RHF v7):
const form = useForm({
resolver: zodResolver(userSchema),
defaultValues: defaultEmptyValues,
values: useMemo(() => {
// Formata dados vindos da API antes de jogar no form
if (user) return { ...user, phone: formatPhone(user.phone) }
}, [user])
}); 3. Formulários em Etapas (Wizards)
Para fluxos como "Esqueci minha Senha" ou "Onboarding":

Semântica > Numérica: Nunca use números (step === 1) para controlar o fluxo. Use Strings Semânticas.

Switch Case: Use um switch para renderizar o conteúdo.

TypeScript
// Definição do Estado
type WizardStep = 'EmailInput' | 'OTPVerification' | 'NewPassword';

// Renderização
switch (currentStep) {
case 'EmailInput': return <EmailStep />;
case 'OTPVerification': return <OTPStep />;
// ...
}

````

### 3.1 Padrão do Footer (Voltar + Submit)

Em fluxos que permitem **voltar** ao passo anterior (wizard, MFA, esqueci senha), o rodapé do card deve seguir o mesmo estilo em toda a aplicação:

| Elemento | Regra |
|--------|--------|
| **Container** | Uma única linha: `flex w-full gap-3`. |
| **Botão Voltar** | `variant="outline"`, ícone `ArrowLeft` (lucide-react) à esquerda, `className="flex items-center gap-2"`. Sempre à esquerda. |
| **Botão principal** | Submit/Continuar/Verificar com `className="flex-1"` para ocupar o espaço restante. |

**Exemplo:**

```tsx
<CardFooter>
  <div className="flex w-full gap-3">
    <Button
      type="button"
      variant="outline"
      onClick={handleBack}
      disabled={isLoading}
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Voltar
    </Button>
    <Button type="submit" disabled={isLoading} className="flex-1">
      {isLoading ? 'Enviando...' : 'Continuar'}
    </Button>
  </div>
</CardFooter>
````

**Referências na base:** `src/components/features/Auth/MfaForm/MfaForm.tsx`, `src/pages/Auth/ForgotPasswordPage/ForgotPasswordPage.tsx`.

---

## 📝 Guia de Criação (Passo a Passo)

Passo 1: Definir o Schema (Zod)
Local: src/utils/validators/schemas/user.schema.ts

TypeScript
import { z } from "zod";

export const userSchema = z.object({
name: z.string().min(3, "Nome muito curto"),
email: z.string().email("Email inválido"),
role: z.enum(["admin", "user"]),
});

export type UserFormData = z.infer<typeof userSchema>;
Passo 2: Criar o Formulário na Página
Local: src/pages/Dashboard/components/Users/UserRegisterForm.tsx

TypeScript
export const UserRegisterForm = ({ initialData, onSubmit }: Props) => {
const form = useForm<UserFormData>({
resolver: zodResolver(userSchema),
values: initialData // Lógica de auto-update
});

const handleSubmit = (data: UserFormData) => {
// Desformatar dados se necessário
const payload = { ...data, cpf: unmask(data.cpf) };
onSubmit(payload);
};

return (

<Form {...form}>
<form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
<InputField 
          control={form.control} 
          name="name" 
          label="Nome Completo" 
        />

        {/* Botão desabilitado se não houver mudanças (isDirty) */}
        <Button disabled={!form.formState.isDirty}>
          Salvar
        </Button>
      </form>
    </Form>

);
};
🎭 Máscaras e Formatação
Input Masking
As máscaras devem ser aplicadas no evento onChange dentro do InputField ou via prop mask.

Defina a função em src/utils/validators/masks.ts.

Passe a prop para o componente: <InputField mask="phone" ... />.

Unmasking (Envio para API)
A API espera dados limpos ("raw"). Nunca envie (11) 99999-9999.

Utilize helpers em src/utils/helpers/formatters.ts.

Aplique o unformat dentro da função onSubmit, antes de chamar o Service.

TypeScript
const onSubmit = async (data) => {
await api.createUser({
...data,
phoneNumber: data.phoneNumber.replace(/\D/g, '') // Remove tudo que não é dígito
});
}
✅ Checklist de Qualidade
Antes de considerar o formulário pronto:

[ ] O botão de submit mostra estado de loading?

[ ] O formulário de edição usa a prop values (sem useEffect manual)?

[ ] As mensagens de erro do Zod estão em português amigável?

[ ] Dados formatados (CPF, Telefone) são limpos antes de enviar para a API?

[ ] Se for um Wizard, os steps são definidos por strings ('StepName') e não números?
