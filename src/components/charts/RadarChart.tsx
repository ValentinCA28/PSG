'use client';

import { cn } from "@/lib/utils";

interface RadarChartProps {
  data: { label: string; value: number }[];
  className?: string;
}

export function RadarChart({ data, className }: RadarChartProps) {
  const max = Math.max(...data.map(d => d.value)) || 1;
  const centerX = 50;
  const centerY = 50;
  const radius = 40;

  const points = data.map((item, index) => {
    const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2;
    const value = (item.value / max) * radius;
    const x = centerX + value * Math.cos(angle);
    const y = centerY + value * Math.sin(angle);
    return { x, y, label: item.label };
  });

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';

  return (
    <div className={cn("relative h-48 sm:h-64 w-full overflow-hidden", className)}>
      <svg viewBox="0 0 100 100" className="h-full w-full">
        {/* Grid circles */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <circle
            key={scale}
            cx={centerX}
            cy={centerY}
            r={radius * scale}
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            className="text-muted-foreground opacity-30"
          />
        ))}
        {/* Grid lines */}
        {data.map((_, index) => {
          const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle);
          const y = centerY + radius * Math.sin(angle);
          return (
            <line
              key={index}
              x1={centerX}
              y1={centerY}
              x2={x}
              y2={y}
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-muted-foreground opacity-30"
            />
          );
        })}
        {/* Data polygon */}
        <path
          d={pathData}
          fill="currentColor"
          fillOpacity="0.3"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-primary"
        />
        {/* Data points */}
        {points.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="1.5"
            fill="currentColor"
            className="text-primary"
          />
        ))}
        {/* Labels */}
        {points.map((point, index) => {
          const angle = (index / data.length) * 2 * Math.PI - Math.PI / 2;
          const labelRadius = radius + 8;
          const labelX = centerX + labelRadius * Math.cos(angle);
          const labelY = centerY + labelRadius * Math.sin(angle);
          return (
            <text
              key={index}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="3"
              className="fill-foreground"
            >
              {point.label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

