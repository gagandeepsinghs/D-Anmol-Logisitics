'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import BookingTable, { Booking } from './BookingTable';

interface Stats {
  total: number;
  today: number;
  pending: number;
  completed: number;
  cab: number;
  tempo: number;
}

export default function AdminDashboardContent() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch stats and bookings in parallel
      const [statsRes, bookingsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/bookings'),
      ]);

      if (!statsRes.ok || !bookingsRes.ok) {
        if (statsRes.status === 401 || bookingsRes.status === 401) {
          router.push('/admin/login');
          return;
        }
        throw new Error('Failed to load dashboard data.');
      }

      const statsData = await statsRes.json();
      const bookingsData = await bookingsRes.json();

      setStats(statsData);
      setBookings(bookingsData);
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch dashboard data. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);
    return () => clearTimeout(timer);
  }, [fetchData]);

  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-650 border-red-600"></div>
        <p className="text-slate-500 font-bold text-sm">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bookings Manager</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Oversee transport operations, modify trip schedules, and dispatch cabs/tempos.</p>
        </div>
        <button
          onClick={fetchData}
          disabled={loading}
          type="button"
          className="px-4 py-2 border border-slate-350 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer outline-none focus:ring-1 focus:ring-slate-400"
        >
          <span>🔄</span> {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-sm font-semibold flex items-center gap-2">
          <span>⚠️</span> {error}
        </div>
      )}

      {/* Metrics Cards Grid */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {/* Card: Total */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Total Bookings</span>
            <span className="text-2xl font-black text-slate-900 leading-none">{stats.total}</span>
          </div>

          {/* Card: Today's */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Today&apos;s New</span>
            <span className="text-2xl font-black text-red-600 leading-none">{stats.today}</span>
          </div>

          {/* Card: Pending */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Pending Status</span>
            <span className="text-2xl font-black text-amber-600 leading-none">{stats.pending}</span>
          </div>

          {/* Card: Completed */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Completed</span>
            <span className="text-2xl font-black text-blue-600 leading-none">{stats.completed}</span>
          </div>

          {/* Card: Cabs */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Cab Rides 🚕</span>
            <span className="text-2xl font-black text-indigo-900 leading-none">{stats.cab}</span>
          </div>

          {/* Card: Tempos */}
          <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-xs flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-widest block">Tempo Cargo 🚚</span>
            <span className="text-2xl font-black text-slate-800 leading-none">{stats.tempo}</span>
          </div>
        </div>
      )}

      {/* Main Table Section */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-black text-slate-900 border-l-4 border-slate-900 pl-3">
          Detailed Bookings List
        </h2>
        <BookingTable initialBookings={bookings} onRefresh={fetchData} />
      </div>

    </div>
  );
}
