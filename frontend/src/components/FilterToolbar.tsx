import type { OpportunityCategory, SortOption } from '../types/opportunity'
import { CategoryFilter } from './CategoryFilter'
import { SearchBar } from './SearchBar'
import { SortSelect } from './SortSelect'

interface FilterToolbarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
  selectedCategory: OpportunityCategory | 'All'
  onCategoryChange: (category: OpportunityCategory | 'All') => void
  counts: Record<OpportunityCategory | 'All', number>
  showCounts: boolean
}

export function FilterToolbar({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  selectedCategory,
  onCategoryChange,
  counts,
  showCounts,
}: FilterToolbarProps) {
  return (
    <section
      aria-label="Search and filter opportunities"
      className="sticky top-14 z-20 -mx-4 bg-background/90 px-4 pt-4 pb-3 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 sm:-mx-6 sm:px-6"
    >
      <div className="rounded-xl border border-border bg-surface shadow-card">
        <div className="flex flex-col gap-1 p-1.5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchBar value={searchQuery} onChange={onSearchChange} />
          </div>
          <span aria-hidden="true" className="hidden h-6 w-px bg-border sm:block" />
          <div className="border-t border-border pt-1 sm:w-52 sm:border-t-0 sm:pt-0">
            <SortSelect value={sortBy} onChange={onSortChange} />
          </div>
        </div>
        <div className="border-t border-border px-1.5 py-1.5">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            counts={counts}
            showCounts={showCounts}
          />
        </div>
      </div>
    </section>
  )
}
