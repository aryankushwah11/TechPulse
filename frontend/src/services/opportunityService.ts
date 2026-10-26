import type { Opportunity } from '../types/opportunity'

export const API_BASE_URL = 'http://127.0.0.1:8000'

export interface CreateOpportunityPayload {
  title: string
  organization: string
  category: Opportunity['category']
  description: string
  mode: Opportunity['mode']
  location: string
  deadline: string | null
  sourceUrl: string | null
  tags: string[]
}

async function getErrorMessage(response: Response): Promise<string> {
  try {
    const data: { detail?: string | Array<{ msg?: string }> } =
      await response.json()

    if (typeof data.detail === 'string') {
      return data.detail
    }

    if (Array.isArray(data.detail)) {
      return data.detail.map((item) => item.msg ?? 'Invalid input').join(' ')
    }
  } catch {
    // Use the fallback message below if the response is not JSON.
  }

  if (response.status === 409) {
    return 'An opportunity with this title and organization already exists.'
  }

  return `Request failed (${response.status}). Please check your details and try again.`
}

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

export async function createOpportunity(
  payload: CreateOpportunityPayload,
): Promise<Opportunity> {
  let response: Response

  try {
    response = await fetch(`${API_BASE_URL}/opportunities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error(
      'Could not connect to TechPulse API. Make sure the backend server is running.',
    )
  }

  if (!response.ok) {
    throw new Error(await getErrorMessage(response))
  }

  return (await response.json()) as Opportunity
}
