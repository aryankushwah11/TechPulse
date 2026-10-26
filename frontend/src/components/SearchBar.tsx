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

      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-subtle-foreground" />

      <input
        id="opportunity-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && value) onChange('')
        }}
        placeholder="Search roles, companies, skills or locations"
        autoComplete="off"
        className="h-10 w-full rounded-lg border border-transparent bg-transparent pr-9 pl-9 text-sm text-foreground outline-none transition placeholder:text-subtle-foreground hover:bg-surface-muted/60 focus:border-accent focus:bg-surface focus:ring-3 focus:ring-ring [&::-webkit-search-cancel-button]:hidden"
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute top-1/2 right-1.5 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-subtle-foreground transition-colors hover:bg-surface-muted hover:text-foreground"
        >
          <XIcon className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}
