import type { Opportunity } from '../types/opportunity'

const API_BASE_URL = 'http://127.0.0.1:8000'

export async function fetchOpportunities(): Promise<Opportunity[]> {
  const params = new URLSearchParams(window.location.search)

  if (import.meta.env.DEV && params.get('simulate') === 'slow') {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  if (import.meta.env.DEV && params.get('simulate') === 'error') {
    throw new Error('Unable to load opportunities. Please try again.')
  }

  try {
    const response = await fetch(`${API_BASE_URL}/opportunities`)

    if (!response.ok) {
      throw new Error('Unable to load opportunities from the server.')
    }

    const data: { count: number; results: Opportunity[] } =
      await response.json()

    return data.results
  } catch {
    throw new Error(
      'Could not connect to TechPulse API. Make sure the backend server is running.',
    )
  }
}