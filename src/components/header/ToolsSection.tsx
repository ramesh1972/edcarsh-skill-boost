
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Wrench, Palette, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from '@/components/ThemeSelector';
import { ProfileDropdown } from './ProfileDropdown';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ToolsSection: React.FC = () => {
  return (
    <div className="flex items-center gap-2">
      {/* My Dashboard Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 border border-accent/30 hover:border-accent/60 transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">My Dashboard</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-background border-2 border-accent/40 shadow-lg">
          <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border-b border-border/20 last:border-b-0">
            <Link to="/dashboard/learning-path" className="w-full">My Learning Path</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border-b border-border/20 last:border-b-0">
            <Link to="/dashboard/performance" className="w-full">My Performance</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground border-b border-border/20 last:border-b-0">
            <Link to="/dashboard/analytics" className="w-full">My Analytics</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* EdTools Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 border border-primary/30 hover:border-primary/60 transition-colors">
            <Wrench className="w-4 h-4" />
            <span className="hidden sm:inline">EdTools</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-background border-2 border-primary/40 shadow-lg">
          <DropdownMenuItem asChild className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-b border-border/20 last:border-b-0">
            <Link to="/tools/editor" className="w-full">Course Editor</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-b border-border/20 last:border-b-0">
            <Link to="/tools/quiz-builder" className="w-full">Quiz Builder</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-b border-border/20 last:border-b-0">
            <Link to="/tools/analytics" className="w-full">Analytics</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-b border-border/20 last:border-b-0">
            <Link to="/tools/reports" className="w-full">Reports</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 border border-secondary/50 hover:border-secondary/80 transition-colors">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-background border-2 border-secondary/50 shadow-lg p-2">
          <ThemeSelector />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Inbox */}
      <Button variant="ghost" size="sm" asChild className="border border-muted/50 hover:border-muted transition-colors">
        <Link to="/inbox" className="flex items-center gap-2 relative">
          <Inbox className="w-4 h-4" />
          <span className="hidden sm:inline">Inbox</span>
          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full"></span>
        </Link>
      </Button>

      {/* Profile Dropdown */}
      <ProfileDropdown />
    </div>
  );
};
