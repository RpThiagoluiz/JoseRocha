import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { format, isAfter, isBefore, startOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon, Loader2, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { dateUtils } from '@/utils/dateUtils'
import type { Asset, AssetStatus, AssetRequest } from '@/api/types'
import { useCreateAsset } from '@/features/assets/hooks/useCreateAsset'
import { useUpdateAsset } from '@/features/assets/hooks/useUpdateAsset'
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
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

const assetStatusEnum = z.enum([
  'AVAILABLE',
  'IN_USE',
  'MAINTENANCE',
  'DISPOSED',
])

const assetFormSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  serialNumber: z.string().min(1, 'Número de série é obrigatório'),
  acquisitionDate: z.date({
    error: 'Data de aquisição é obrigatória',
  }),
  status: assetStatusEnum.optional(),
})

/** Converte Asset em valores iniciais do formulário */
const assetToFormValues = (asset: Asset): AssetFormValues => ({
  name: asset.name,
  serialNumber: asset.serialNumber,
  acquisitionDate: asset.acquisitionDate
    ? dateUtils.fromAPI(asset.acquisitionDate)
    : undefined as unknown as Date,
  status: asset.status,
})

export type AssetFormValues = z.infer<typeof assetFormSchema>

interface AssetFormProps {
  asset?: Asset | null
  initialData?: Asset
  defaultValues?: Partial<AssetFormValues>
  onSuccess?: () => void
}

export const AssetForm = ({
  asset,
  initialData,
  defaultValues,
  onSuccess,
}: AssetFormProps) => {
  const { create, isLoading: isCreating } = useCreateAsset()
  const { update, isLoading: isUpdating } = useUpdateAsset()
  const isLoading = isCreating || isUpdating

  // Use initialData if provided, otherwise fall back to asset prop (for backward compatibility)
  const assetData = initialData || asset
  const isEditMode = Boolean(assetData)

  const initialValues = assetData
    ? assetToFormValues(assetData)
    : {
        name: '',
        serialNumber: '',
        acquisitionDate: undefined,
        status: 'AVAILABLE' as const,
        ...defaultValues,
      }

  const form = useForm<AssetFormValues>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: initialValues,
  })

  // Reset form when initialData changes (for edit mode)
  useEffect(() => {
    if (assetData) {
      form.reset(assetToFormValues(assetData))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetData?.id])

  const isDirty = form.formState.isDirty
  const canSave = !isEditMode || isDirty

  const onSubmit = async (values: AssetFormValues) => {
    const assetRequest: AssetRequest = {
      name: values.name,
      serialNumber: values.serialNumber,
      acquisitionDate: dateUtils.toAPI(values.acquisitionDate),
      status: values.status,
    }

    if (assetData?.id) {
      await update(assetData.id, assetRequest, () => {
        onSuccess?.()
      })
    } else {
      await create(assetRequest, () => {
        onSuccess?.()
      })
    }
  }

  const inputFocusClass =
    'focus-visible:ring-primary/50 focus-visible:ring-offset-2 transition-shadow'

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="animate-slide-in-left-500 space-y-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Laptop Dell"
                  className={inputFocusClass}
                  {...field}
                />
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
                <Input
                  placeholder="Ex: SN-001"
                  className={inputFocusClass}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="acquisitionDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Aquisição</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left font-normal transition-shadow focus-visible:ring-primary/50 focus-visible:ring-offset-2',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione a data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => {
                      const d = startOfDay(date)
                      const today = startOfDay(new Date())
                      const minDate = new Date(1900, 0, 1)
                      return isAfter(d, today) || isBefore(d, minDate)
                    }}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
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
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
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
              className="w-[120px] transition-transform active:scale-[0.98]"
            >
              <Trash2 className="h-4 w-4" />
              Limpar
            </Button>
          )}
          <Button
            type="submit"
            className="w-[240px] transition-transform active:scale-[0.98]"
            disabled={!canSave || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              'Salvar'
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
