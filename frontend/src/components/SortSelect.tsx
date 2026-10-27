import type { SortOption } from '../types/opportunity'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-opportunities"
        className="shrink-0 text-sm text-subtle-foreground"
      >
        Sort
      </label>

      <div className="relative w-full">
        <select
          id="sort-opportunities"
          value={value}
          onChange={(event) => onChange(event.target.value as SortOption)}
          className="h-10 w-full appearance-none rounded-lg border border-transparent bg-transparent pr-8 pl-2.5 text-sm font-medium text-foreground outline-none transition hover:bg-surface-muted/60 focus:border-accent focus:bg-surface focus:ring-3 focus:ring-ring"
        >
          <option value="deadline">Closing soonest</option>
          <option value="newest">Recently verified</option>
          <option value="title">{'Title A–Z'}</option>
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-subtle-foreground"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
