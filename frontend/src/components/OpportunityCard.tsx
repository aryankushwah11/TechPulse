import type { Opportunity } from '../types/opportunity'
import { formatDate, getDeadlineTone } from '../utils/dates'

interface OpportunityCardProps {
  opportunity: Opportunity
  isSaved: boolean
  onToggleSaved: (id: string) => void
}

const categoryStyles: Record<string, string> = {
  Hackathon: 'bg-violet-400/10 text-violet-300 border-violet-400/20',
  Internship: 'bg-sky-400/10 text-sky-300 border-sky-400/20',
  Job: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/20',
  Event: 'bg-orange-400/10 text-orange-300 border-orange-400/20',
  Workshop: 'bg-pink-400/10 text-pink-300 border-pink-400/20',
}

const deadlineStyles = {
  urgent: 'text-rose-300',
  soon: 'text-amber-300',
  normal: 'text-slate-300',
  none: 'text-slate-500',
}

export function OpportunityCard({
  opportunity,
  isSaved,
  onToggleSaved,
}: OpportunityCardProps) {
  const deadlineTone = getDeadlineTone(opportunity.deadline)

  return (
    <article className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition duration-200 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            categoryStyles[opportunity.category] ??
            'border-white/10 text-slate-300'
          }`}
        >
          {opportunity.category}
        </span>

        <button
          type="button"
          onClick={() => onToggleSaved(opportunity.id)}
          aria-pressed={isSaved}
          aria-label={
            isSaved
              ? `Remove ${opportunity.title} from saved opportunities`
              : `Save ${opportunity.title}`
          }
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition ${
            isSaved
              ? 'border-[#a7f36b]/30 bg-[#a7f36b]/10 text-[#a7f36b]'
              : 'border-white/10 text-slate-400 hover:text-white'
          }`}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="1.8"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 4.75A1.75 1.75 0 0 1 7.75 3h8.5A1.75 1.75 0 0 1 18 4.75V21l-6-3.75L6 21V4.75Z"
            />
          </svg>
        </button>
      </div>

      <h2 className="mt-5 text-lg font-semibold leading-7 text-white">
        {opportunity.title}
      </h2>

      <p className="mt-1 text-sm text-slate-400">
        {opportunity.organization}
      </p>

      <p className="mt-4 flex-1 text-sm leading-6 text-slate-400">
        {opportunity.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {opportunity.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-white/[0.05] px-2 py-1 text-xs text-slate-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-5 space-y-3 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-500">Location</span>
          <span className="text-right text-slate-300">
            {opportunity.mode} · {opportunity.location}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="text-slate-500">Deadline</span>
          <span className={`text-right font-medium ${deadlineStyles[deadlineTone]}`}>
            {formatDate(opportunity.deadline)}
          </span>
        </div>
      </div>

      {opportunity.sourceUrl ? (
        <a
          href={opportunity.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#a7f36b] px-4 py-3 text-sm font-semibold text-[#10150d] transition hover:bg-[#b8ff82] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a7f36b]"
        >
          View opportunity
          <span aria-hidden="true">↗</span>
        </a>
      ) : (
        <p className="mt-5 rounded-xl border border-white/10 px-4 py-3 text-center text-xs text-slate-500">
          Demo listing · No application link
        </p>
      )}
    </article>
  )
}