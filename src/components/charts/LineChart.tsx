'use client';

import { cn } from "@/lib/utils";

interface LineChartProps {
  data: number[];
  className?: string;
  color?: string;
}

export function LineChart({ data, className, color = "bg-primary" }: LineChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  return (
    <div className={cn("relative h-24 sm:h-32 w-full overflow-hidden", className)}>
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - ((value - min) / range) * 100;
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={color}
        />
        {data.map((value, index) => {
          const x = (index / (data.length - 1)) * 100;
          const y = 100 - ((value - min) / range) * 100;
          return (
            <circle
              key={index}
              cx={x}
              cy={y}
              r="2"
              fill="currentColor"
              className={color}
            />
          );
        })}
      </svg>
    </div>
  );
}

