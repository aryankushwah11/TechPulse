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
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface p-0 text-foreground shadow-2xl backdrop:bg-transparent"
    >
      {open && (
        <div className="flex max-h-[calc(100dvh-2rem)] flex-col">
          <div className="flex items-start justify-between gap-4 border-b border-border px-5 py-4 sm:px-6">
            <div>
              <h2
                id="submit-opportunity-heading"
                className="text-lg font-semibold text-foreground"
              >
                Submit an opportunity
              </h2>
              <p
                id="submit-opportunity-description"
                className="mt-1 text-sm text-muted-foreground"
              >
                Share something useful with fellow students. Only submit details
                you can verify from a reliable source.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="-mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
            >
              <XIcon className="h-5 w-5" />
            </button>
          </div>

          <SubmitOpportunityForm onSuccess={onSuccess} onCancel={onClose} />
        </div>
      )}
    </dialog>
  )
}
