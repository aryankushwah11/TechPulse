import type { Theme } from '../hooks/useTheme'
import type { ViewMode } from '../types/opportunity'
import { BookmarkIcon, CompassIcon, PlusIcon } from './Icons'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'
import { buttonStyles } from './ui'

interface HeaderProps {
  savedCount: number
  currentView: ViewMode
  onViewChange: (view: ViewMode) => void
  onSubmitClick: () => void
  theme: Theme
  onToggleTheme: () => void
}

export function Header({
  savedCount,
  currentView,
  onViewChange,
  onSubmitClick,
  theme,
  onToggleTheme,
}: HeaderProps) {
  const navItemClass = (isActive: boolean) =>
    `relative inline-flex h-14 items-center gap-2 px-2.5 text-sm font-medium transition-colors after:absolute after:inset-x-2.5 after:bottom-0 after:h-0.5 after:rounded-full after:transition-colors ${
      isActive
        ? 'text-foreground after:bg-foreground'
        : 'text-muted-foreground after:bg-transparent hover:text-foreground'
    }`

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/85 backdrop-blur-md supports-[backdrop-filter]:bg-surface/75">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          onClick={() => onViewChange('all')}
          className="-ml-1 flex items-center rounded-md px-1 py-1"
          aria-label="TechPulse home"
        >
          <Logo />
        </button>

        <span aria-hidden="true" className="hidden h-5 w-px bg-border sm:block" />

        <nav aria-label="Main navigation" className="flex items-center">
          <button
            type="button"
            onClick={() => onViewChange('all')}
            aria-current={currentView === 'all' ? 'page' : undefined}
            className={navItemClass(currentView === 'all')}
          >
            <CompassIcon className="hidden h-4 w-4 sm:block" />
            Explore
          </button>

          <button
            type="button"
            onClick={() => onViewChange('saved')}
            aria-current={currentView === 'saved' ? 'page' : undefined}
            className={navItemClass(currentView === 'saved')}
          >
            <BookmarkIcon className="hidden h-4 w-4 sm:block" />
            Saved
            <span
              className={`min-w-5 rounded-md px-1.5 py-px text-center font-mono text-[11px] font-medium tabular-nums ${
                savedCount > 0
                  ? 'bg-accent-soft text-accent-soft-foreground'
                  : 'bg-surface-muted text-subtle-foreground'
              }`}
            >
              <span className="sr-only">(</span>
              {savedCount}
              <span className="sr-only"> saved)</span>
            </span>
          </button>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />

          <button
            type="button"
            onClick={onSubmitClick}
            className={`${buttonStyles.primary} w-9 px-0 sm:w-auto sm:px-3.5`}
          >
            <PlusIcon />
            <span className="sr-only sm:not-sr-only">Submit opportunity</span>
          </button>
        </div>
      </div>
    </header>
  )
}
