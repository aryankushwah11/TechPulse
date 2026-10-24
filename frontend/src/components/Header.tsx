interface HeaderProps {
  savedCount: number
  currentView: 'all' | 'saved'
  onViewChange: (view: 'all' | 'saved') => void
  onSubmitClick: () => void
}

export function Header({
  savedCount,
  currentView,
  onViewChange,
  onSubmitClick,
}: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-[#0b0e14]/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => onViewChange('all')}
          className="flex items-center gap-3 text-left"
          aria-label="TechPulse home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#a7f36b] text-lg font-black text-[#10150d]">
            T
          </span>
          <span>
            <span className="block text-lg font-bold tracking-tight text-white">
              TechPulse
            </span>
            <span className="block text-xs text-slate-400">
              Opportunities for students
            </span>
          </span>
        </button>

        <nav
          aria-label="Main navigation"
          className="flex items-center gap-1"
        >
          <button
            type="button"
            onClick={() => onViewChange('all')}
            aria-current={currentView === 'all' ? 'page' : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              currentView === 'all'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Explore
          </button>

          <button
            type="button"
            onClick={() => onViewChange('saved')}
            aria-current={currentView === 'saved' ? 'page' : undefined}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              currentView === 'saved'
                ? 'bg-white/10 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved
            <span className="ml-2 rounded-full bg-[#a7f36b]/15 px-2 py-0.5 text-xs text-[#a7f36b]">
              {savedCount}
            </span>
          </button>

          <button
            type="button"
            onClick={onSubmitClick}
            className="ml-1 rounded-lg bg-[#a7f36b] px-3 py-2 text-sm font-semibold text-[#10150d] transition hover:bg-[#b8ff80]"
          >
            + Submit
          </button>
        </nav>
      </div>
    </header>
  )
}