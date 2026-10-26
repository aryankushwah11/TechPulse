import { InfoIcon } from './Icons'

export function SampleDataBanner() {
  return (
    <div
      role="note"
      className="flex items-start gap-3 rounded-lg border border-warning/25 bg-warning-soft px-4 py-3 text-sm text-foreground"
    >
      <InfoIcon className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
      <p className="leading-relaxed">
        <strong className="font-semibold">Demo data:</strong>{' '}
        <span className="text-muted-foreground">
          Listings marked as sample are fictional examples, not verified live
          openings. Always check official sources before applying.
        </span>
      </p>
    </div>
  )
}
