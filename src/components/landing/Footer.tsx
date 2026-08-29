import Link from 'next/link';
import { Navigation2 } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-card py-12 text-sm text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-foreground font-bold text-lg">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Navigation2 className="h-4 w-4 rotate-45" />
              </div>
              <span>WakeWay</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Travel safety & destination monitoring web & mobile application.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-3">
            <div className="font-semibold text-foreground text-xs uppercase tracking-wider">Product</div>
            <ul className="space-y-2">
              <li>
                <Link href="/plan-trip" className="hover:text-foreground transition-colors">
                  Plan a Trip
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-foreground transition-colors">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-foreground transition-colors">
                  Features
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-3">
            <div className="font-semibold text-foreground text-xs uppercase tracking-wider">Apps & Legal</div>
            <ul className="space-y-2">
              <li>
                <a href="#mobile-app" className="hover:text-foreground transition-colors">
                  Mobile App
                </a>
              </li>
              <li>
                <Link href="/settings" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-3">
            <div className="font-semibold text-foreground text-xs uppercase tracking-wider">Support</div>
            <ul className="space-y-2">
              <li>
                <Link href="/dashboard" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/history" className="hover:text-foreground transition-colors">
                  Trip History
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© {new Date().getFullYear()} WakeWay Inc. All rights reserved.</p>
          <p>Designed with safety & precision in mind.</p>
        </div>
      </div>
    </footer>
  );
}
