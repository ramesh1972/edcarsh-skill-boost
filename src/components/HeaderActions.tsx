
import React from 'react';
import { ChevronDown, Bell, Calendar, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from './ThemeSelector';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export const HeaderActions: React.FC = () => {
  return (
    <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
      {/* Theme Selector */}
      <ThemeSelector />

      {/* Live Session Button */}
      <Button size="sm" className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg font-semibold text-xs">
        <Calendar className="w-4 h-4" />
        Live Session in 2h
      </Button>

      {/* Inbox Button */}
      <Button variant="outline" size="sm" className="flex items-center gap-2 px-3 py-1.5 text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
        <Bell className="w-4 h-4" />
        Inbox
      </Button>

      {/* Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 px-2 py-2 text-primary-foreground hover:bg-primary-foreground/10">
            <Avatar className="w-6 h-6">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-xs">
                <User className="w-3 h-3" />
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
