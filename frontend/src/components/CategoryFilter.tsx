import type { OpportunityCategory } from '../types/opportunity'

const categories: Array<{ value: OpportunityCategory | 'All'; label: string }> = [
  { value: 'All', label: 'All' },
  { value: 'Hackathon', label: 'Hackathons' },
  { value: 'Internship', label: 'Internships' },
  { value: 'Job', label: 'Jobs' },
  { value: 'Event', label: 'Events' },
  { value: 'Workshop', label: 'Workshops' },
]

interface CategoryFilterProps {
  selectedCategory: OpportunityCategory | 'All'
  onCategoryChange: (category: OpportunityCategory | 'All') => void
  counts: Record<OpportunityCategory | 'All', number>
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  counts,
}: CategoryFilterProps) {
  return (
    <div
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0"
      role="group"
      aria-label="Filter by opportunity category"
    >
      {categories.map(({ value, label }) => {
        const isSelected = selectedCategory === value

        return (
          <button
            key={value}
            type="button"
            onClick={() => onCategoryChange(value)}
            aria-pressed={isSelected}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
              isSelected
                ? 'border-accent bg-accent-soft text-accent-soft-foreground'
                : 'border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground'
            }`}
          >
            {label}
            <span
              className={`rounded-full px-1.5 text-xs tabular-nums ${
                isSelected
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-surface-muted text-subtle-foreground'
              }`}
            >
              {counts[value]}
            </span>
          </button>
        )
      })}
    </div>
  )
}
