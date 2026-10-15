import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'techpulse:saved-opportunities'

function readSavedIds(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (!stored) return []

    const parsed: unknown = JSON.parse(stored)

    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === 'string')
    ) {
      return parsed
    }

    return []
  } catch {
    return []
  }
}

export function useSavedOpportunities() {
  const [savedIds, setSavedIds] = useState<string[]>(readSavedIds)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds))
    } catch {
      // Saving may be unavailable in private browsing or restricted storage.
    }
  }, [savedIds])

  const toggleSaved = useCallback((id: string) => {
    setSavedIds((currentIds) =>
      currentIds.includes(id)
        ? currentIds.filter((savedId) => savedId !== id)
        : [...currentIds, id],
    )
  }, [])

  const isSaved = useCallback(
    (id: string) => savedIds.includes(id),
    [savedIds],
  )

  return { savedIds, toggleSaved, isSaved }
}