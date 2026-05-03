import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  className?: string;
}

export function PageHeader({ title, description, icon: Icon, className }: PageHeaderProps) {
  return (
    <div className={cn("mb-8 md:mb-12", className)}>
      <div className="flex items-center gap-4 mb-3">
        {Icon && (
          <div className="p-3 rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
            <Icon className="w-6 h-6 md:w-8 md:h-8" />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
      {description && (
        <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
