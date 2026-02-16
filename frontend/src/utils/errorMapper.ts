import axios from 'axios'

/**
 * Error code mapping for user-friendly messages in PT-BR.
 * Maps backend error codes to friendly messages.
 */
const ERROR_MAP: Record<string, string> = {
  'GEN-001': 'Ocorreu um erro interno no servidor. Tente novamente mais tarde.',
  'GEN-002': 'Verifique os dados preenchidos. Há erros de validação.',
  'AST-001': 'O ativo solicitado não foi encontrado no sistema.',
  'AST-002': 'Este número de série já está cadastrado em outro ativo.',
  'DEL-001': 'O ativo que você tentou excluir já não existe.',
  DEFAULT: 'Ocorreu um erro inesperado. Verifique sua conexão.',
}

/**
 * Extracts error message from an unknown error object.
 * Checks if error is an Axios error, extracts the code from response,
 * and returns the corresponding friendly message from ERROR_MAP.
 *
 * @param error - Unknown error object (can be Axios error, Error, or any)
 * @returns User-friendly error message in PT-BR
 */
export const getErrorMessage = (error: unknown): string => {
  // Check if it's an Axios error
  if (axios.isAxiosError(error)) {
    const code = error.response?.data?.code

    if (code && typeof code === 'string' && ERROR_MAP[code]) {
      return ERROR_MAP[code]
    }
  }

  // Fallback to default message
  return ERROR_MAP.DEFAULT
}
