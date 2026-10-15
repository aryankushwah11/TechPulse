import type {
  Opportunity,
  OpportunityCategory,
  SortOption,
} from '../types/opportunity'

export function filterOpportunities(
  opportunities: Opportunity[],
  searchQuery: string,
  selectedCategory: OpportunityCategory | 'All',
): Opportunity[] {
  const query = searchQuery.trim().toLowerCase()

  return opportunities.filter((opportunity) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      opportunity.category === selectedCategory

    const searchableText = [
      opportunity.title,
      opportunity.organization,
      opportunity.description,
      opportunity.category,
      opportunity.location,
      ...opportunity.tags,
    ]
      .join(' ')
      .toLowerCase()

    const matchesSearch =
      query.length === 0 || searchableText.includes(query)

    return matchesCategory && matchesSearch
  })
}

export function sortOpportunities(
  opportunities: Opportunity[],
  sortBy: SortOption,
): Opportunity[] {
  return [...opportunities].sort((a, b) => {
    if (sortBy === 'title') {
      return a.title.localeCompare(b.title)
    }

    if (sortBy === 'newest') {
      return (
        new Date(b.lastVerified).getTime() -
        new Date(a.lastVerified).getTime()
      )
    }

    if (!a.deadline) return 1
    if (!b.deadline) return -1

    return a.deadline.localeCompare(b.deadline)
  })
}

export function getCategoryCounts(
  opportunities: Opportunity[],
): Record<OpportunityCategory | 'All', number> {
  const counts: Record<OpportunityCategory | 'All', number> = {
    All: opportunities.length,
    Hackathon: 0,
    Internship: 0,
    Job: 0,
    Event: 0,
    Workshop: 0,
  }

  for (const opportunity of opportunities) {
    counts[opportunity.category]++
  }

  return counts
}