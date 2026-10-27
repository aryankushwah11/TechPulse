import { InfoIcon } from './Icons'

export function SampleDataBanner() {
  return (
    <div
      role="note"
      className="flex items-start gap-2.5 rounded-lg border border-warning/25 bg-warning-soft px-3.5 py-2.5 text-[13px] leading-relaxed text-foreground"
    >
      <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
      <p>
        <span className="font-medium">Some listings are samples.</span>{' '}
        <span className="text-muted-foreground">
          Items marked Sample are fictional examples. Always confirm details at
          the official source before applying.
        </span>
      </p>
    </div>
  )
}
