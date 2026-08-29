'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Search,
  Calendar,
  Filter,
  MapPin,
  Clock,
  Navigation,
  BellRing,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Navigation2,
  CheckCircle2,
  XCircle,
  Radio,
  SlidersHorizontal,
} from 'lucide-react';

export interface HistoryTrip {
  id: string;
  destination: string;
  address: string;
  date: string;
  startTime: string;
  completionTime: string;
  duration: string;
  distanceKm: number;
  alertRadius: string;
  status: 'Completed' | 'Cancelled' | 'Active';
}

const mockHistoryTrips: HistoryTrip[] = [
  {
    id: 'trip_101',
    destination: 'Chattogram Railway Station',
    address: 'Station Road, Agrabad, Chattogram',
    date: '2026-08-28',
    startTime: '08:30 AM',
    completionTime: '01:15 PM',
    duration: '4h 45m',
    distanceKm: 242.5,
    alertRadius: '500 m',
    status: 'Active',
  },
  {
    id: 'trip_102',
    destination: "Cox's Bazar Sea Beach",
    address: 'Kolatoli Road, Cox’s Bazar',
    date: '2026-08-24',
    startTime: '06:00 AM',
    completionTime: '02:30 PM',
    duration: '8h 30m',
    distanceKm: 395.2,
    alertRadius: '1 km',
    status: 'Completed',
  },
  {
    id: 'trip_103',
    destination: 'Dhaka Hazrat Shahjalal Airport',
    address: 'Airport Road, Kurmitola, Dhaka',
    date: '2026-08-18',
    startTime: '04:15 PM',
    completionTime: '06:00 PM',
    duration: '1h 45m',
    distanceKm: 14.2,
    alertRadius: '250 m',
    status: 'Completed',
  },
  {
    id: 'trip_104',
    destination: 'Sylhet Central Bus Terminal',
    address: 'Kadamtali, Sylhet',
    date: '2026-08-10',
    startTime: '07:00 AM',
    completionTime: '12:10 PM',
    duration: '5h 10m',
    distanceKm: 238.1,
    alertRadius: '500 m',
    status: 'Completed',
  },
  {
    id: 'trip_105',
    destination: 'Rajshahi University Campus',
    address: 'Motihar, Rajshahi',
    date: '2026-08-02',
    startTime: '09:00 AM',
    completionTime: '02:00 PM',
    duration: '5h 00m',
    distanceKm: 254.0,
    alertRadius: '1 km',
    status: 'Cancelled',
  },
  {
    id: 'trip_106',
    destination: 'Khulna New Market Bus Stop',
    address: 'KDA Avenue, Khulna',
    date: '2026-07-25',
    startTime: '10:30 AM',
    completionTime: '04:45 PM',
    duration: '6h 15m',
    distanceKm: 270.8,
    alertRadius: '500 m',
    status: 'Completed',
  },
];

export default function TripHistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Completed' | 'Cancelled' | 'Active'>('All');
  const [dateFilter, setDateFilter] = useState<'All' | 'Last 7 Days' | 'Last 30 Days'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter Logic
  const filteredTrips = useMemo(() => {
    return mockHistoryTrips.filter((trip) => {
      const matchesSearch =
        trip.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trip.address.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All' || trip.status === statusFilter;

      let matchesDate = true;
      if (dateFilter === 'Last 7 Days') {
        const tripDate = new Date(trip.date).getTime();
        const sevenDaysAgo = new Date().getTime() - 7 * 24 * 60 * 60 * 1000;
        matchesDate = tripDate >= sevenDaysAgo;
      } else if (dateFilter === 'Last 30 Days') {
        const tripDate = new Date(trip.date).getTime();
        const thirtyDaysAgo = new Date().getTime() - 30 * 24 * 60 * 60 * 1000;
        matchesDate = tripDate >= thirtyDaysAgo;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [searchQuery, statusFilter, dateFilter]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredTrips.length / itemsPerPage) || 1;
  const paginatedTrips = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTrips.slice(start, start + itemsPerPage);
  }, [filteredTrips, currentPage]);

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
              <span className="text-lg font-bold tracking-tight">Trip History</span>
            </div>
          </div>

          <Button size="sm" asChild className="rounded-full font-semibold">
            <Link href="/plan-trip">+ Plan New Trip</Link>
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        {/* Title & Stats Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border/40 pb-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Your Past Journeys</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Review history, travel metrics, and configured destination alert settings.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center min-w-[100px]">
              <div className="text-muted-foreground font-medium">Total Trips</div>
              <div className="text-xl font-extrabold text-foreground font-mono mt-0.5">{mockHistoryTrips.length}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-card border border-border/60 shadow-sm text-center min-w-[100px]">
              <div className="text-muted-foreground font-medium">Distance</div>
              <div className="text-xl font-extrabold text-primary font-mono mt-0.5">
                {mockHistoryTrips.reduce((acc, t) => acc + t.distanceKm, 0).toFixed(0)} km
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <Card className="rounded-3xl border-border/60 bg-card p-4 sm:p-6 shadow-sm space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by destination or city address..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10 h-11 rounded-2xl bg-secondary/40 border-border/80 text-xs"
              />
            </div>

            {/* Status Filter */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/50 border border-border/40">
                {(['All', 'Active', 'Completed', 'Cancelled'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setStatusFilter(st);
                      setCurrentPage(1);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all ${
                      statusFilter === st
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Filter */}
            <div className="md:col-span-3">
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/50 border border-border/40">
                {(['All', 'Last 7 Days', 'Last 30 Days'] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDateFilter(d);
                      setCurrentPage(1);
                    }}
                    className={`flex-1 py-1.5 px-1.5 rounded-xl text-[10px] font-bold transition-all ${
                      dateFilter === d
                        ? 'bg-card text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Trips Table / List */}
        <Card className="rounded-3xl border-border/60 shadow-sm overflow-hidden bg-card">
          {paginatedTrips.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary text-muted-foreground mx-auto flex items-center justify-center">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-foreground">No trips found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                Try adjusting your search query or filter options to find the trip history record.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {paginatedTrips.map((trip) => (
                <div
                  key={trip.id}
                  onClick={() => router.push(`/trip/${trip.id}`)}
                  className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 hover:bg-secondary/30 transition-all cursor-pointer group"
                >
                  {/* Left: Destination & Info */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-1 group-hover:scale-105 transition-transform">
                      <MapPin className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                          {trip.destination}
                        </h3>
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            trip.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : trip.status === 'Completed'
                              ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
                              : 'bg-muted text-muted-foreground border-border'
                          }`}
                        >
                          {trip.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{trip.address}</p>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-primary" /> {trip.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-primary" /> {trip.startTime} - {trip.completionTime} ({trip.duration})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Metrics & Details Arrow */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 border-t lg:border-t-0 pt-3 lg:pt-0 border-border/40">
                    <div className="flex items-center gap-6 text-xs text-right font-mono">
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase font-sans font-bold">Distance</div>
                        <div className="font-bold text-foreground text-sm">{trip.distanceKm} km</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-muted-foreground uppercase font-sans font-bold">Radius</div>
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">{trip.alertRadius}</div>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-secondary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination Controls */}
          <div className="p-4 border-t border-border/40 bg-card flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-medium">
              Showing Page <span className="font-bold text-foreground">{currentPage}</span> of{' '}
              <span className="font-bold text-foreground">{totalPages}</span>
            </span>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="rounded-xl text-xs gap-1"
              >
                <ChevronLeft className="w-4 h-4" /> Prev
              </Button>

              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                className="rounded-xl text-xs gap-1"
              >
                Next <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
