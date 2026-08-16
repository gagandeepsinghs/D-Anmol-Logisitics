import React from 'react';
import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/auth-session';
import AdminSidebar from '@/components/AdminSidebar';
import AdminDashboardContent from '@/components/AdminDashboardContent';

export default async function AdminDashboardPage() {
  // Check if session exists and is ADMIN, otherwise redirect immediately on server side
  const session = await getAdminSession();
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-100 w-full">
      {/* Sidebar Panel */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 sm:p-8 lg:p-10 overflow-x-hidden">
        <AdminDashboardContent />
      </div>
    </div>
  );
}
