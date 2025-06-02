import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Settings, Eye, BarChartHorizontal } from 'lucide-react';
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';
import { cn } from '@/lib/utils';

interface CircleProgressCardProps {
  className?: string;
}

const mainProgressValue = 75;
const mainProgressData = [
    { name: 'Percent', value: mainProgressValue, fill: 'url(#incomePerformanceGradient)' }
];

const CircleProgressCard: React.FC<CircleProgressCardProps> = ({ className }) => {
  const spendingsTargetPercent = 32;

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="flex flex-row items-start sm:items-center justify-between pb-2">
        <div>
            <CardTitle className="text-lg font-semibold">Income</CardTitle>
            {/* <CardDescription className="text-sm text-muted-foreground mt-0.5 hidden sm:block">Monthly performance</CardDescription> */}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BarChartHorizontal className="mr-2 h-4 w-4" />
              Full Report
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Widget Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-4">
        <div className="relative h-40 w-40 sm:h-44 sm:w-44 md:h-48 md:w-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="75%"
              outerRadius="100%"
              barSize={16} 
              data={mainProgressData}
              startAngle={90}
              endAngle={-270}
            >
              <defs>
                <linearGradient id="incomePerformanceGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" /> {/* accentGreen from Tailwind config */}
                  <stop offset="100%" stopColor="#2563EB" /> {/* primary from Tailwind config */}
                </linearGradient>
              </defs>
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background={{ fill: 'hsl(var(--muted))' }}
                dataKey="value"
                angleAxisId={0}
                cornerRadius="50%"
              />
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-muted-foreground">Percent</span>
            <span className="text-4xl font-bold text-foreground mt-0.5">{mainProgressValue}</span>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-xl font-medium text-foreground">{spendingsTargetPercent}%</p>
          <p className="text-sm text-muted-foreground">Spendings Target</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CircleProgressCard;
