import React from 'react';
import StatCard from './StatCard';
import { cn } from '@/lib/utils';

interface StatsCardGridProps {
  className?: string;
}

const statsData = [
  {
    id: 'new-accounts',
    title: 'NEW ACCOUNTS',
    value: '234 %',
    trend: 'up' as const,
    progress: 58,
    progressColor: 'blue' as const,
  },
  {
    id: 'total-expenses',
    title: 'TOTAL EXPENSES',
    value: '71 %',
    trend: 'down' as const,
    progress: 62,
    progressColor: 'red' as const,
  },
  {
    id: 'company-value',
    title: 'COMPANY VALUE',
    value: '$ 1,45M',
    // No trend icon visible for this one in the image, so trend is undefined
    progress: 72,
    progressColor: 'yellow' as const,
  },
  {
    id: 'new-employees',
    title: 'NEW EMPLOYEES',
    value: '+ 34',
    subValue: 'hires',
    // No trend icon but value implies positive. Trend can be omitted or set to 'up' for styling if desired.
    progress: 81,
    progressColor: 'green' as const,
  },
];

const StatsCardGrid: React.FC<StatsCardGridProps> = ({ className }) => {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", className)}>
      {statsData.map((stat) => (
        <StatCard
          key={stat.id}
          title={stat.title}
          value={stat.value}
          trend={stat.trend}
          subValue={stat.subValue}
          progress={stat.progress}
          progressColor={stat.progressColor}
        />
      ))}
    </div>
  );
};

export default StatsCardGrid;
