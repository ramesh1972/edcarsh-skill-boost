
import React from 'react';
import { Bell, User, Settings, LogOut, Palette, Mail, Archive, Star, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeSelector } from './ThemeSelector';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface SecondaryMenuNavigationProps {
  setIsMenuOpen: (open: boolean) => void;
}

export const SecondaryMenuNavigation: React.FC<SecondaryMenuNavigationProps> = ({
  setIsMenuOpen
}) => {
  return (
    <div className="border-t border-primary-foreground/20">
      {/* Row: Theme, Inbox, and Profile */}
      <div className="flex items-center gap-3 px-4">
        {/* Theme Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 text-primary border-primary-foreground/30">
              <Palette className="w-4 h-4" />
              Theme
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Appearance</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2">
              <ThemeSelector />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* Inbox Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 text-primary border-primary-foreground/30">
              <Bell className="w-4 h-4" />
              Inbox
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-64">
            <DropdownMenuLabel>Notifications & Messages</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
              <Mail className="w-4 h-4 mr-2" />
              New Messages (3)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
              <Bell className="w-4 h-4 mr-2" />
              Notifications (5)
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
              <Star className="w-4 h-4 mr-2" />
              Important
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
              <Archive className="w-4 h-4 mr-2" />
              Archived
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsMenuOpen(false)}>
              <Trash2 className="w-4 h-4 mr-2" />
              Trash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile Dropdown */}
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
