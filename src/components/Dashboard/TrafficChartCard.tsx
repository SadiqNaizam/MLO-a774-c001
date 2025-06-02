import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Settings, Download, Share2 } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, DotProps, TooltipProps } from 'recharts';
import { cn } from '@/lib/utils';

const trafficData = [
  { name: 'Jan 00', websiteBlog: 400, socialMedia: 24 }, // Adjusted to match image more closely
  { name: '02 Jan', websiteBlog: 520, socialMedia: 28 },
  { name: '03 Jan', websiteBlog: 420, socialMedia: 20 },
  { name: '04 Jan', websiteBlog: 680, socialMedia: 31 },
  { name: '05 Jan', websiteBlog: 210, socialMedia: 43 },
  { name: '06 Jan', websiteBlog: 450, socialMedia: 25 },
  { name: '07 Jan', websiteBlog: 180, socialMedia: 22 },
  { name: '08 Jan', websiteBlog: 380, socialMedia: 35 },
  { name: '09 Jan', websiteBlog: 780, socialMedia: 24 },
  { name: '10 Jan', websiteBlog: 320, socialMedia: 22 },
  { name: '11 Jan', websiteBlog: 190, socialMedia: 12 },
  { name: '12 Jan', websiteBlog: 120, socialMedia: 18 },
];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover/90 backdrop-blur-sm p-3 shadow-lg rounded-lg border border-border text-popover-foreground">
        <p className="label text-sm font-semibold mb-1">{`${label}`}</p>
        {payload.map((pld, index) => (
          <div key={index} className="flex items-center text-xs">
            <span style={{ backgroundColor: pld.color as string }} className="w-2 h-2 rounded-full mr-1.5"></span>
            <span>{`${pld.name}: ${pld.value}`}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Custom dot for the line chart with white border as in image
const CustomLineDot: React.FC<DotProps & {payload?: {name: string}}> = (props) => {
  const { cx, cy, stroke, payload } = props;
  // Only render dot for 'Social Media' line, matching image style
  if (payload && payload.name === 'Social Media' && typeof cx === 'number' && typeof cy === 'number') {
    return (
      <g>
        <circle cx={cx} cy={cy} r={5} fill="hsl(var(--card))" />
        <circle cx={cx} cy={cy} r={3} fill={stroke} />
      </g>
    );
  }
  return null; 
};

const TrafficChartCard: React.FC = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start sm:items-center justify-between pb-4">
        <div>
          <CardTitle className="text-lg font-semibold">Traffic Sources</CardTitle>
          {/* <CardDescription className="text-sm text-muted-foreground mt-0.5 hidden sm:block">Website blog and social media traffic.</CardDescription> */}
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="default" size="sm" className="h-8 px-3 bg-accentYellow text-yellow-900 hover:bg-accentYellow/90 focus-visible:ring-yellow-400">
            Actions
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download PNG
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download CSV
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share Report
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Chart Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={trafficData}
              margin={{
                top: 5,
                right: 5, 
                left: -25, 
                bottom: 20, // Space for legend
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="name" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} 
                padding={{ left: 10, right: 10 }}
                dy={10}
              />
              <YAxis 
                yAxisId="left" 
                orientation="left" 
                stroke="hsl(var(--muted-foreground))" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, (dataMax: number) => Math.max(dataMax + 50, 800)]} // ensure y axis goes up to 800 or more
                width={30}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke="hsl(var(--muted-foreground))" 
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                domain={[0, (dataMax: number) => Math.max(dataMax + 10, 50)]} // ensure y axis goes up to 50 or more
                width={30}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--secondary))' }} />
              <Legend
                verticalAlign="bottom"
                align="left"
                height={36}
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingLeft: '20px', paddingTop: '10px'}}
                formatter={(value, entry) => {
                    const color = entry.color;
                    return <span style={{ color: color }} className="text-xs ml-1">{value}</span>;
                }}
              />
              <Bar yAxisId="left" dataKey="websiteBlog" fill="hsl(var(--primary))" barSize={12} radius={[4, 4, 0, 0]} name="Website Blog" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="socialMedia" 
                strokeWidth={2} 
                stroke="#10B981" // accentGreen
                dot={<CustomLineDot />} 
                activeDot={{ r: 4, strokeWidth: 0, fill: "#10B981"}} 
                name="Social Media"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrafficChartCard;
