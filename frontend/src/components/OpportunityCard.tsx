import type { Opportunity, OpportunityCategory } from '../types/opportunity'
import {
  formatDate,
  formatRelativeDeadline,
  getDeadlineTone,
} from '../utils/dates'
import {
  ArrowUpRightIcon,
  BookmarkIcon,
  CalendarIcon,
  GlobeIcon,
  LinkIcon,
  MapPinIcon,
} from './Icons'

interface OpportunityCardProps {
  opportunity: Opportunity
  isSaved: boolean
  onToggleSaved: (id: string) => void
}

const categoryDot: Record<OpportunityCategory, string> = {
  Hackathon: 'bg-violet-500',
  Internship: 'bg-sky-500',
  Job: 'bg-accent',
  Event: 'bg-amber-500',
  Workshop: 'bg-rose-500',
}

const deadlineStyles = {
  urgent: 'bg-danger-soft text-danger',
  soon: 'bg-warning-soft text-warning',
  normal: 'bg-surface-muted text-muted-foreground',
  none: 'bg-surface-muted text-muted-foreground',
}

const MAX_VISIBLE_TAGS = 4

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')
}

function getHostname(url: string): string | null {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

export function OpportunityCard({
  opportunity,
  isSaved,
  onToggleSaved,
}: OpportunityCardProps) {
  const deadlineTone = getDeadlineTone(opportunity.deadline)
  const visibleTags = opportunity.tags.slice(0, MAX_VISIBLE_TAGS)
  const hiddenTagCount = opportunity.tags.length - visibleTags.length
  const sourceHost = opportunity.sourceUrl
    ? getHostname(opportunity.sourceUrl)
    : null
  const titleId = `opportunity-${opportunity.id}-title`

  return (
    <article
      aria-labelledby={titleId}
      className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 shadow-card transition hover:border-border-strong hover:shadow-card-hover"
    >
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-muted text-sm font-bold text-foreground"
        >
          {getInitials(opportunity.organization)}
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-muted-foreground">
            {opportunity.organization}
          </p>
          <h2
            id={titleId}
            className="mt-0.5 line-clamp-2 text-base font-semibold leading-snug text-foreground"
          >
            {opportunity.title}
          </h2>
        </div>

        <button
          type="button"
          onClick={() => onToggleSaved(opportunity.id)}
          aria-pressed={isSaved}
          aria-label={
            isSaved
              ? `Remove ${opportunity.title} from saved opportunities`
              : `Save ${opportunity.title}`
          }
          className={`-mr-1 -mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
            isSaved
              ? 'text-accent hover:bg-accent-soft'
              : 'text-subtle-foreground hover:bg-surface-muted hover:text-foreground'
          }`}
        >
          <BookmarkIcon filled={isSaved} className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-2 py-0.5 text-xs font-medium text-foreground">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${categoryDot[opportunity.category] ?? 'bg-subtle-foreground'}`}
          />
          {opportunity.category}
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${deadlineStyles[deadlineTone]}`}
        >
          <CalendarIcon className="h-3.5 w-3.5" />
          {formatRelativeDeadline(opportunity.deadline)}
        </span>
        {opportunity.isSample && (
          <span className="rounded-md bg-warning-soft px-2 py-0.5 text-xs font-medium text-warning">
            Sample
          </span>
        )}
      </div>

      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {opportunity.description}
      </p>

      <dl className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <dt>
            <GlobeIcon className="h-4 w-4 shrink-0 text-subtle-foreground" />
            <span className="sr-only">Mode</span>
          </dt>
          <dd className="truncate text-foreground">{opportunity.mode}</dd>
        </div>
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
          <dt>
            <MapPinIcon className="h-4 w-4 shrink-0 text-subtle-foreground" />
            <span className="sr-only">Location</span>
          </dt>
          <dd className="truncate text-foreground">{opportunity.location}</dd>
        </div>
        <div className="flex min-w-0 items-center gap-2 text-muted-foreground sm:col-span-2">
          <dt>
            <CalendarIcon className="h-4 w-4 shrink-0 text-subtle-foreground" />
            <span className="sr-only">Deadline</span>
          </dt>
          <dd className="truncate text-foreground">
            {formatDate(opportunity.deadline)}
          </dd>
        </div>
      </dl>

      {visibleTags.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
          {visibleTags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </li>
          ))}
          {hiddenTagCount > 0 && (
            <li className="rounded-full px-1.5 py-1 text-xs font-medium text-subtle-foreground">
              +{hiddenTagCount} more
            </li>
          )}
        </ul>
      )}

      <div aria-hidden="true" className="flex-1" />

      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4">
        <p className="flex min-w-0 items-center gap-1.5 text-xs text-subtle-foreground">
          <LinkIcon className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            {sourceHost ?? 'No source link'}
          </span>
        </p>

        {opportunity.sourceUrl ? (
          <a
            href={opportunity.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-accent transition-colors hover:bg-accent-soft"
          >
            View details
            <ArrowUpRightIcon className="h-4 w-4" />
            <span className="sr-only"> for {opportunity.title} (opens in a new tab)</span>
          </a>
        ) : (
          <span className="shrink-0 text-xs text-subtle-foreground">
            Verified {formatDate(opportunity.lastVerified.slice(0, 10))}
          </span>
        )}
      </div>
    </article>
  )
}
