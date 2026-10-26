export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-semibold text-slate-300">
          TechPulse<span className="text-[#a7f36b]">.</span>
        </p>

        <p className="text-slate-500">
          Built for students, by builders.
        </p>

        <p className="text-xs text-slate-500">
          Demo project · Sample listings are fictional
        </p>
      </div>
    </footer>
  )
}