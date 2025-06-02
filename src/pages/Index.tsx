import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import StatsCardGrid from '@/components/Dashboard/StatsCardGrid';
import TrafficChartCard from '@/components/Dashboard/TrafficChartCard';
import CircleProgressCard from '@/components/Dashboard/CircleProgressCard';
import TargetSectionCards from '@/components/Dashboard/TargetSectionCards';

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from '@/lib/utils';

import {
  Home,
  ChevronRight,
  Info,
  Printer,
  CalendarDays,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface SummaryStat {
  id: string;
  label: string;
  value: string;
  percentageChange: string;
  trend: 'up' | 'down';
  trendIsPositive: boolean; // True for green (positive/good change), false for red (negative/bad change)
}

const summaryStatsData: SummaryStat[] = [
  {
    id: 'income',
    label: 'Income',
    value: '$ 5,456',
    percentageChange: '+14%',
    trend: 'up' as const,
    trendIsPositive: true,
  },
  {
    id: 'expenses',
    label: 'Expenses',
    value: '$ 4,764',
    percentageChange: '8%', // Image shows no +/- sign, but red color and up arrow
    trend: 'up' as const, // Image shows UP arrow
    trendIsPositive: false, // Image shows RED text and RED arrow
  },
  {
    id: 'spendings',
    label: 'Spendings',
    value: '$ 1.5M',
    percentageChange: '15%', // Image shows no +/- sign, but green color and down arrow
    trend: 'down' as const, // Image shows DOWN arrow
    trendIsPositive: true, // Image shows GREEN text and GREEN arrow
  },
  {
    id: 'totals',
    label: 'Totals',
    value: '$ 31,564',
    percentageChange: '+76%',
    trend: 'up' as const,
    trendIsPositive: true,
  },
];

const SummaryStatItem: React.FC<SummaryStat> = ({ label, value, percentageChange, trend, trendIsPositive }) => {
  const TrendIcon = trend === 'up' ? ArrowUp : ArrowDown;
  const trendColorClass = trendIsPositive ? 'text-accentGreen' : 'text-destructive';

  return (
    <Card className="bg-card shadow-sm">
      <CardContent className="p-4">
        <div className="text-sm text-muted-foreground mb-1 whitespace-nowrap">{label}</div>
        <div className="text-2xl font-bold text-foreground mb-1 whitespace-nowrap">{value}</div>
        <div className={cn("flex items-center text-xs font-medium whitespace-nowrap", trendColorClass)}>
          <TrendIcon size={14} className="mr-1 flex-shrink-0" />
          <span>{percentageChange}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const IndexPage: React.FC = () => {
  return (
    <MainAppLayout className="gap-6">
      {/* Page Header */} 
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Minimal Dashboard</h1>
          <div className="flex items-center text-sm text-muted-foreground mt-1 flex-wrap">
            <Home size={14} className="mr-1.5 flex-shrink-0" />
            {/* Assuming react-router-dom Link would be used here for navigation */}
            <span className="hover:text-primary cursor-pointer">Dashboards</span>
            <ChevronRight size={14} className="mx-1 flex-shrink-0" />
            <span className="text-foreground font-medium">Minimal Dashboard Example</span>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-card whitespace-nowrap">
                <CalendarDays size={16} className="mr-2 text-muted-foreground" />
                Select period...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem>Today</DropdownMenuItem>
              <DropdownMenuItem>Last 7 Days</DropdownMenuItem>
              <DropdownMenuItem>Last 30 Days</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Custom Range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="icon" className="bg-card">
            <Printer size={18} className="text-muted-foreground" />
            <span className="sr-only">Print</span>
          </Button>
        </div>
      </div>

      {/* Info Alert */} 
      <Alert className="bg-primary/10 border-primary/20 dark:bg-primary/20 dark:border-primary/30">
        <Info className="h-5 w-5 text-primary flex-shrink-0" />
        <AlertTitle className="font-semibold text-primary">Information</AlertTitle>
        <AlertDescription className="text-primary/80 dark:text-primary/90">
          This dashboard example was created using only the available elements and components, no additional SCSS was written!
        </AlertDescription>
      </Alert>

      {/* Stats Card Grid */} 
      <StatsCardGrid />

      {/* Charts Section */} 
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficChartCard />
        </div>
        <div className="lg:col-span-1">
          <CircleProgressCard />
        </div>
      </div>
      
      {/* Summary Stats Row */} 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStatsData.map(stat => (
          <SummaryStatItem
            key={stat.id}
            id={stat.id}
            label={stat.label}
            value={stat.value}
            percentageChange={stat.percentageChange}
            trend={stat.trend}
            trendIsPositive={stat.trendIsPositive}
          />
        ))}
      </div>

      {/* Target Section Cards */} 
      <TargetSectionCards />

    </MainAppLayout>
  );
};

export default IndexPage;
