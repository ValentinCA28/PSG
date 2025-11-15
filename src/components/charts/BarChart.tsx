'use client';

import { cn } from "@/lib/utils";

interface BarChartProps {
  data: { label: string; value: number }[];
  className?: string;
  barColor?: string;
}

export function BarChart({ data, className, barColor = "bg-primary" }: BarChartProps) {
  const max = Math.max(...data.map(d => d.value)) || 1;

  return (
    <div className={cn("flex items-end justify-between gap-1 sm:gap-2 h-24 sm:h-32", className)}>
      {data.map((item, index) => (
        <div key={index} className="flex-1 flex flex-col items-center gap-1">
          <div
            className={cn("w-full rounded-t transition-all", barColor)}
            style={{ height: `${(item.value / max) * 100}%` }}
          />
          <span className="text-xs text-muted-foreground">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

