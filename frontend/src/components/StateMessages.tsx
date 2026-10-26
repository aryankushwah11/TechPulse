interface LoadingStateProps {
  message?: string
}

export function LoadingState({
  message = 'Finding opportunities...',
}: LoadingStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center py-16 text-center"
    >
      <span
        aria-hidden="true"
        className="h-9 w-9 animate-spin rounded-full border-2 border-white/10 border-t-[#a7f36b]"
      />
      <p className="mt-4 text-sm text-slate-300">{message}</p>
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
      className="rounded-2xl border border-rose-400/20 bg-rose-400/5 px-6 py-10 text-center"
    >
      <h2 className="text-lg font-semibold text-white">
        Something went wrong
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        {message}
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 rounded-xl bg-[#a7f36b] px-5 py-3 text-sm font-semibold text-[#10150d] transition hover:bg-[#b8ff82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a7f36b]"
      >
        Try again
      </button>
    </div>
  )
}

interface EmptyStateProps {
  title?: string
  message?: string
  onReset?: () => void
}

export function EmptyState({
  title = 'No opportunities found',
  message = 'Try another keyword or change your category filter.',
  onReset,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-white/15 px-6 py-14 text-center">
      <div
        aria-hidden="true"
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.05] text-xl text-slate-300"
      >
        ↗
      </div>

      <h2 className="mt-4 text-lg font-semibold text-white">{title}</h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
        {message}
      </p>

      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-5 rounded-xl border border-white/15 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/[0.06]"
        >
          Clear filters
        </button>
      )}
    </div>
  )
}