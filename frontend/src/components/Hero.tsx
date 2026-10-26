import type { Opportunity } from '../types/opportunity'
import { getDaysUntil } from '../utils/dates'

interface HeroProps {
  opportunities: Opportunity[]
  isLoading: boolean
}

export function Hero({ opportunities, isLoading }: HeroProps) {
  const closingThisWeek = opportunities.filter((opportunity) => {
    const days = getDaysUntil(opportunity.deadline)
    return days !== null && days >= 0 && days <= 7
  }).length

  const remoteFriendly = opportunities.filter(
    (opportunity) => opportunity.mode !== 'Offline',
  ).length

  const organizations = new Set(
    opportunities.map((opportunity) => opportunity.organization),
  ).size

  const stats = [
    { label: 'Open opportunities', value: opportunities.length },
    { label: 'Closing this week', value: closingThisWeek },
    { label: 'Online or hybrid', value: remoteFriendly },
    { label: 'Organizations', value: organizations },
  ]

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-12">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent-soft-foreground">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
            Curated for students and early-career builders
          </p>
          <h1 className="mt-4 text-pretty text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Discover opportunities that move your career forward
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground">
            Hackathons, internships, fresher jobs, workshops and tech events,
            all in one place. Spend less time searching and more time building.
          </p>
        </div>

        <dl className="grid w-full shrink-0 grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4 lg:w-auto lg:min-w-[32rem]">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface px-4 py-4">
              <dt className="text-xs font-medium text-muted-foreground">
                {stat.label}
              </dt>
              <dd className="mt-1 text-2xl font-bold tabular-nums tracking-tight text-foreground">
                {isLoading ? (
                  <span
                    aria-hidden="true"
                    className="inline-block h-7 w-10 animate-pulse rounded bg-surface-muted align-middle"
                  />
                ) : (
                  stat.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
