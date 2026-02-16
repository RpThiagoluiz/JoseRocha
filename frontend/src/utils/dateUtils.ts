/**
 * Utilitário centralizado para formatação e conversão de datas.
 * Padroniza o formato enviado à API (Java) e a exibição em pt-BR no frontend.
 */
export const dateUtils = {
  /**
   * Converte o Date do calendário para o formato ISO completo que o Java espera.
   */
  toAPI(date: Date): string {
    return date.toISOString()
  },

  /**
   * Converte a string do backend para Date local (uso no formulário em modo edição).
   */
  fromAPI(isoString: string): Date {
    return new Date(isoString)
  },

  /**
   * Formata a string do backend em pt-BR para exibição (ex.: tabela).
   */
  formatDisplay(isoString: string): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(isoString))
  },
}
