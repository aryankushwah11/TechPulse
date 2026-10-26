export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p className="font-semibold text-foreground">TechPulse</p>
        <p className="text-muted-foreground">Built for students, by builders.</p>
        <p className="text-xs text-subtle-foreground">
          {'Demo project · Sample listings are fictional'}
        </p>
      </div>
    </footer>
  )
}
