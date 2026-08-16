'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/admin');
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid credentials or unauthorized.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('A connection error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-slate-100 p-8 flex flex-col gap-6">
        
        <div className="text-center flex flex-col items-center gap-2 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-4 bg-slate-50/50 px-6 py-4 rounded-2xl border border-slate-100 mb-2">
            <Image
              src="/logo.png"
              alt="D-Anmol Enterprises Logo"
              width={64}
              height={64}
              className="h-16 w-auto object-contain transition-transform duration-500 hover:scale-105"
            />
            <div className="flex flex-col text-left border-l border-slate-200 pl-4 py-0.5">
              <span className="text-2xl font-black font-logo text-brand-orange-500 tracking-tight leading-none uppercase">
                D-ANMOL
              </span>
              <span className="text-[10px] font-extrabold font-logo text-brand-800 tracking-[0.25em] mt-2 leading-none uppercase">
                ENTERPRISES
              </span>
            </div>
          </div>
          <span className="text-[10px] text-brand-orange-600 font-black uppercase tracking-wider flex items-center gap-1.5">
            🚚 Goods Delivery & Logistics 🚚
          </span>
          <span className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-3">
            Admin Authentication
          </span>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-semibold p-3.5 rounded-lg flex items-start gap-2 animate-fadeIn">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-bold text-slate-700 uppercase">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@danmol.com"
              className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-bold text-slate-700 uppercase">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 py-3 bg-navy-950 hover:bg-slate-900 text-white rounded-lg font-bold text-sm transition-colors cursor-pointer disabled:bg-slate-400"
          >
            {isLoading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center text-xs text-slate-400 mt-2 border-t border-slate-100 pt-4">
          🔐 Secure Administrative Area
        </div>

      </div>
    </div>
  );
}
