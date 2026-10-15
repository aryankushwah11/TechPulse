import type { SortOption } from '../types/opportunity'

interface SortSelectProps {
  value: SortOption
  onChange: (value: SortOption) => void
}

export function SortSelect({ value, onChange }: SortSelectProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort-opportunities" className="shrink-0 text-sm text-slate-400">
        Sort by
      </label>

      <select
        id="sort-opportunities"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="min-w-0 rounded-lg border border-white/10 bg-[#141923] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#a7f36b]/50"
      >
        <option value="deadline">Deadline</option>
        <option value="newest">Recently verified</option>
        <option value="title">Title A–Z</option>
      </select>
    </div>
  )
}