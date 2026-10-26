import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[13px] text-subtle-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-3">
          <Logo compact />
          <p>
            <span className="font-medium text-muted-foreground">TechPulse</span>
            {' · Opportunities for student builders'}
          </p>
        </div>
        <p>Always verify listings at the official source.</p>
      </div>
    </footer>
  )
}
