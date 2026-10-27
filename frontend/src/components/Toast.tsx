import { CheckCircleIcon, XIcon } from './Icons'

interface ToastProps {
  title: string
  message: string
  onDismiss: () => void
}

export function Toast({ title, message, onDismiss }: ToastProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="animate-toast-in fixed right-4 bottom-4 left-4 z-50 flex items-start gap-3 rounded-xl border border-border bg-surface p-3.5 shadow-overlay sm:left-auto sm:w-96"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
        <CheckCircleIcon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-0.5 text-[13px] leading-relaxed break-words text-muted-foreground">
          {message}
        </p>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="-mt-0.5 -mr-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-subtle-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
