const highlights = ['Hackathons', 'Internships', 'Fresher jobs', 'Workshops', 'Events']

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <svg
        aria-hidden="true"
        viewBox="0 0 600 120"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-1/2 text-border-strong md:block"
      >
        <path
          d="M0 70 H220 L240 70 L256 40 L276 100 L296 20 L314 80 L326 70 H600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
        <circle cx="296" cy="20" r="3" className="fill-accent" />
      </svg>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle-foreground">
          For students and early-career builders
        </p>
        <h1 className="mt-3 max-w-xl text-pretty text-2xl font-semibold tracking-tight text-foreground sm:text-[28px] sm:leading-tight">
          Find your next hackathon, internship or first role.
        </h1>
        <p className="mt-2 max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground">
          One place to track opportunities in tech. Save what matters, and
          always apply through the official source.
        </p>
        <ul className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
