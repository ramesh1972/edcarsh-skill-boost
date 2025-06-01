
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
      {/* Theme Menu - moved to first position */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 border border-secondary/50 hover:border-secondary/80 transition-colors">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64 bg-card/95 backdrop-blur-md border-2 border-secondary/60 shadow-xl p-2">
          <ThemeSelector />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* My Dashboard Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 border border-accent/30 hover:border-accent/60 transition-colors">
            <LayoutDashboard className="w-4 h-4" />
            <span className="hidden sm:inline">My Dashboard</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-md border-2 border-accent/60 shadow-xl">
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground border-b border-accent/30 last:border-b-0 transition-colors">
            <Link to="/dashboard/learning-path" className="w-full">My Learning Path</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground border-b border-accent/30 last:border-b-0 transition-colors">
            <Link to="/dashboard/performance" className="w-full">My Performance</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground border-b border-accent/30 last:border-b-0 transition-colors">
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
        <DropdownMenuContent align="end" className="w-60 bg-card/95 backdrop-blur-md border-2 border-primary/60 shadow-xl p-0">
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground border-b border-primary/30 last:border-b-0 transition-colors px-3 py-2">
            <Link to="/tools/classroom" className="w-full flex items-start">Your Classroom</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground border-b border-primary/30 last:border-b-0 transition-colors px-3 py-2">
            <Link to="/tools/truth-ai" className="w-full flex items-start">Truth AI</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground border-b border-primary/30 last:border-b-0 transition-colors px-3 py-2">
            <Link to="/tools/instructor-qa" className="w-full flex items-start">Instructor Q&A</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground border-b border-primary/30 last:border-b-0 transition-colors px-3 py-2">
            <Link to="/tools/community-discussion" className="w-full flex items-start">Community Discussion</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground border-b border-primary/30 last:border-b-0 transition-colors px-3 py-2">
            <Link to="/tools/calculators" className="w-full flex items-start">Calculators</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground border-b border-primary/30 last:border-b-0 transition-colors px-3 py-2">
            <Link to="/tools/guides" className="w-full flex items-start">Guides</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="hover:bg-card hover:text-card-foreground focus:bg-card focus:text-card-foreground transition-colors px-3 py-2">
            <Link to="/tools/articles" className="w-full flex items-start">Articles</Link>
          </DropdownMenuItem>
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
