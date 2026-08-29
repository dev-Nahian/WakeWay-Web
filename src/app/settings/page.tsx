'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  User as UserIcon,
  Mail,
  Camera,
  Sliders,
  Bell,
  Sun,
  Moon,
  Laptop,
  Smartphone,
  QrCode,
  Lock,
  LogOut,
  Trash2,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  Navigation2,
  Save,
} from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  // Profile Form States
  const [fullName, setFullName] = useState(user?.fullName || 'Nahian Ahmed');
  const [email, setEmail] = useState(user?.email || 'nahian@wakeway.app');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Trip Defaults States
  const [defaultRadius, setDefaultRadius] = useState('500m');
  const [defaultAlertType, setDefaultAlertType] = useState('Sound + Vibration');
  const [defaultEarlyWarning, setDefaultEarlyWarning] = useState('1km');

  // Appearance Theme State
  const [themeMode, setThemeMode] = useState<'Light' | 'Dark' | 'System'>('Dark');

  // Destructive Modals States
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleConfirmLogout = () => {
    logout();
    router.push('/login');
  };

  const handleConfirmDeleteAccount = () => {
    logout();
    router.push('/register');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-card/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" asChild className="rounded-full">
              <Link href="/dashboard">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Navigation2 className="h-4 w-4 rotate-45" />
              </div>
              <span className="text-lg font-bold tracking-tight">Account & App Settings</span>
            </div>
          </div>

          <Button size="sm" onClick={handleSaveProfile} className="rounded-full font-semibold gap-1.5">
            <Save className="w-4 h-4" /> Save Settings
          </Button>
        </div>
      </header>

      {/* Main Settings Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-10">
        {/* Title Header */}
        <div className="border-b border-border/40 pb-4">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your personal profile, trip preferences, theme appearance, and paired mobile device.
          </p>
        </div>

        {savedSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* SECTION 1: PROFILE */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground px-1">
            Profile Information
          </h2>
          <Card className="rounded-3xl border-border/60 bg-card p-6 shadow-sm">
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group cursor-pointer">
                  <div className="w-20 h-20 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-xl border-2 border-primary">
                    {fullName ? fullName.substring(0, 2).toUpperCase() : 'US'}
                  </div>
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <Camera className="w-5 h-5" />
                  </div>
                </div>

                <div className="space-y-1 text-center sm:text-left">
                  <h3 className="font-bold text-base text-foreground">{fullName}</h3>
                  <p className="text-xs text-muted-foreground">{email}</p>
                  <p className="text-[11px] text-primary font-medium">Click avatar to update photo</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-primary" /> Full Name
                  </label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-11 rounded-2xl bg-secondary/40 border-border/80 text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-primary" /> Email Address
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-2xl bg-secondary/40 border-border/80 text-xs"
                  />
                </div>
              </div>
            </form>
          </Card>
        </section>

        {/* SECTION 2: TRIP DEFAULTS */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground px-1">
            Trip Defaults
          </h2>
          <Card className="rounded-3xl border-border/60 bg-card p-6 shadow-sm space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Default Alert Radius */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-primary" /> Default Alert Radius
                </label>
                <select
                  value={defaultRadius}
                  onChange={(e) => setDefaultRadius(e.target.value)}
                  className="w-full h-11 rounded-2xl bg-secondary/40 border border-border/80 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="100m">100 meters</option>
                  <option value="250m">250 meters</option>
                  <option value="500m">500 meters (Default)</option>
                  <option value="1km">1 kilometer</option>
                  <option value="2km">2 kilometers</option>
                </select>
              </div>

              {/* Default Alert Type */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-primary" /> Default Alert Type
                </label>
                <select
                  value={defaultAlertType}
                  onChange={(e) => setDefaultAlertType(e.target.value)}
                  className="w-full h-11 rounded-2xl bg-secondary/40 border border-border/80 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Sound + Vibration">Sound + Vibration</option>
                  <option value="Sound Only">Sound Only</option>
                  <option value="Vibration Only">Vibration Only</option>
                  <option value="Notification Only">Push Notification Only</option>
                </select>
              </div>

              {/* Default Early Warning */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Default Early Warning
                </label>
                <select
                  value={defaultEarlyWarning}
                  onChange={(e) => setDefaultEarlyWarning(e.target.value)}
                  className="w-full h-11 rounded-2xl bg-secondary/40 border border-border/80 px-3 text-xs font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Off">Off</option>
                  <option value="1km">1 km Pre-alert</option>
                  <option value="2km">2 km Pre-alert</option>
                </select>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 3: APPEARANCE */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground px-1">
            Appearance
          </h2>
          <Card className="rounded-3xl border-border/60 bg-card p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: 'Light', icon: Sun },
                { label: 'Dark', icon: Moon },
                { label: 'System', icon: Laptop },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = themeMode === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setThemeMode(item.label as any)}
                    className={`p-4 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary shadow-sm font-bold'
                        : 'border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </Card>
        </section>

        {/* SECTION 4: MOBILE APP */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground px-1">
            Mobile App Connection
          </h2>
          <Card className="rounded-3xl border-border/60 bg-card p-6 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-3 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Paired & Ready</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">WakeWay React Native Companion</h3>
                  <p className="text-xs text-muted-foreground mt-1 max-w-md">
                    Connect your smartphone to synchronize trip parameters and enjoy hardware-grade background destination monitoring.
                  </p>
                </div>
                <Button
                  onClick={() => (window.location.href = 'wakeway://connect')}
                  className="rounded-2xl font-bold text-xs shadow-md"
                >
                  <Smartphone className="w-4 h-4 mr-2" /> Open WakeWay Mobile App
                </Button>
              </div>

              {/* QR Code */}
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 text-center shadow-sm shrink-0">
                <QRCodeSVG value="wakeway://connect?paired=true" size={140} level="M" />
                <p className="text-[10px] text-zinc-600 font-bold mt-2">Scan QR code to pair device</p>
              </div>
            </div>
          </Card>
        </section>

        {/* SECTION 5: ACCOUNT */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground px-1">
            Account Management
          </h2>
          <Card className="rounded-3xl border-border/60 bg-card p-6 shadow-sm divide-y divide-border/40">
            {/* Change Password */}
            <div className="py-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <Lock className="w-4 h-4 text-primary" /> Password & Security
                </h4>
                <p className="text-xs text-muted-foreground">Update your login password regularly.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChangePasswordModal(true)}
                className="rounded-xl text-xs font-semibold"
              >
                Change Password
              </Button>
            </div>

            {/* Logout */}
            <div className="py-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <LogOut className="w-4 h-4 text-amber-500" /> Sign Out
                </h4>
                <p className="text-xs text-muted-foreground">Log out from your current web browser session.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowLogoutModal(true)}
                className="rounded-xl text-xs font-semibold text-amber-600 hover:bg-amber-500/10"
              >
                Log Out
              </Button>
            </div>

            {/* Delete Account */}
            <div className="py-4 flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-destructive flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete Account
                </h4>
                <p className="text-xs text-muted-foreground">Permanently delete your user data and trip history.</p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteAccountModal(true)}
                className="rounded-xl text-xs font-bold"
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </section>

        {/* SECTION 6: LEGAL */}
        <section className="space-y-4">
          <h2 className="text-xs uppercase tracking-widest font-extrabold text-muted-foreground px-1">
            Legal & Compliance
          </h2>
          <Card className="rounded-3xl border-border/60 bg-card p-4 shadow-sm flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="flex-1 p-3.5 rounded-2xl bg-secondary/40 hover:bg-secondary/70 transition-colors flex items-center justify-between text-xs font-bold text-foreground"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Privacy Policy
              </span>
              <span className="text-muted-foreground">→</span>
            </a>

            <a
              href="#"
              className="flex-1 p-3.5 rounded-2xl bg-secondary/40 hover:bg-secondary/70 transition-colors flex items-center justify-between text-xs font-bold text-foreground"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" /> Terms of Service
              </span>
              <span className="text-muted-foreground">→</span>
            </a>
          </Card>
        </section>
      </main>

      {/* CHANGE PASSWORD MODAL */}
      <AnimatePresence>
        {showChangePasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md rounded-3xl border border-border/80 bg-card p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-border/40 pb-3">
                <h3 className="font-bold text-base text-foreground">Change Password</h3>
                <Button variant="ghost" size="sm" onClick={() => setShowChangePasswordModal(false)}>✕</Button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setShowChangePasswordModal(false);
                  setSavedSuccess(true);
                  setTimeout(() => setSavedSuccess(false), 2000);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">Current Password</label>
                  <Input type="password" placeholder="••••••••" required className="h-10 rounded-xl text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-foreground">New Password</label>
                  <Input type="password" placeholder="At least 8 characters" required className="h-10 rounded-xl text-xs" />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button variant="outline" type="button" className="flex-1 rounded-2xl text-xs" onClick={() => setShowChangePasswordModal(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="flex-1 rounded-2xl text-xs font-bold">
                    Update Password
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LOGOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showLogoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl border border-border/80 bg-card p-6 shadow-2xl space-y-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
                <LogOut className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-foreground">Confirm Sign Out</h3>
                <p className="text-xs text-muted-foreground">Are you sure you want to log out from WakeWay?</p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 rounded-2xl text-xs" onClick={() => setShowLogoutModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleConfirmLogout} className="flex-1 rounded-2xl text-xs font-bold">
                  Sign Out
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DESTRUCTIVE DELETE ACCOUNT MODAL */}
      <AnimatePresence>
        {showDeleteAccountModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-sm rounded-3xl border border-destructive/30 bg-card p-6 shadow-2xl space-y-5 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-destructive/10 text-destructive mx-auto flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-bold text-base text-destructive">Permanently Delete Account?</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  This action is permanent and cannot be undone. All your saved destinations and trip history will be deleted.
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" className="flex-1 rounded-2xl text-xs" onClick={() => setShowDeleteAccountModal(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleConfirmDeleteAccount} className="flex-1 rounded-2xl text-xs font-bold">
                  Delete Permanently
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
