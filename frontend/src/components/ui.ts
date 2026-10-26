const buttonBase =
  'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60'

export const buttonStyles = {
  primary: `${buttonBase} bg-accent px-4 py-2.5 text-accent-foreground hover:bg-accent-hover`,
  secondary: `${buttonBase} border border-border bg-surface px-4 py-2.5 text-foreground hover:bg-surface-muted`,
  ghost: `${buttonBase} px-3 py-2 font-medium text-muted-foreground hover:bg-surface-muted hover:text-foreground`,
  icon: `${buttonBase} h-9 w-9 border border-border bg-surface text-muted-foreground hover:bg-surface-muted hover:text-foreground`,
}

export const fieldStyles =
  'w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground shadow-xs outline-none transition placeholder:text-subtle-foreground focus:border-accent focus:ring-3 focus:ring-ring aria-[invalid=true]:border-danger aria-[invalid=true]:focus:ring-danger/20'
