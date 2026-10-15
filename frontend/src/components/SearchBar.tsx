interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <label htmlFor="opportunity-search" className="sr-only">
        Search opportunities
      </label>

      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m16 16 4 4" />
      </svg>

      <input
        id="opportunity-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search internships, hackathons, skills..."
        autoComplete="off"
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 transition focus:border-[#a7f36b]/50 focus:outline-none focus:ring-2 focus:ring-[#a7f36b]/10"
      />
    </div>
  )
}