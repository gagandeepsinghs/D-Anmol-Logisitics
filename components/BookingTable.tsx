'use client';

import React, { useState } from 'react';

export interface Booking {
  id: string;
  bookingNumber: string;
  serviceType: 'CAB' | 'TEMPO';
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  pickupLocation: string;
  dropLocation: string;
  vehicleType: string;
  bookingDate: string;
  bookingTime: string;
  passengers: number | null;
  goodsType: string | null;
  estimatedWeight: number | null;
  additionalRequirements: string | null;
  estimatedFare: number | null;
  status: 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
}

interface BookingTableProps {
  initialBookings: Booking[];
  onRefresh: () => void;
}

export default function BookingTable({ initialBookings, onRefresh }: BookingTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState<'ALL' | 'CAB' | 'TEMPO'>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Filter Bookings Client-Side for Instant UX
  const filteredBookings = initialBookings.filter((booking) => {
    // 1. Search term match
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      term === '' ||
      booking.bookingNumber.toLowerCase().includes(term) ||
      booking.customerName.toLowerCase().includes(term) ||
      booking.customerPhone.includes(term);

    // 2. Service type filter
    const matchesService = serviceFilter === 'ALL' || booking.serviceType === serviceFilter;

    // 3. Status filter
    const matchesStatus = statusFilter === 'ALL' || booking.status === statusFilter;

    // 4. Date filter (match YYYY-MM-DD)
    const bookingDateStr = new Date(booking.bookingDate).toISOString().split('T')[0];
    const matchesDate = dateFilter === '' || bookingDateStr === dateFilter;

    return matchesSearch && matchesService && matchesStatus && matchesDate;
  });

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        // Refresh statistics and list
        onRefresh();
        // If modal is open, update its state
        if (selectedBooking && selectedBooking.id === bookingId) {
          setSelectedBooking((prev) => prev ? { ...prev, status: newStatus as Booking['status'] } : null);
        }
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to update status.');
      }
    } catch (e) {
      console.error(e);
      alert('Error updating status.');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete/cancel this booking permanent record?')) return;
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSelectedBooking(null);
        onRefresh();
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to delete booking.');
      }
    } catch (e) {
      console.error(e);
      alert('Error deleting booking.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'CONFIRMED':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'ASSIGNED':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      case 'IN_PROGRESS':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'COMPLETED':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'CANCELLED':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const getVehicleLabel = (type: string) => {
    const labels: Record<string, string> = {
      hatchback: 'Hatchback',
      sedan: 'Sedan',
      suv: 'SUV',
      premium: 'Premium',
      tempo: 'Tempo Traveller',
      tata_ace: 'Tata Ace Gold',
      mahindra_supro: 'Mahindra Supro',
      pickup: 'Bolero Pickup',
      small_truck: 'Small Truck',
      medium_truck: 'Medium Truck',
    };
    return labels[type.toLowerCase()] || type;
  };

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* Search and Filters Bar */}
      <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Search */}
        <div className="flex flex-col gap-1.5 col-span-1 sm:col-span-2 lg:col-span-1">
          <label htmlFor="search" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Search</label>
          <div className="relative">
            <input
              type="text"
              id="search"
              placeholder="Search ID, Name or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 text-sm outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
            />
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 pointer-events-none">
              🔍
            </span>
          </div>
        </div>

        {/* Service Type */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="service-filter" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Service</label>
          <select
            id="service-filter"
            value={serviceFilter}
            onChange={(e) => setServiceFilter(e.target.value as 'ALL' | 'CAB' | 'TEMPO')}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm outline-none focus:border-navy-600"
          >
            <option value="ALL">All Services</option>
            <option value="CAB">Passenger Cab (🚕)</option>
            <option value="TEMPO">Tempo & Transport (🚚)</option>
          </select>
        </div>

        {/* Status */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="status-filter" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm outline-none focus:border-navy-600"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="ASSIGNED">Assigned</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="date-filter" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Travel / Required Date</label>
          <input
            type="date"
            id="date-filter"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm outline-none focus:border-navy-600"
          />
        </div>
      </div>

      {/* Bookings Table Wrapper */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="py-4 px-5">Booking ID</th>
                <th className="py-4 px-5">Customer</th>
                <th className="py-4 px-5">Service</th>
                <th className="py-4 px-5">Route (Pickup → Drop)</th>
                <th className="py-4 px-5">Schedule Date</th>
                <th className="py-4 px-5">Status</th>
                <th className="py-4 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                    No bookings found matching filters.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => {
                  const travDate = new Date(booking.bookingDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  });
                  return (
                    <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-5 font-mono font-bold text-slate-900">
                        {booking.bookingNumber}
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-col">
                          <span className="font-semibold text-slate-850">{booking.customerName}</span>
                          <span className="text-xs text-slate-400">+91 {booking.customerPhone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 font-bold">
                        {booking.serviceType === 'CAB' ? '🚕 Cab' : '🚚 Tempo'}
                      </td>
                      <td className="py-4 px-5 max-w-xs truncate">
                        <div className="flex flex-col gap-0.5 text-xs">
                          <span className="font-semibold text-slate-700 truncate">📍 {booking.pickupLocation}</span>
                          <span className="text-slate-400 truncate">🏁 {booking.dropLocation}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex flex-col">
                          <span className="font-semibold">{travDate}</span>
                          <span className="text-xs text-slate-400">{booking.bookingTime}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5">
                        <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-bold border ${getStatusStyle(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4 px-5 text-right flex justify-end gap-2 items-center h-full mt-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded text-xs transition-colors cursor-pointer"
                        >
                          View
                        </button>
                        <select
                          value={booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          disabled={isUpdating}
                          className="px-2 py-1 border border-slate-300 rounded text-xs text-slate-700 bg-white font-medium focus:ring-1 focus:ring-navy-600 outline-none"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="CONFIRMED">Confirm</option>
                          <option value="ASSIGNED">Assign</option>
                          <option value="IN_PROGRESS">In Progress</option>
                          <option value="COMPLETED">Complete</option>
                          <option value="CANCELLED">Cancel</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Detail Overlay Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-100 max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Booking details</span>
                <h3 className="text-lg font-black text-slate-900 font-mono">
                  {selectedBooking.bookingNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-slate-700 text-xl font-bold cursor-pointer outline-none"
              >
                ✕
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex flex-col gap-6 text-sm">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Customer Name</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.customerName}</p>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-400 uppercase">Mobile Number</span>
                  <p className="font-bold text-slate-800 mt-0.5">+91 {selectedBooking.customerPhone}</p>
                </div>
                {selectedBooking.customerEmail && (
                  <div className="col-span-2">
                    <span className="text-xs font-bold text-slate-400 uppercase">Email Address</span>
                    <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.customerEmail}</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1.5">Route & Schedule</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <span className="text-base">📍</span>
                    <p className="text-slate-700"><strong>Pickup:</strong> {selectedBooking.pickupLocation}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-base">🏁</span>
                    <p className="text-slate-700"><strong>Drop:</strong> {selectedBooking.dropLocation}</p>
                  </div>
                  <div className="flex items-start gap-2 mt-1 bg-slate-50 p-2.5 rounded border border-slate-100/50">
                    <span className="text-base">📅</span>
                    <p className="text-slate-700">
                      <strong>Scheduled for:</strong> {new Date(selectedBooking.bookingDate).toLocaleDateString('en-IN', {
                        weekday: 'short',
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })} at {selectedBooking.bookingTime}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1.5">Service Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Service Type</span>
                    <p className="font-bold text-slate-800 mt-0.5">
                      {selectedBooking.serviceType === 'CAB' ? '🚕 Cab Booking' : '🚚 Tempo Booking'}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Vehicle Type</span>
                    <p className="font-bold text-slate-800 mt-0.5">{getVehicleLabel(selectedBooking.vehicleType)}</p>
                  </div>
                  {selectedBooking.serviceType === 'CAB' ? (
                    selectedBooking.passengers && (
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase">Passengers</span>
                        <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.passengers} Pax</p>
                      </div>
                    )
                  ) : (
                    <>
                      {selectedBooking.goodsType && (
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase">Goods Type</span>
                          <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.goodsType}</p>
                        </div>
                      )}
                      {selectedBooking.estimatedWeight && (
                        <div>
                          <span className="text-xs font-bold text-slate-400 uppercase">Est. Weight</span>
                          <p className="font-bold text-slate-800 mt-0.5">{selectedBooking.estimatedWeight} kg</p>
                        </div>
                      )}
                    </>
                  )}
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase">Estimated Price</span>
                    <p className="font-extrabold text-navy-950 mt-0.5">
                      {selectedBooking.estimatedFare ? `₹${selectedBooking.estimatedFare}` : 'TBD (To Be Decided)'}
                    </p>
                  </div>
                </div>
              </div>

              {selectedBooking.additionalRequirements && (
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-100 pb-1.5">Requirements / Remarks</span>
                  <p className="text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-100 leading-relaxed italic">
                    &ldquo;{selectedBooking.additionalRequirements}&rdquo;
                  </p>
                </div>
              )}

              {/* Status Update Area in Modal */}
              <div className="border-t border-slate-100 pt-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-500 uppercase">Update Status:</span>
                  <select
                    value={selectedBooking.status}
                    onChange={(e) => handleStatusChange(selectedBooking.id, e.target.value)}
                    disabled={isUpdating}
                    className="px-3 py-1.5 border border-slate-300 rounded-lg text-sm text-slate-700 bg-white font-bold outline-none focus:ring-1 focus:ring-navy-600"
                  >
                    <option value="PENDING">Pending</option>
                    <option value="CONFIRMED">Confirmed</option>
                    <option value="ASSIGNED">Assigned</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="CANCELLED">Cancelled</option>
                  </select>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => handleDelete(selectedBooking.id)}
                    disabled={isUpdating}
                    className="flex-1 sm:flex-none px-4 py-2 border border-red-200 hover:bg-red-50 text-red-600 font-bold rounded-lg text-xs transition-colors cursor-pointer text-center"
                  >
                    Delete Booking
                  </button>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer text-center"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
