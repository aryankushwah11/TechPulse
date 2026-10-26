import { AlertIcon, RefreshIcon, SearchIcon } from './Icons'
import { buttonStyles } from './ui'

interface LoadingStateProps {
  message?: string
}

export function LoadingState({
  message = 'Finding opportunities...',
}: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{message}</span>
      <div
        aria-hidden="true"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-surface p-5 shadow-card"
          >
            <div className="flex items-start gap-3">
              <div className="h-11 w-11 animate-pulse rounded-lg bg-surface-muted" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-1/3 animate-pulse rounded bg-surface-muted" />
                <div className="h-4 w-4/5 animate-pulse rounded bg-surface-muted" />
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-5 w-20 animate-pulse rounded-md bg-surface-muted" />
              <div className="h-5 w-24 animate-pulse rounded-md bg-surface-muted" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-3 w-full animate-pulse rounded bg-surface-muted" />
              <div className="h-3 w-11/12 animate-pulse rounded bg-surface-muted" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-surface-muted" />
            </div>
            <div className="mt-6 h-px bg-border" />
            <div className="mt-4 flex justify-between">
              <div className="h-3 w-24 animate-pulse rounded bg-surface-muted" />
              <div className="h-3 w-16 animate-pulse rounded bg-surface-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center rounded-xl border border-border bg-surface px-6 py-14 text-center shadow-card"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-danger-soft text-danger">
        <AlertIcon className="h-6 w-6" />
      </span>

      <h2 className="mt-4 text-lg font-semibold text-foreground">
        {"We couldn't load opportunities"}
      </h2>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {message}
      </p>

      <button type="button" onClick={onRetry} className={`${buttonStyles.primary} mt-6`}>
        <RefreshIcon />
        Try again
      </button>
    </div>
  )
}

interface EmptyStateProps {
  title?: string
  message?: string
  onReset?: () => void
  resetLabel?: string
}

export function EmptyState({
  title = 'No opportunities found',
  message = 'Try another keyword or change your category filter.',
  onReset,
  resetLabel = 'Clear filters',
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border-strong bg-surface px-6 py-14 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-muted-foreground">
        <SearchIcon className="h-6 w-6" />
      </span>

      <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>

      <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        {message}
      </p>

      {onReset && (
        <button type="button" onClick={onReset} className={`${buttonStyles.secondary} mt-6`}>
          {resetLabel}
        </button>
      )}
    </div>
  )
}
