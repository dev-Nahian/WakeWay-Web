'use client';

import Link from 'next/link';
import { Navigation2, Sparkles, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Navigation2 className="h-5 w-5 rotate-45" />
          </div>
          <span className="text-xl font-bold tracking-tight">WakeWay</span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#how-it-works" className="transition-colors hover:text-foreground">
            How It Works
          </a>
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <a href="#mobile-app" className="transition-colors hover:text-foreground">
            Mobile App
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild className="hidden sm:inline-flex">
            <a href="#mobile-app">
              <Smartphone className="mr-2 h-4 w-4" /> Get App
            </a>
          </Button>
          <Button size="sm" className="rounded-full px-5 shadow-sm">
            Plan a Trip
          </Button>
        </div>
      </div>
    </header>
  );
}
