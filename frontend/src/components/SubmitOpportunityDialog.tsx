import { useEffect, useRef } from 'react'
import type { Opportunity } from '../types/opportunity'
import { XIcon } from './Icons'
import { SubmitOpportunityForm } from './SubmitOpportunityForm'

interface SubmitOpportunityDialogProps {
  open: boolean
  onClose: () => void
  onSuccess: (opportunity: Opportunity) => void
}

export function SubmitOpportunityDialog({
  open,
  onClose,
  onSuccess,
}: SubmitOpportunityDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else if (!open && dialog.open) {
      dialog.close()
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="submit-opportunity-heading"
      aria-describedby="submit-opportunity-description"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl border border-border bg-surface p-0 text-foreground shadow-overlay backdrop:bg-transparent"
    >
      {open && (
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div>
              <h2
                id="submit-opportunity-heading"
                className="text-base font-semibold text-foreground"
              >
                Submit an opportunity
              </h2>
              <p
                id="submit-opportunity-description"
                className="mt-0.5 text-sm text-muted-foreground"
              >
                Share a listing with other students. Only include details you
                can verify at the official source.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="-mt-1 -mr-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-subtle-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <XIcon className="h-4 w-4" />
            </button>
          </div>

          <SubmitOpportunityForm onSuccess={onSuccess} onCancel={onClose} />
        </div>
      )}
    </dialog>
  )
}
