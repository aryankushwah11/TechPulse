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
  showCounts: boolean
}

export function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  counts,
  showCounts,
}: CategoryFilterProps) {
  return (
    <div
      className="scrollbar-none flex gap-1 overflow-x-auto"
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
            className={`inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors ${
              isSelected
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-surface-muted hover:text-foreground'
            }`}
          >
            {label}
            {showCounts && (
              <span
                className={`font-mono text-[11px] tabular-nums ${
                  isSelected ? 'text-background/70' : 'text-subtle-foreground'
                }`}
              >
                {counts[value]}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
