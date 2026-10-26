export function dateFromToday(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date.toISOString().slice(0, 10)
}

export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function formatDate(dateString: string | null): string {
  if (!dateString) return 'No deadline'

  const date = parseLocalDate(dateString)

  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function getDaysUntil(dateString: string | null): number | null {
  if (!dateString) return null

  const deadline = parseLocalDate(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )
}

export function formatRelativeDeadline(dateString: string | null): string {
  const days = getDaysUntil(dateString)

  if (days === null) return 'Rolling deadline'
  if (days < 0) return 'Closed'
  if (days === 0) return 'Closes today'
  if (days === 1) return 'Closes tomorrow'
  if (days <= 30) return `${days} days left`

  return `Closes ${formatDate(dateString)}`
}

export function getDeadlineTone(
  dateString: string | null,
): 'urgent' | 'soon' | 'normal' | 'none' {
  if (!dateString) return 'none'

  const deadline = parseLocalDate(dateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const difference = Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (difference < 0) return 'none'
  if (difference <= 3) return 'urgent'
  if (difference <= 7) return 'soon'

  return 'normal'
}
