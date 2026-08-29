'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import {
  Navigation2,
  Map,
  History,
  Settings,
  LogOut,
  Bell,
  User as UserIcon,
  Smartphone,
  ChevronDown,
  Sparkles,
  Compass,
} from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const navItems = [
    { label: 'Dashboard', href: '/dashboard', icon: Map },
    { label: 'Trip History', href: '/dashboard/history', icon: History },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-primary selection:text-primary-foreground">
        {/* Desktop Sidebar */}
        <aside className="w-64 border-r border-border/60 bg-card flex-col hidden md:flex">
          <div className="h-16 flex items-center px-6 border-b border-border/40 justify-between">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <Navigation2 className="w-5 h-5 rotate-45" />
              </div>
              <span className="tracking-tight text-foreground">WakeWay</span>
            </Link>
          </div>

          <div className="px-4 py-3">
            <div className="px-3 py-2 rounded-xl bg-secondary/50 border border-border/40 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5 font-medium">
                <Smartphone className="w-3.5 h-3.5 text-emerald-500" /> App Paired
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3.5 py-2.5 text-sm font-medium rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:bg-secondary/70 hover:text-foreground'
                  }`}
                >
                  <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User Profile Footer in Sidebar */}
          <div className="p-4 border-t border-border/40 space-y-3">
            <div className="flex items-center space-x-3 px-2">
              <div className="w-9 h-9 rounded-full bg-secondary border border-border/60 text-foreground flex items-center justify-center font-bold text-xs shadow-sm">
                {user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'US'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">{user?.fullName || 'User'}</p>
                <p className="text-[11px] text-muted-foreground truncate">{user?.email}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log Out
            </Button>
          </div>
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden pb-16 md:pb-0">
          {/* Header */}
          <header className="h-16 border-b border-border/60 flex items-center justify-between px-4 sm:px-6 bg-card/80 backdrop-blur-md sticky top-0 z-30">
            {/* Logo for mobile */}
            <div className="flex items-center gap-2 md:hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Navigation2 className="w-4 h-4 rotate-45" />
              </div>
              <span className="font-bold text-base tracking-tight">WakeWay</span>
            </div>

            {/* Current Trip Status Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Mobile Sync: Active</span>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 ml-auto">
              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full text-muted-foreground hover:text-foreground relative"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary" />
                </Button>

                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-card border border-border/80 shadow-xl p-4 z-50 text-xs space-y-3">
                    <div className="flex items-center justify-between font-semibold border-b border-border/40 pb-2">
                      <span>Notifications</span>
                      <span className="text-[10px] text-muted-foreground">Mark all as read</span>
                    </div>
                    <div className="space-y-2">
                      <div className="p-2.5 rounded-xl bg-secondary/50 space-y-1">
                        <p className="font-medium text-foreground">Mobile App Connected</p>
                        <p className="text-[11px] text-muted-foreground">Your React Native app synchronized trip settings.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="rounded-full p-1 h-auto flex items-center gap-2 hover:bg-secondary/70"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs">
                    {user?.fullName ? user.fullName.substring(0, 2).toUpperCase() : 'US'}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border/80 shadow-xl p-2 z-50 text-xs space-y-1">
                    <div className="px-3 py-2 border-b border-border/40">
                      <p className="font-semibold text-foreground truncate">{user?.fullName || 'User'}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 rounded-xl text-destructive hover:bg-destructive/10 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-auto bg-background p-4 sm:p-6 md:p-8">{children}</main>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card/90 backdrop-blur-md border-t border-border/60 flex items-center justify-around px-4 z-40">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center gap-1 text-[11px] font-medium text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
