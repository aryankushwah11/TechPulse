import { useCallback, useEffect, useState } from 'react'
import type { Opportunity } from '../types/opportunity'
import { fetchOpportunities } from '../services/opportunityService'

interface UseOpportunitiesResult {
  opportunities: Opportunity[]
  isLoading: boolean
  error: string | null
  reload: () => void
}

export function useOpportunities(): UseOpportunitiesResult {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  const reload = useCallback(() => {
    setRetryCount((count) => count + 1)
  }, [])

  useEffect(() => {
    let cancelled = false

    async function loadOpportunities() {
      setIsLoading(true)
      setError(null)

      try {
        const data = await fetchOpportunities()

        if (!cancelled) {
          setOpportunities(data)
        }
      } catch {
        if (!cancelled) {
          setError('Unable to load opportunities. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    void loadOpportunities()

    return () => {
      cancelled = true
    }
  }, [retryCount])

  return { opportunities, isLoading, error, reload }
}