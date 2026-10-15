import type { Opportunity } from '../types/opportunity'
import { sampleOpportunities } from '../data/sampleOpportunities'

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const params = new URLSearchParams(window.location.search)

  if (import.meta.env.DEV && params.get('simulate') === 'slow') {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  if (import.meta.env.DEV && params.get('simulate') === 'error') {
    throw new Error(
      'Unable to load opportunities. Please try again.',
    )
  }

  return sampleOpportunities
}