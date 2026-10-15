export function SampleDataBanner() {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm text-amber-100"
    >
      <span aria-hidden="true" className="text-lg">
        ⚠️
      </span>

      <p className="leading-6">
        <strong className="font-semibold">Demo data:</strong>{' '}
        These opportunities are fictional examples for preview purposes.
        They are not verified, live openings. Always check official sources
        before applying.
      </p>
    </div>
  )
}