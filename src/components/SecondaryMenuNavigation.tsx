import React from 'react';
import { Bell, Calendar, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from './ThemeSelector';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SecondaryMenuNavigationProps {
  setIsMenuOpen: (open: boolean) => void;
}

export const SecondaryMenuNavigation: React.FC<SecondaryMenuNavigationProps> = ({
  setIsMenuOpen
}) => {
  return (
    <div className="border-t border-primary-foreground/20 pt-6">
      <p className="text-xs font-semibold text-primary-foreground/70 mb-4 px-4">Actions</p>
      
      {/* Action buttons grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <Button className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 py-3">
          <Calendar className="w-4 h-4" />
          Live 2h
        </Button>
        <Button variant="outline" className="flex items-center gap-2 text-primary-foreground border-primary-foreground/30 py-3">
          <Bell className="w-4 h-4" />
          Inbox
        </Button>
      </div>

      {/* Theme Selector */}
      <div className="mb-4">
        <ThemeSelector />
      </div>

      {/* Profile Section */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-3 px-4 py-4 border border-primary-foreground/20 rounded-lg cursor-pointer hover:bg-primary-foreground/10 transition-colors">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                <User className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-primary-foreground">User Profile</p>
              <p className="text-xs text-primary-foreground/70">View settings</p>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
