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
  MapPinIcon,
} from './Icons'

interface OpportunityCardProps {
  opportunity: Opportunity
  isSaved: boolean
  onToggleSaved: (id: string) => void
}

const categoryDot: Record<OpportunityCategory, string> = {
  Hackathon: 'bg-violet-500/80',
  Internship: 'bg-sky-500/80',
  Job: 'bg-accent',
  Event: 'bg-amber-500/80',
  Workshop: 'bg-rose-500/80',
}

const deadlineTextStyles = {
  urgent: 'text-danger',
  soon: 'text-warning',
  normal: 'text-foreground',
  none: 'text-muted-foreground',
}

const MAX_VISIBLE_TAGS = 3

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join('')
}

export function OpportunityCard({
  opportunity,
  isSaved,
  onToggleSaved,
}: OpportunityCardProps) {
  const deadlineTone = getDeadlineTone(opportunity.deadline)
  const visibleTags = opportunity.tags.slice(0, MAX_VISIBLE_TAGS)
  const hiddenTagCount = opportunity.tags.length - visibleTags.length
  const titleId = `opportunity-${opportunity.id}-title`

  return (
    <article
      aria-labelledby={titleId}
      className="flex h-full flex-col rounded-xl border border-border bg-surface shadow-card transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-card-hover"
    >
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-muted font-mono text-xs font-medium text-muted-foreground"
          >
            {getInitials(opportunity.organization)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">
              {opportunity.organization}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span
                aria-hidden="true"
                className={`h-1.5 w-1.5 rounded-full ${categoryDot[opportunity.category] ?? 'bg-subtle-foreground'}`}
              />
              {opportunity.category}
              {opportunity.isSample && (
                <>
                  <span aria-hidden="true" className="text-subtle-foreground">
                    {'·'}
                  </span>
                  <span className="text-warning">Sample</span>
                </>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onToggleSaved(opportunity.id)}
            aria-pressed={isSaved}
            aria-label={
              isSaved
                ? `Remove ${opportunity.title} from saved`
                : `Save ${opportunity.title}`
            }
            className={`-mr-1.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md transition-colors ${
              isSaved
                ? 'text-accent hover:bg-accent-soft'
                : 'text-subtle-foreground hover:bg-surface-muted hover:text-foreground'
            }`}
          >
            <BookmarkIcon filled={isSaved} className="h-[18px] w-[18px]" />
          </button>
        </div>

        <h2
          id={titleId}
          className="mt-3.5 line-clamp-2 text-[15px] font-semibold leading-snug text-pretty text-foreground"
        >
          {opportunity.title}
        </h2>

        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {opportunity.description}
        </p>

        <dl className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <dt>
              <GlobeIcon className="h-3.5 w-3.5 text-subtle-foreground" />
              <span className="sr-only">Mode</span>
            </dt>
            <dd>{opportunity.mode}</dd>
          </div>
          <div className="flex min-w-0 items-center gap-1.5">
            <dt>
              <MapPinIcon className="h-3.5 w-3.5 text-subtle-foreground" />
              <span className="sr-only">Location</span>
            </dt>
            <dd className="truncate">{opportunity.location}</dd>
          </div>
        </dl>

        {visibleTags.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
            {visibleTags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-border px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
            {hiddenTagCount > 0 && (
              <li className="px-1 py-0.5 text-xs text-subtle-foreground">
                +{hiddenTagCount}
              </li>
            )}
          </ul>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2">
          <CalendarIcon className="h-4 w-4 shrink-0 text-subtle-foreground" />
          <p className="min-w-0 truncate text-[13px]">
            <span className="sr-only">Deadline: </span>
            <span className={`font-medium ${deadlineTextStyles[deadlineTone]}`}>
              {formatRelativeDeadline(opportunity.deadline)}
            </span>
            {opportunity.deadline && (
              <span className="text-subtle-foreground">
                {' · '}
                {formatDate(opportunity.deadline)}
              </span>
            )}
          </p>
        </div>

        {opportunity.sourceUrl ? (
          <a
            href={opportunity.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-8 shrink-0 items-center gap-1 rounded-lg border border-border px-2.5 text-[13px] font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            View opportunity
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
            <span className="sr-only">: {opportunity.title} (opens in a new tab)</span>
          </a>
        ) : (
          <span className="shrink-0 text-xs text-subtle-foreground">
            No link provided
          </span>
        )}
      </div>
    </article>
  )
}
