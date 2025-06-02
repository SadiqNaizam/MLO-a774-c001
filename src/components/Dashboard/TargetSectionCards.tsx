import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Cog, Eye } from 'lucide-react'; // Using Cog for gear icon
import { cn } from '@/lib/utils';

interface TargetItem {
  id: string;
  titlePercentage: string;
  label: string;
  progressValue: number;
  progressColorClass: string; // e.g., "bg-red-500", should be a full Tailwind class
}

const targetData: TargetItem[] = [
  {
    id: 'income',
    titlePercentage: '71%',
    label: 'Income Target',
    progressValue: 71,
    progressColorClass: 'bg-red-500', // As per image
  },
  {
    id: 'expenses',
    titlePercentage: '54%',
    label: 'Expenses Target',
    progressValue: 54,
    progressColorClass: 'bg-green-500', // accentGreen could be #10B981, standard green-500 is close
  },
  {
    id: 'spendings',
    titlePercentage: '32%',
    label: 'Spendings Target',
    progressValue: 32,
    progressColorClass: 'bg-yellow-500', // accentYellow could be #F59E0B, standard yellow-500 is close
  },
  {
    id: 'totals',
    titlePercentage: '89%',
    label: 'Totals Target',
    progressValue: 89,
    progressColorClass: 'bg-blue-500', // primary color
  },
];

interface MiniTargetCardProps {
  item: TargetItem;
}

const MiniTargetCard: React.FC<MiniTargetCardProps> = ({ item }) => {
  return (
    // Each item is styled like a mini-card within the main card's content area
    <div className="bg-background dark:bg-card p-4 rounded-lg">
      <div className="text-2xl font-semibold text-foreground">{item.titlePercentage}</div>
      {/* For Shadcn Progress, color is customized by targeting its inner div */}
      <Progress value={item.progressValue} className={cn("h-1.5 my-2.5", `[&>div]:${item.progressColorClass}`)} />
      <p className="text-xs text-muted-foreground sm:text-sm">{item.label}</p>
    </div>
  );
};

const TargetSectionCards: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-semibold">Target Section</CardTitle>
        <div className="flex items-center space-x-1 sm:space-x-2">
            <Button variant="ghost" size="sm" className="h-8 px-2 sm:px-3 text-primary hover:text-primary/90 text-xs sm:text-sm">
                <Eye className="mr-1 h-3.5 w-3.5 sm:h-4 sm:w-4" />
                View Details
            </Button>
            <Button variant="outline" size="icon" className="h-8 w-8 border-accentYellow/50 text-accentYellow hover:bg-accentYellow/10 hover:text-accentYellow">
                <Cog className="h-4 w-4" />
            </Button>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-2">
        {targetData.map((item) => (
          <MiniTargetCard key={item.id} item={item} />
        ))}
      </CardContent>
    </Card>
  );
};

export default TargetSectionCards;
