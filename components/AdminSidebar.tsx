'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/admin/logout', {
        method: 'POST',
      });
      if (response.ok) {
        router.push('/admin/login');
      } else {
        alert('Failed to log out. Please try again.');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Network error. Failed to log out.');
    }
  };

  const menuItems = [
    { label: 'Bookings Dashboard', icon: '📋', href: '/admin' },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-100 flex flex-col justify-between shrink-0 min-h-screen border-r border-slate-800">
      <div className="flex flex-col gap-8 p-6">
        
        <div className="flex flex-col border-b border-slate-800 pb-5 gap-3">
          <div className="flex items-center gap-3 group outline-none py-1">
            <Image
              src="/logo.png"
              alt="D-Anmol Enterprises Logo"
              width={42}
              height={42}
              className="h-10.5 w-auto object-contain bg-white p-0.5 rounded-md transition-transform duration-500 group-hover:scale-105"
            />
            <div className="flex flex-col justify-center border-l border-slate-800 pl-3 py-0.5">
              <span className="text-lg font-black font-logo text-brand-orange-500 tracking-tight leading-none uppercase">
                D-ANMOL
              </span>
              <span className="text-[9px] font-extrabold font-logo text-brand-300 tracking-[0.22em] mt-1.5 leading-none uppercase">
                ENTERPRISES
              </span>
            </div>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold bg-slate-950 px-2 py-0.5 rounded self-start">
            ADMIN PANEL
          </span>
        </div>

        {/* Menu Navigation */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-bold transition-all outline-none
                  ${
                    active
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Action Area */}
      <div className="p-6 border-t border-slate-800 bg-slate-950/40">
        <button
          onClick={handleLogout}
          type="button"
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-slate-800 hover:bg-red-650 hover:bg-red-600 hover:text-white rounded-lg text-sm font-bold transition-all cursor-pointer text-slate-300 outline-none focus:ring-1 focus:ring-red-400"
        >
          {/* Logout SVG Icon */}
          <svg
            className="h-5 w-5 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>
    </aside>
  );
}
