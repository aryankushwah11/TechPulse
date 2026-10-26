import { SearchIcon, XIcon } from './Icons'

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

      <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-subtle-foreground" />

      <input
        id="opportunity-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by role, company, skill or location"
        autoComplete="off"
        className="h-11 w-full rounded-lg border border-border bg-surface pl-10 pr-10 text-sm text-foreground outline-none transition placeholder:text-subtle-foreground focus:border-accent focus:ring-3 focus:ring-ring [&::-webkit-search-cancel-button]:hidden"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-subtle-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <XIcon className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
