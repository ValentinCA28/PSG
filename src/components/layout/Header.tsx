'use client';

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Cloud, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { MobileSidebar } from "./MobileSidebar";

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/matches': 'Matches',
  '/profile': 'Profile',
  '/ecommerce': 'E-commerce',
  '/settings': 'Settings',
};

export function Header() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Dashboard';
  const { currentUser } = useAuth();
  const { userData } = useUserData();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const displayName = userData?.displayName || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';
  const initials = displayName
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || 'U';

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b bg-background px-4 sm:px-6">
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Weather/Temperature */}
        <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
          <Cloud className="h-4 w-4" />
          <span>18.5°C</span>
        </div>

        {/* User Profile */}
        {currentUser && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{displayName}</p>
              <p className="text-xs text-muted-foreground">{currentUser.email}</p>
            </div>
            <Avatar>
              <AvatarImage src={currentUser.photoURL || undefined} alt={displayName} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </header>
    <MobileSidebar open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </>
  );
}

