
import React from 'react';
import { Bell, User, Settings, LogOut } from 'lucide-react';
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
    
      {/* Row: Theme, Inbox, and Profile */}
      <div className="flex items-center gap-3 px-4">
        {/* Theme Selector */}
        <ThemeSelector />
        
        {/* Inbox Button */}
        <Button variant="outline" className="flex items-center gap-2 text-primary-foreground border-primary-foreground/30">
          <Bell className="w-4 h-4" />
          Inbox
        </Button>

        {/* Profile Section */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 px-3 py-2 border border-primary-foreground/20 rounded-lg cursor-pointer hover:bg-primary-foreground/10 transition-colors">
              <Avatar className="w-6 h-6">
                <AvatarImage src="" alt="Profile" />
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                  <User className="w-3 h-3" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-primary-foreground">Profile</span>
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
    </div>
  );
};
