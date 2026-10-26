import type { OpportunityCategory } from '../types/opportunity'

const categories: Array<OpportunityCategory | 'All'> = [
  'All',
  'Hackathon',
  'Internship',
  'Job',
  'Event',
  'Workshop',
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
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter by opportunity category"
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category

        return (
          <button
            key={category}
            type="button"
            onClick={() => onCategoryChange(category)}
            aria-pressed={isSelected}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isSelected
                ? 'border-[#a7f36b] bg-[#a7f36b] text-[#10150d]'
                : 'border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:bg-white/[0.07]'
            }`}
          >
            {category}
            <span
              className={`ml-2 text-xs ${
                isSelected ? 'text-[#10150d]/70' : 'text-slate-500'
              }`}
            >
              {counts[category]}
            </span>
          </button>
        )
      })}
    </div>
  )
}