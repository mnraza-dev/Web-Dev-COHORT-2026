import { cn } from "../utils/cn";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn(
        "glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
        "hover:border-primary-200/60 dark:hover:border-primary-800/50",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "shimmer rounded-md",
        "bg-[var(--bg-muted)]",
        className
      )}
      {...props}
    />
  );
}

export function Button({ className, variant = 'primary', size = 'md', ...props }) {
  const variants = {
    primary: [
      'bg-primary-600 text-white',
      'hover:bg-primary-700',
      'shadow-md shadow-primary-600/30',
      'focus:ring-primary-500',
    ].join(' '),
    secondary: [
      'bg-[var(--bg-card)] border border-[var(--border)]',
      'text-[var(--fg)] hover:bg-[var(--bg-muted)]',
    ].join(' '),
    outline: [
      'border-2 border-primary-600 text-primary-600',
      'hover:bg-primary-50 dark:hover:bg-primary-950/40',
      'focus:ring-primary-500',
    ].join(' '),
    danger: [
      'bg-red-600 text-white hover:bg-red-700',
      'shadow-md focus:ring-red-500',
    ].join(' '),
    gold: [
      'bg-gold-500 text-white hover:bg-gold-600',
      'shadow-md shadow-gold-500/30',
    ].join(' '),
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base font-semibold',
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-xl gap-2',
        'transition-all duration-200 active:scale-95',
        'focus:outline-none focus:ring-2 focus:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    />
  );
}

export function SectionHeader({ title, subtitle, className }) {
  return (
    <div className={cn("space-y-1", className)}>
      <p className="text-xs font-bold tracking-[0.25em] uppercase text-primary-600 dark:text-primary-400">
        ━ {subtitle ?? '日本'}
      </p>
      <h2 className="text-3xl font-bold text-[var(--fg)]" style={{ fontFamily: "'Noto Serif JP', serif" }}>
        {title}
      </h2>
    </div>
  );
}
