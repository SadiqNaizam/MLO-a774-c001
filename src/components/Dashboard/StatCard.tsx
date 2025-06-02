import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  trend?: 'up' | 'down';
  subValue?: string;
  progress: number;
  progressColor: 'blue' | 'red' | 'yellow' | 'green';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  subValue,
  progress,
  progressColor,
  className,
}) => {
  const TrendIcon = trend === 'up' ? ArrowUp : trend === 'down' ? ArrowDown : null;
  const valueColor = trend === 'up' ? 'text-accentGreen' : trend === 'down' ? 'text-destructive' : 'text-foreground';

  const getProgressRingColor = (): string => {
    switch (progressColor) {
      case 'blue': return 'text-primary'; //hsl(var(--primary))
      case 'red': return 'text-destructive'; //hsl(var(--destructive))
      case 'yellow': return 'text-accentYellow'; // custom yellow
      case 'green': return 'text-accentGreen'; // custom green
      default: return 'text-primary';
    }
  };

  const getProgressRingBgColor = (): string => {
    switch (progressColor) {
      case 'blue': return 'bg-blue-100 dark:bg-blue-500/20';
      case 'red': return 'bg-red-100 dark:bg-red-500/20';
      case 'yellow': return 'bg-yellow-100 dark:bg-yellow-500/20';
      case 'green': return 'bg-green-100 dark:bg-green-500/20';
      default: return 'bg-blue-100 dark:bg-blue-500/20';
    }
  };

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {title}
        </CardTitle>
        {progress !== undefined && (
          <div className={cn(
            "relative h-9 w-9 rounded-full flex items-center justify-center",
            getProgressRingBgColor()
          )}>
            <svg className="transform -rotate-90 h-9 w-9">
              <circle
                className="text-transparent"
                strokeWidth="3"
                stroke="currentColor" // This will be the bg color from parent div
                fill="transparent"
                r="12.5" // (9*PIXEL_RATIO/2) - strokeWidth/2 = (36/2) - 1.5 = 18-1.5 = 16.5. For h-9/w-9 (36px), r=12.5
                cx="18"
                cy="18"
              />
              <circle
                className={getProgressRingColor()}
                strokeWidth="3"
                strokeDasharray={2 * Math.PI * 12.5} // 2 * PI * r
                strokeDashoffset={2 * Math.PI * 12.5 * (1 - progress / 100)}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="12.5"
                cx="18"
                cy="18"
              />
            </svg>
            <span className={cn("absolute text-[10px] font-semibold", getProgressRingColor())}>{progress}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn("text-3xl font-bold flex items-center", valueColor)}>
          {TrendIcon && <TrendIcon className="h-5 w-5 mr-1 flex-shrink-0" />}
          <span>{value}</span>
          {subValue && <span className="text-xl font-medium text-muted-foreground ml-1.5 self-end pb-0.5">{subValue}</span>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
