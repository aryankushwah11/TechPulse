import { useMemo, useState } from 'react'
import { CategoryFilter } from './components/CategoryFilter'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { OpportunityCard } from './components/OpportunityCard'
import { SampleDataBanner } from './components/SampleDataBanner'
import { SearchBar } from './components/SearchBar'
import { SortSelect } from './components/SortSelect'
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from './components/StateMessages'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import { useOpportunities } from './hooks/useOpportunities'
import { useSavedOpportunities } from './hooks/useSavedOpportunities'
import {
  filterOpportunities,
  getCategoryCounts,
  sortOpportunities,
} from './utils/opportunityFilters'
import type {
  OpportunityCategory,
  SortOption,
  ViewMode,
} from './types/opportunity'

export default function App() {
  const { opportunities, isLoading, error, reload } = useOpportunities()
  const { savedIds, toggleSaved, isSaved } = useSavedOpportunities()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<OpportunityCategory | 'All'>('All')
  const [sortBy, setSortBy] = useState<SortOption>('deadline')
  const [currentView, setCurrentView] = useState<ViewMode>('all')

  const debouncedSearch = useDebouncedValue(searchQuery)

  const categoryCounts = useMemo(
    () => getCategoryCounts(opportunities),
    [opportunities],
  )

  const visibleOpportunities = useMemo(() => {
    const baseOpportunities =
      currentView === 'saved'
        ? opportunities.filter((opportunity) =>
            savedIds.includes(opportunity.id),
          )
        : opportunities

    const filtered = filterOpportunities(
      baseOpportunities,
      debouncedSearch,
      selectedCategory,
    )

    return sortOpportunities(filtered, sortBy)
  }, [
    opportunities,
    currentView,
    savedIds,
    debouncedSearch,
    selectedCategory,
    sortBy,
  ])

  function resetFilters() {
    setSearchQuery('')
    setSelectedCategory('All')
    setSortBy('deadline')
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-[#edf1f8]">
      <Header
        savedCount={savedIds.length}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <Hero totalOpportunities={opportunities.length} />

      <main className="mx-auto max-w-7xl px-5 pb-16 pt-8 sm:px-8">
        <SampleDataBanner />

        <section className="mt-8" aria-label="Find opportunities">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />

          <div className="mt-5">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              counts={categoryCounts}
            />
          </div>
        </section>

        <section className="mt-10" aria-labelledby="results-heading">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-[#a7f36b]">
                {currentView === 'saved'
                  ? 'YOUR COLLECTION'
                  : 'EXPLORE'}
              </p>

              <h1
                id="results-heading"
                className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl"
              >
                {currentView === 'saved'
                  ? 'Saved opportunities'
                  : 'Opportunities for you'}
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                {isLoading
                  ? 'Loading listings...'
                  : `${visibleOpportunities.length} ${
                      visibleOpportunities.length === 1
                        ? 'opportunity'
                        : 'opportunities'
                    } found`}
              </p>
            </div>

            <div className="w-full sm:w-56">
              <SortSelect value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={reload} />
          ) : visibleOpportunities.length === 0 ? (
            <EmptyState
              title={
                currentView === 'saved' &&
                savedIds.length === 0
                  ? 'No saved opportunities yet'
                  : 'No opportunities found'
              }
              message={
                currentView === 'saved' &&
                savedIds.length === 0
                  ? 'Save opportunities using the bookmark button and they will appear here.'
                  : 'Try a different search keyword or category.'
              }
              onReset={resetFilters}
            />
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleOpportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity.id}
                  opportunity={opportunity}
                  isSaved={isSaved(opportunity.id)}
                  onToggleSaved={toggleSaved}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}