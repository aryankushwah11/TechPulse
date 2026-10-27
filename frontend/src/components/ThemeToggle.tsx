import type { Theme } from '../hooks/useTheme'
import { MoonIcon, SunIcon } from './Icons'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark theme"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      onClick={onToggle}
      className="relative inline-flex h-8 w-[60px] shrink-0 items-center rounded-full border border-border bg-surface-muted p-0.5 transition-colors hover:border-border-strong"
    >
      <span
        aria-hidden="true"
        className={`absolute top-0.5 left-0.5 h-[26px] w-[26px] rounded-full border border-border bg-surface shadow-card transition-transform duration-200 ease-out ${
          isDark ? 'translate-x-7' : 'translate-x-0'
        }`}
      />
      <span
        aria-hidden="true"
        className={`relative z-10 flex h-[26px] w-[26px] items-center justify-center transition-colors ${
          isDark ? 'text-subtle-foreground' : 'text-foreground'
        }`}
      >
        <SunIcon className="h-3.5 w-3.5" />
      </span>
      <span
        aria-hidden="true"
        className={`relative z-10 ml-0.5 flex h-[26px] w-[26px] items-center justify-center transition-colors ${
          isDark ? 'text-foreground' : 'text-subtle-foreground'
        }`}
      >
        <MoonIcon className="h-3.5 w-3.5" />
      </span>
    </button>
  )
}
