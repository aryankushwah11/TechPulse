
import { useEffect, useMemo, useState } from 'react'
import { CategoryFilter } from './components/CategoryFilter'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { CheckCircleIcon, XIcon } from './components/Icons'
import { OpportunityCard } from './components/OpportunityCard'
import { SampleDataBanner } from './components/SampleDataBanner'
import { SearchBar } from './components/SearchBar'
import { SortSelect } from './components/SortSelect'
import { SubmitOpportunityDialog } from './components/SubmitOpportunityDialog'
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from './components/StateMessages'
import { useDebouncedValue } from './hooks/useDebouncedValue'
import { useOpportunities } from './hooks/useOpportunities'
import { useSavedOpportunities } from './hooks/useSavedOpportunities'
import { useTheme } from './hooks/useTheme'
import {
  filterOpportunities,
  getCategoryCounts,
  sortOpportunities,
} from './utils/opportunityFilters'
import type {
  Opportunity,
  OpportunityCategory,
  SortOption,
  ViewMode,
} from './types/opportunity'

export default function App() {
  const { opportunities, isLoading, error, reload } = useOpportunities()
  const { savedIds, toggleSaved, isSaved } = useSavedOpportunities()
  const { theme, toggleTheme } = useTheme()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] =
    useState<OpportunityCategory | 'All'>('All')
  const [sortBy, setSortBy] = useState<SortOption>('deadline')
  const [currentView, setCurrentView] = useState<ViewMode>('all')
  const [isSubmitOpen, setIsSubmitOpen] = useState(false)
  const [submissionNotice, setSubmissionNotice] = useState('')

  const debouncedSearch = useDebouncedValue(searchQuery)

  useEffect(() => {
    if (!submissionNotice) return

    const timeout = window.setTimeout(() => setSubmissionNotice(''), 6000)
    return () => window.clearTimeout(timeout)
  }, [submissionNotice])

  const savedOpportunities = useMemo(
    () => opportunities.filter((opportunity) => savedIds.includes(opportunity.id)),
    [opportunities, savedIds],
  )

  const baseOpportunities = useMemo(
    () =>
      currentView === 'saved' ? savedOpportunities : opportunities,
    [currentView, savedOpportunities, opportunities],
  )

  const categoryCounts = useMemo(
    () => getCategoryCounts(baseOpportunities),
    [baseOpportunities],
  )

  const visibleOpportunities = useMemo(
    () =>
      sortOpportunities(
        filterOpportunities(
          baseOpportunities,
          debouncedSearch,
          selectedCategory,
        ),
        sortBy,
      ),
    [baseOpportunities, debouncedSearch, selectedCategory, sortBy],
  )

  const hasActiveFilters = searchQuery !== '' || selectedCategory !== 'All'
  const isSavedEmpty = currentView === 'saved' && savedOpportunities.length === 0

  function resetFilters() {
    setSearchQuery('')
    setSelectedCategory('All')
    setSortBy('deadline')
  }

  function handleSubmissionSuccess(opportunity: Opportunity) {
    setIsSubmitOpen(false)
    setCurrentView('all')
    resetFilters()
    setSubmissionNotice(`"${opportunity.title}" was submitted successfully.`)
    void reload()
  }

  function handleViewChange(view: ViewMode) {
    setCurrentView(view)
    setSubmissionNotice('')
    resetFilters()
  }

  const resultCountLabel = isLoading
    ? 'Loading listings...'
    : `${visibleOpportunities.length} ${
        visibleOpportunities.length === 1 ? 'opportunity' : 'opportunities'
      }${hasActiveFilters ? ' match your filters' : ''}`

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <a
        href="#results"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:shadow-card-hover"
      >
        Skip to opportunities
      </a>

      <Header
        savedCount={savedOpportunities.length}
        currentView={currentView}
        onViewChange={handleViewChange}
        onSubmitClick={() => {
          setSubmissionNotice('')
          setIsSubmitOpen(true)
        }}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {currentView === 'all' && <Hero />}

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          {submissionNotice && (
            <div
              role="status"
              className="flex items-center gap-3 rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm font-medium text-accent-soft-foreground"
            >
              <CheckCircleIcon className="h-5 w-5 shrink-0" />
              <p className="flex-1">{submissionNotice}</p>
              <button
                type="button"
                onClick={() => setSubmissionNotice('')}
                aria-label="Dismiss notification"
                className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-accent/15"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          )}

          <SampleDataBanner />
        </div>

        <section
          aria-label="Search and filter opportunities"
          className="sticky top-16 z-20 -mx-4 mt-6 border-b border-border bg-background/90 px-4 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/80 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
        >
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="flex-1">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <div className="md:w-60">
              <SortSelect value={sortBy} onChange={setSortBy} />
            </div>
          </div>

          <div className="mt-3">
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              counts={categoryCounts}
              showCounts={true}
            />
          </div>
        </section>

        <section
          id="results"
          className="mt-6 scroll-mt-48"
          aria-labelledby="results-heading"
        >
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h2
                id="results-heading"
                className="text-xl font-semibold tracking-tight text-foreground"
              >
                {currentView === 'saved'
                  ? 'Saved opportunities'
                  : 'All opportunities'}
              </h2>

              <p className="text-sm text-muted-foreground" aria-live="polite">
                {resultCountLabel}
              </p>
            </div>

            {hasActiveFilters && !isLoading && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-medium text-accent hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState
              message={error}
              onRetry={reload}
              apiUrl="http://127.0.0.1:8000"
            />
          ) : visibleOpportunities.length === 0 ? (
            <EmptyState
              title={
                isSavedEmpty
                  ? 'No saved opportunities yet'
                  : 'No opportunities found'
              }
              message={
                isSavedEmpty
                  ? 'Use the bookmark button on any opportunity and it will show up here.'
                  : 'Try a different keyword or choose another category.'
              }
              onReset={
                isSavedEmpty ? () => handleViewChange('all') : resetFilters
              }
              resetLabel={
                isSavedEmpty ? 'Explore opportunities' : 'Clear filters'
              }
            />
          ) : (
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {visibleOpportunities.map((opportunity) => (
                <li key={opportunity.id}>
                  <OpportunityCard
                    opportunity={opportunity}
                    isSaved={isSaved(opportunity.id)}
                    onToggleSaved={toggleSaved}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <Footer />

      <SubmitOpportunityDialog
        open={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSuccess={handleSubmissionSuccess}
      />
    </div>
  )
}
