import { AlertIcon, RefreshIcon, SearchIcon, ServerIcon } from './Icons'
import { buttonStyles } from './ui'

interface LoadingStateProps {
  message?: string
}

export function LoadingState({
  message = 'Loading opportunities...',
}: LoadingStateProps) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{message}</span>
      <div
        aria-hidden="true"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-surface shadow-card"
          >
            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 animate-pulse rounded-lg bg-surface-muted" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-2/5 animate-pulse rounded bg-surface-muted" />
                  <div className="h-2.5 w-1/4 animate-pulse rounded bg-surface-muted" />
                </div>
              </div>
              <div className="mt-4 h-4 w-4/5 animate-pulse rounded bg-surface-muted" />
              <div className="mt-3 space-y-1.5">
                <div className="h-3 w-full animate-pulse rounded bg-surface-muted" />
                <div className="h-3 w-3/4 animate-pulse rounded bg-surface-muted" />
              </div>
              <div className="mt-4 flex gap-1.5">
                <div className="h-5 w-14 animate-pulse rounded-md bg-surface-muted" />
                <div className="h-5 w-16 animate-pulse rounded-md bg-surface-muted" />
                <div className="h-5 w-12 animate-pulse rounded-md bg-surface-muted" />
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-3 sm:px-5">
              <div className="h-3 w-28 animate-pulse rounded bg-surface-muted" />
              <div className="h-8 w-32 animate-pulse rounded-lg bg-surface-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ErrorStateProps {
  message: string
  apiUrl: string
  onRetry: () => void
}

export function ErrorState({ message, apiUrl, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="overflow-hidden rounded-xl border border-border bg-surface shadow-card"
    >
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start sm:p-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-danger-soft text-danger">
          <ServerIcon className="h-5 w-5" />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="text-base font-semibold text-foreground">
            {"Couldn't connect to the TechPulse API"}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {message} No listings are shown because the request did not
            complete.
          </p>

          <dl className="mt-4 grid gap-x-6 gap-y-2 rounded-lg border border-border bg-surface-muted/60 px-3.5 py-3 text-[13px] sm:grid-cols-[auto_1fr]">
            <dt className="text-subtle-foreground">Endpoint</dt>
            <dd className="font-mono break-all text-foreground">
              {apiUrl}/opportunities
            </dd>
            <dt className="text-subtle-foreground">Likely cause</dt>
            <dd className="text-foreground">
              The FastAPI server is not running, or this page is hosted
              somewhere that cannot reach a local backend (such as a cloud
              preview).
            </dd>
          </dl>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-2 border-t border-border bg-surface-muted/40 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="flex items-center gap-1.5 text-xs text-subtle-foreground">
          <AlertIcon className="h-3.5 w-3.5 shrink-0" />
          Start the backend locally, then retry.
        </p>
        <button type="button" onClick={onRetry} className={buttonStyles.secondary}>
          <RefreshIcon />
          Retry connection
        </button>
      </div>
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
    <div className="flex flex-col items-center rounded-xl border border-dashed border-border-strong px-6 py-12 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground shadow-card">
        <SearchIcon className="h-5 w-5" />
      </span>

      <h2 className="mt-4 text-base font-semibold text-foreground">{title}</h2>

      <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {message}
      </p>

      {onReset && (
        <button type="button" onClick={onReset} className={`${buttonStyles.secondary} mt-5`}>
          {resetLabel}
        </button>
      )}
    </div>
  )
}
