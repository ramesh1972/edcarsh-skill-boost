
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
      {/* My Dashboard */}
      <Button variant="ghost" size="sm" asChild>
        <Link to="/dashboard" className="flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4" />
          <span className="hidden sm:inline">My Dashboard</span>
        </Link>
      </Button>

      {/* EdTools Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Wrench className="w-4 h-4" />
            <span className="hidden sm:inline">EdTools</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 bg-background border shadow-lg">
          <DropdownMenuItem>
            <Link to="/tools/editor" className="w-full">Course Editor</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/tools/quiz-builder" className="w-full">Quiz Builder</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/tools/analytics" className="w-full">Analytics</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/tools/reports" className="w-full">Reports</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Theme Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-background border shadow-lg p-2">
          <ThemeSelector />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Inbox */}
      <Button variant="ghost" size="sm" asChild>
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
