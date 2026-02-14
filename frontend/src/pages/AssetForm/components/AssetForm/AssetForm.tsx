import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Trash2 } from 'lucide-react'
import type { Asset, AssetStatus } from '@/api/types'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const assetStatusEnum = z.enum([
  'AVAILABLE',
  'IN_USE',
  'MAINTENANCE',
  'DISPOSED',
])

const BR_DATE_REGEX = /^\d{2}\/\d{2}\/\d{4}$/

const assetFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  serialNumber: z.string().min(1, 'Número de série é obrigatório'),
  acquisitionDate: z
    .string()
    .min(1, 'Data de aquisição é obrigatória')
    .regex(BR_DATE_REGEX, 'Data deve estar no formato dd/mm/aaaa')
    .refine(
      (val) => {
        const [d, m, y] = val.split('/').map(Number)
        const date = new Date(y, m - 1, d)
        return (
          date.getDate() === d &&
          date.getMonth() === m - 1 &&
          date.getFullYear() === y
        )
      },
      { message: 'Data inválida' }
    ),
  status: assetStatusEnum.optional(),
})

/** Converte ISO para dd/mm/aaaa */
const isoToBrDate = (iso: string): string => {
  const d = new Date(iso)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

/** Formata input para dd/mm/aaaa enquanto digita */
const formatBrDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

/** Converte Asset em valores iniciais do formulário */
const assetToFormValues = (asset: Asset): AssetFormValues => ({
  name: asset.name,
  serialNumber: asset.serialNumber,
  acquisitionDate: isoToBrDate(asset.acquisitionDate),
  status: asset.status,
})

export type AssetFormValues = z.infer<typeof assetFormSchema>

interface AssetFormProps {
  asset?: Asset | null
  defaultValues?: Partial<AssetFormValues>
  onSuccess?: () => void
}

export const AssetForm = ({
  asset,
  defaultValues,
  onSuccess,
}: AssetFormProps) => {
  const isEditMode = Boolean(asset)
  const initialValues = asset
    ? assetToFormValues(asset)
    : {
        name: '',
        serialNumber: '',
        acquisitionDate: '',
        status: 'AVAILABLE' as const,
        ...defaultValues,
      }

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: initialValues,
  })

  const isDirty = form.formState.isDirty
  const canSave = !isEditMode || isDirty

  const onSubmit = (values: AssetFormValues) => {
    console.log('[AssetForm] Dados do formulário:', values)
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Laptop Dell" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Série</FormLabel>
              <FormControl>
                <Input placeholder="Ex: SN-001" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acquisitionDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data de Aquisição</FormLabel>
              <FormControl>
                <Input
                  placeholder="dd/mm/aaaa"
                  maxLength={10}
                  {...field}
                  onChange={(e) =>
                    field.onChange(formatBrDate(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={field.value ?? ''}
                  onChange={(e) =>
                    field.onChange(e.target.value as AssetStatus | '')
                  }
                  onBlur={field.onBlur}
                >
                  <option value="AVAILABLE">Disponível</option>
                  <option value="IN_USE">Em uso</option>
                  <option value="MAINTENANCE">Manutenção</option>
                  <option value="DISPOSED">Descartado</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center gap-4">
          {!isEditMode && (
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              className="w-[120px]"
            >
              <Trash2 className="h-4 w-4" />
              Limpar
            </Button>
          )}
          <Button type="submit" className="w-[240px]" disabled={!canSave}>
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
