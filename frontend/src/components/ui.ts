const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60'

export const buttonStyles = {
  primary: `${buttonBase} h-9 bg-accent px-3.5 text-accent-foreground shadow-card hover:bg-accent-hover`,
  secondary: `${buttonBase} h-9 border border-border bg-surface px-3.5 text-foreground shadow-card hover:border-border-strong hover:bg-surface-muted`,
  ghost: `${buttonBase} h-9 px-3 text-muted-foreground hover:bg-surface-muted hover:text-foreground`,
  icon: `${buttonBase} h-9 w-9 text-muted-foreground hover:bg-surface-muted hover:text-foreground`,
}

export const fieldStyles =
  'h-10 w-full rounded-lg border border-border bg-surface px-3 text-sm text-foreground outline-none transition placeholder:text-subtle-foreground hover:border-border-strong focus:border-accent focus:ring-3 focus:ring-ring aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/20'
