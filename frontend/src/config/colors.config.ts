/**
 * Base HSL theme variables (Greyscale/Monochromatic).
 * Values are used in :root (index.css) and referenced by Tailwind.
 */
export const colors = {
  primary: '222 47% 11%',
  primaryForeground: '210 40% 98%',
  muted: '210 40% 96%',
  mutedForeground: '215 16% 47%',
  background: '0 0% 100%',
  foreground: '222 47% 11%',
  destructive: '0 84.2% 60.2%',
  destructiveForeground: '210 40% 98%',
  border: '214 32% 91%',
  input: '214 32% 91%',
  ring: '222 47% 11%',
} as const

export type ColorKey = keyof typeof colors
