import React from 'react';
// import Link from 'next/link'; // Or react-router-dom
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  Users,
  FileText,
  Settings,
  ChevronDown,
  ChevronRight,
  Circle,
  GitFork,
  Table,
  PieChartIcon as PieChartLucide,
  CreditCard,
  Sparkles,
  MessageSquare,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
  children?: NavItem[];
  active?: boolean;
  defaultOpen?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const sidebarNavItems: NavGroup[] = [
  {
    title: 'MENU',
    items: [
      {
        href: '/dashboard',
        label: 'Dashboards',
        icon: LayoutDashboard,
        defaultOpen: true,
        children: [
          { href: '/dashboard/analytics', label: 'Analytics', icon: Circle, badge: 'New' },
          { href: '/dashboard/commerce', label: 'Commerce', icon: Circle },
          { href: '/dashboard/sales', label: 'Sales', icon: Circle },
          {
            href: '/dashboard/minimal',
            label: 'Minimal',
            icon: Circle,
            active: true,
            defaultOpen: true,
            children: [
              { href: '/dashboard/minimal/variation1', label: 'Variation 1', icon: GitFork, active: true },
              { href: '/dashboard/minimal/variation2', label: 'Variation 2', icon: GitFork },
            ],
          },
        ],
      },
      { href: '/dashboard/crm', label: 'CRM', icon: MessageSquare },
      {
        href: '/dashboard/pages',
        label: 'Pages',
        icon: FileText,
        children: [
          { href: '/dashboard/pages/profile', label: 'Profile', icon: Circle },
          { href: '/dashboard/pages/settings', label: 'Settings', icon: Circle },
        ],
      },
      {
        href: '/dashboard/applications',
        label: 'Applications',
        icon: Sparkles,
        children: [
          { href: '/dashboard/apps/calendar', label: 'Calendar', icon: Circle },
          { href: '/dashboard/apps/chat', label: 'Chat', icon: Circle },
        ],
      },
    ],
  },
  {
    title: 'UI COMPONENTS',
    items: [
      {
        href: '/ui/elements',
        label: 'Elements',
        icon: CreditCard,
        children: [
          { href: '/ui/elements/buttons', label: 'Buttons', icon: Circle },
          { href: '/ui/elements/alerts', label: 'Alerts', icon: Circle },
        ],
      },
      {
        href: '/ui/components',
        label: 'Components',
        icon: PieChartLucide,
        children: [
          { href: '/ui/components/cards', label: 'Cards', icon: Circle },
          { href: '/ui/components/modals', label: 'Modals', icon: Circle },
        ],
      },
      { href: '/ui/tables', label: 'Tables', icon: Table },
    ],
  },
  {
    title: 'DASHBOARD WIDGETS',
    items: [
      { href: '/widgets/chart-boxes-1', label: 'Chart Boxes 1', icon: BarChart3 },
      { href: '/widgets/chart-boxes-2', label: 'Chart Boxes 2', icon: BarChart3 },
      { href: '/widgets/chart-boxes-3', label: 'Chart Boxes 3', icon: BarChart3 },
      { href: '/widgets/profile-boxes', label: 'Profile Boxes', icon: Users },
    ],
  },
  {
    title: 'FORMS',
    items: [
      { href: '/forms/elements', label: 'Elements', icon: FileText },
      { href: '/forms/widgets', label: 'Widgets', icon: FileText, badge: 5 },
    ],
  },
  {
    title: 'CHARTS',
    items: [
      { href: '/charts/chartjs', label: 'ChartJS', icon: PieChartLucide },
      { href: '/charts/apex-charts', label: 'Apex Charts', icon: PieChartLucide },
      { href: '/charts/chart-sparklines', label: 'Chart Sparklines', icon: BarChart3 },
    ],
  },
];

interface NavLinkItemProps {
  item: NavItem;
  level?: number;
}

// Context to pass openItems and toggleItem down to NavLinkItem
interface SidebarContextValue {
  openItems: string[];
  toggleItem: (label: string) => void;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

const NavLinkItem: React.FC<NavLinkItemProps> = ({ item, level = 0 }) => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("NavLinkItem must be used within a SidebarContext.Provider");
  }
  const { openItems, toggleItem } = context;

  const Icon = item.icon;
  const isOpen = openItems.includes(item.label);
  const hasChildren = item.children && item.children.length > 0;
  const paddingLeftStyle = { paddingLeft: `${1 + level * 1}rem` };
  const isActive = item.active || (hasChildren && isOpen && item.children?.some(child => child.active));

  return (
    <li className="list-none">
      <div
        className={cn(
          "flex items-center justify-between p-2.5 rounded-md cursor-pointer text-sm",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground",
        )}
        style={paddingLeftStyle}
        onClick={() => {
          if (hasChildren) toggleItem(item.label);
          // else: navigation logic here (e.g., router.push(item.href))
        }}
        role="link"
        tabIndex={0}
        onKeyDown={(e: React.KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (hasChildren) toggleItem(item.label);
            // else: navigation logic here
          }
        }}
      >
        <div className="flex items-center">
          <Icon size={18} className="mr-3 flex-shrink-0" />
          <span className="font-medium">{item.label}</span>
        </div>
        <div className="flex items-center">
          {item.badge && (
            <Badge
              variant={isActive ? "default" : "secondary"}
              className={cn(
                "ml-2 h-5 text-xs px-1.5",
                isActive ? "bg-sidebar-primary-foreground text-sidebar-primary" : "bg-sidebar-accent-foreground text-sidebar-accent"
              )}
            >
              {item.badge}
            </Badge>
          )}
          {hasChildren && (isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
        </div>
      </div>
      {hasChildren && isOpen && (
        <ul className="mt-1 space-y-0.5">
          {item.children?.map(child => <NavLinkItem key={child.label} item={child} level={level + 1} />)}
        </ul>
      )}
    </li>
  );
};

const Sidebar: React.FC = () => {
  const initialOpenState = React.useMemo(() => 
    sidebarNavItems.reduce<string[]>((acc, group) => {
      group.items.forEach(item => {
        if (item.defaultOpen) acc.push(item.label);
        if (item.children) {
          item.children.forEach(child => {
            if (child.defaultOpen) acc.push(child.label);
          });
        }
      });
      return acc;
    }, []),
  []);

  const [openItems, setOpenItems] = React.useState<string[]>(initialOpenState);

  const toggleItem = React.useCallback((label: string) => {
    setOpenItems(prev =>
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  }, []);

  return (
    <SidebarContext.Provider value={{ openItems, toggleItem }}>
      <aside className={cn(
        "w-64 bg-sidebar text-sidebar-foreground h-screen fixed top-0 left-0 flex flex-col shadow-lg print:hidden"
      )}>
        <div className="h-[60px] flex items-center justify-start px-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-2 cursor-pointer" role="button" tabIndex={0} /* onClick should navigate to home */ >
            <Sparkles size={28} className="text-white" />
            <span className="text-xl font-bold text-white">Architect</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {sidebarNavItems.map((group) => (
            <div key={group.title} className="mb-2">
              <h3 className="px-3 py-2 text-xs font-semibold uppercase text-sidebar-foreground/60 tracking-wider">
                {group.title}
              </h3>
              <ul className="space-y-0.5">
                {group.items.map(item => <NavLinkItem key={item.label} item={item} />)}
              </ul>
            </div>
          ))}
        </nav>
        <div className="p-4 border-t border-sidebar-border mt-auto">
          <button className="flex items-center w-full p-3 rounded-md text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring">
            <Settings size={18} className="mr-3" />
            <span>Settings</span>
          </button>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
