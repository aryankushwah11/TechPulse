import type { Theme } from '../hooks/useTheme'
import type { ViewMode } from '../types/opportunity'
import { BookmarkIcon, MoonIcon, PlusIcon, SearchIcon, SunIcon } from './Icons'
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
    `relative inline-flex h-16 items-center gap-2 px-2 text-sm font-medium transition-colors sm:px-3 ${
      isActive
        ? 'text-foreground after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent'
        : 'text-muted-foreground hover:text-foreground'
    }`

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => onViewChange('all')}
          className="flex items-center gap-2.5 rounded-lg text-left"
          aria-label="TechPulse home"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M3 12h4l2.5-6 5 12 2.5-6h4"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="text-base font-bold tracking-tight text-foreground">
            TechPulse
          </span>
        </button>

        <div className="flex items-center gap-1 sm:gap-2">
          <nav aria-label="Main navigation" className="flex items-center">
            <button
              type="button"
              onClick={() => onViewChange('all')}
              aria-current={currentView === 'all' ? 'page' : undefined}
              className={navItemClass(currentView === 'all')}
            >
              <SearchIcon className="hidden h-4 w-4 sm:block" />
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
                className="min-w-5 rounded-full bg-surface-muted px-1.5 py-0.5 text-center text-xs font-semibold tabular-nums text-muted-foreground"
                aria-label={`${savedCount} saved`}
              >
                {savedCount}
              </span>
            </button>
          </nav>

          <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-border sm:block" />

          <button
            type="button"
            onClick={onToggleTheme}
            className={buttonStyles.icon}
            aria-label={
              theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'
            }
            title={theme === 'dark' ? 'Light theme' : 'Dark theme'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            type="button"
            onClick={onSubmitClick}
            className={`${buttonStyles.primary} px-2.5 sm:px-4`}
          >
            <PlusIcon />
            <span className="sr-only sm:not-sr-only">Submit Opportunity</span>
          </button>
        </div>
      </div>
    </header>
  )
}
