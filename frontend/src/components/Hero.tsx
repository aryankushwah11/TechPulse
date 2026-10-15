interface HeroProps {
  totalOpportunities: number
}

export function Hero({ totalOpportunities }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#a7f36b]/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#a7f36b]/20 bg-[#a7f36b]/5 px-3 py-1.5 text-xs font-medium text-[#a7f36b]">
          <span className="h-2 w-2 rounded-full bg-[#a7f36b]" />
          Your next opportunity starts here
        </div>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-6xl">
          Find opportunities.
          <span className="block text-[#a7f36b]">
            Build your future.
          </span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">
          Discover hackathons, internships, fresher jobs, workshops and
          tech events in one place. Spend less time searching and more
          time building.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="text-2xl font-bold text-white">
              {totalOpportunities}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Demo opportunities
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="text-2xl font-bold text-white">5</p>
            <p className="mt-1 text-xs text-slate-400">
              Categories
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-5 py-4">
            <p className="text-2xl font-bold text-[#a7f36b]">Free</p>
            <p className="mt-1 text-xs text-slate-400">
              Student access
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}