import React from 'react';
// import Link from 'next/link'; // or from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  LayoutGrid,
  ChevronDown,
  CreditCard,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar'; // Import Sidebar for mobile sheet content

const Header: React.FC = () => {
  return (
    <header className={cn(
      "fixed top-0 left-0 md:left-64 right-0 h-[60px] z-10",
      "bg-card text-card-foreground",
      "flex items-center justify-between px-6 shadow-sm print:hidden"
    )}>
      <div className="flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden mr-2">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-sidebar text-sidebar-foreground border-r-0 md:hidden">
            <Sidebar />
          </SheetContent>
        </Sheet>

        <div className="relative hidden md:flex items-center">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
           <Input
            type="search"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 h-9 w-40 lg:w-64 focus:lg:w-72 transition-all duration-300 ease-in-out bg-background md:bg-card border-border focus:border-ring"
          />
        </div>

        <nav className="hidden lg:flex items-center space-x-1 ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                <LayoutGrid className="h-4 w-4 mr-1.5" />
                Mega Menu
                <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Applications</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">Calendar</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Contacts</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">File Manager</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                    <Settings className="h-4 w-4 mr-1.5" />
                    Settings
                    <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="cursor-pointer">Account Settings</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">UI Preferences</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Notification Settings</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                <CreditCard className="h-4 w-4 mr-1.5" />
                Projects
                <ChevronDown className="h-4 w-4 ml-1 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem className="cursor-pointer">Project Alpha</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Project Beta</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">View All Projects</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>

      <div className="flex items-center space-x-2 md:space-x-3">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
          <LayoutGrid className="h-5 w-5" />
          <span className="sr-only">Applications</span>
        </Button>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs bg-destructive text-destructive-foreground rounded-full">3</Badge>
                    <span className="sr-only">Notifications</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="px-2 py-1.5">Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-2 flex items-start space-x-2 cursor-pointer">
                    <Avatar className="h-8 w-8 mt-0.5">
                        <AvatarImage src="https://i.pravatar.cc/150?u=notifUser1" alt="User" />
                        <AvatarFallback>U1</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium leading-tight">New comment on your post</p>
                        <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                </DropdownMenuItem>
                 <DropdownMenuItem className="p-2 flex items-start space-x-2 cursor-pointer">
                    <div className="h-8 w-8 mt-0.5 bg-primary rounded-full flex items-center justify-center text-primary-foreground flex-shrink-0">
                        <Settings size={16}/>
                    </div>
                    <div>
                        <p className="text-sm font-medium leading-tight">System update available</p>
                        <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-center text-primary hover:!text-primary p-2 cursor-pointer">
                    View all notifications
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <div className="w-5 h-5 rounded-sm bg-muted flex items-center justify-center overflow-hidden">
                      <img src="https://flagcdn.com/de.svg" alt="German" className="w-full h-full object-cover" />
                    </div> 
                    <span className="sr-only">Change language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="p-2 cursor-pointer">
                    <img src="https://flagcdn.com/us.svg" alt="English" className="w-5 h-auto mr-2 rounded-sm" />
                    English (US)
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 cursor-pointer">
                     <img src="https://flagcdn.com/de.svg" alt="German" className="w-5 h-auto mr-2 rounded-sm" />
                    Deutsch
                </DropdownMenuItem>
                 <DropdownMenuItem className="p-2 cursor-pointer">
                    <img src="https://flagcdn.com/fr.svg" alt="French" className="w-5 h-auto mr-2 rounded-sm" />
                    Fran&ccedil;ais
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-1 rounded-md hover:bg-muted/50 h-auto">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://i.pravatar.cc/150?u=alina" alt="Alina Mclourd" />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-foreground leading-tight">Alina Mclourd</span>
                <span className="text-xs text-muted-foreground leading-tight">VP People Manager</span>
              </div>
               <ChevronDown className="h-4 w-4 text-muted-foreground opacity-70 hidden md:block ml-0.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="px-2 py-1.5">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-2 cursor-pointer">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="p-2 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
