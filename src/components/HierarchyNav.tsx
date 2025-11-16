'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface HierarchyLevel {
  label: string;
  href: string;
  icon?: string;
}

interface HierarchyNavProps {
  levels: HierarchyLevel[];
}

export function HierarchyNav({ levels }: HierarchyNavProps) {
  return (
    <div className="mb-8 p-4 rounded-lg border bg-card/50">
      <div className="flex items-center flex-wrap gap-2 text-sm">
        <Link
          href="/"
          className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Home className="h-4 w-4" />
        </Link>
        
        {levels.map((level, index) => (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            {index === levels.length - 1 ? (
              <span className="font-medium text-foreground flex items-center gap-1">
                {level.icon && <span>{level.icon}</span>}
                {level.label}
              </span>
            ) : (
              <Link
                href={level.href}
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                {level.icon && <span>{level.icon}</span>}
                {level.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

