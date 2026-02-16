import { toast } from 'sonner'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface NotificationProps {
  type: NotificationType
  message: string
}

/**
 * Displays a toast notification using the Sonner library with semantic types.
 * Use this wrapper instead of calling toast directly for consistent styling and future extensibility.
 *
 * @param props - Notification type and message
 */
export const showNotification = ({ type, message }: NotificationProps) => {
  toast[type](message)
}
