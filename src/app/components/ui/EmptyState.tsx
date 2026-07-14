import type { ReactNode } from "react";

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
}

export default function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <div className="inline-flex items-center gap-2 text-muted-foreground">
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="text-[11px] font-medium">{title}</span>
      {description && (
        <span className="text-[11px] text-muted-foreground/60 hidden sm:inline">
          {description}
        </span>
      )}
    </div>
  );
}
