import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const FILTER_TYPE_OPTIONS = [
  { value: 'name', label: 'Nome' },
  { value: 'serialNumber', label: 'Nº de Série' },
  { value: 'status', label: 'Status' },
] as const

const STATUS_OPTIONS = [
  { value: 'AVAILABLE', label: 'Disponível' },
  { value: 'IN_USE', label: 'Em uso' },
  { value: 'MAINTENANCE', label: 'Manutenção' },
  { value: 'DISPOSED', label: 'Descartado' },
] as const

type FilterType = (typeof FILTER_TYPE_OPTIONS)[number]['value']

interface AssetFilterProps {
  onFilter: (filters: Record<string, string>) => void
}

export const AssetFilter = ({ onFilter }: AssetFilterProps) => {
  const [filterType, setFilterType] = useState<FilterType>('name')
  const [filterValue, setFilterValue] = useState('')

  useEffect(() => {
    setFilterValue('')
  }, [filterType])

  const handleSearch = () => {
    const trimmed = filterValue.trim()
    if (trimmed) {
      onFilter({ [filterType]: trimmed })
    }
  }

  const handleClear = () => {
    setFilterType('name')
    setFilterValue('')
    onFilter({})
  }

  const getInputPlaceholder = () => {
    if (filterType === 'name') return 'Digite o nome do ativo'
    if (filterType === 'serialNumber') return 'Digite o número de série'
    return ''
  }

  return (
    <Card className="mb-8 animate-slide-in-top-500 rounded-xl border bg-card p-5 shadow-sm">
      <CardContent className="pt-0">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Tipo de filtro</label>
            <Select
              value={filterType}
              onValueChange={(v) => setFilterType(v as FilterType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {FILTER_TYPE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 space-y-2">
            <label className="text-sm font-medium">Valor</label>
            {filterType === 'status' ? (
              <Select value={filterValue} onValueChange={setFilterValue}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                placeholder={getInputPlaceholder()}
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleSearch}
              className="transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Buscar
            </Button>
            <Button
              onClick={handleClear}
              variant="outline"
              className="transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Limpar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
