
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, Settings, CreditCard, Key, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const ProfileDropdown: React.FC = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-3 py-2 h-auto border border-primary/30 hover:border-primary/60 transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg" alt="Profile" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background border-2 border-primary/40 shadow-lg">
        <DropdownMenuItem asChild className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-b border-border/20 last:border-b-0 transition-colors">
          <Link to="/profile" className="flex items-center gap-2 w-full">
            <User className="w-4 h-4" />
            View Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-b border-border/20 last:border-b-0 transition-colors">
          <Link to="/settings" className="flex items-center gap-2 w-full">
            <Settings className="w-4 h-4" />
            My Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-b border-border/20 last:border-b-0 transition-colors">
          <Link to="/payments" className="flex items-center gap-2 w-full">
            <CreditCard className="w-4 h-4" />
            My Payments
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground border-b border-border/20 last:border-b-0 transition-colors">
          <Link to="/change-password" className="flex items-center gap-2 w-full">
            <Key className="w-4 h-4" />
            Change Password
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground transition-colors">
          <Link to="/reset-link" className="flex items-center gap-2 w-full">
            <RotateCcw className="w-4 h-4" />
            Reset Link
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
