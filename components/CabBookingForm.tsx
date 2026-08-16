'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LocationInput from './LocationInput';
import { validateCabBooking } from '@/lib/validations';
import { calculateCabFare } from '@/lib/fare-calculator';
import { CITIES, HUBS, calculateRouteDistance, findHubById } from '@/lib/locations';
import RouteMap from './RouteMap';
import LocationSelect from './LocationSelect';

export default function CabBookingForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    pickupLocation: '',
    dropLocation: '',
    vehicleType: 'hatchback',
    bookingDate: '',
    bookingTime: '',
    passengers: '1',
    distanceKm: '',
    additionalRequirements: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimate, setEstimate] = useState<number | null | 'pending'>(null);

  // Predefined locations tracking
  const [pickupSelection, setPickupSelection] = useState('');
  const [isCustomPickup, setIsCustomPickup] = useState(false);

  const [dropSelection, setDropSelection] = useState('');
  const [isCustomDrop, setIsCustomDrop] = useState(false);

  // Look up coordinates and hub objects from selections
  const pickupHubData = pickupSelection && pickupSelection !== 'custom' ? findHubById(pickupSelection) : null;
  const dropHubData = dropSelection && dropSelection !== 'custom' ? findHubById(dropSelection) : null;

  const selectedPickupHubObj = pickupHubData?.hub || null;
  const selectedDropHubObj = dropHubData?.hub || null;

  // Automatically calculate route distance and fare estimate on hub changes
  useEffect(() => {
    if (pickupHubData && dropHubData) {
      const dist = calculateRouteDistance(
        pickupHubData.cityId,
        pickupHubData.hub.id,
        dropHubData.cityId,
        dropHubData.hub.id
      );
      if (dist > 0) {
        setFormData(prev => ({ ...prev, distanceKm: dist.toString() }));
        const computed = calculateCabFare(formData.vehicleType, dist);
        setEstimate(computed);
      } else {
        setFormData(prev => ({ ...prev, distanceKm: '' }));
        setEstimate(null);
      }
    }
  }, [pickupSelection, dropSelection, formData.vehicleType]);

  const handlePickupSelectionChange = (val: string) => {
    setPickupSelection(val);
    if (val === 'custom') {
      setIsCustomPickup(true);
      handleInputChange('pickupLocation', '');
    } else {
      setIsCustomPickup(false);
      const data = findHubById(val);
      if (data) {
        const cityName = CITIES.find(c => c.id === data.cityId)?.name;
        handleInputChange('pickupLocation', `${data.hub.name}, ${cityName}`);
      } else {
        handleInputChange('pickupLocation', '');
      }
    }
  };

  const handleDropSelectionChange = (val: string) => {
    setDropSelection(val);
    if (val === 'custom') {
      setIsCustomDrop(true);
      handleInputChange('dropLocation', '');
    } else {
      setIsCustomDrop(false);
      const data = findHubById(val);
      if (data) {
        const cityName = CITIES.find(c => c.id === data.cityId)?.name;
        handleInputChange('dropLocation', `${data.hub.name}, ${cityName}`);
      } else {
        handleInputChange('dropLocation', '');
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[field];
        return copy;
      });
    }
  };

  const handleGetEstimate = (e: React.MouseEvent) => {
    e.preventDefault();
    const validation = validateCabBooking(formData);
    if (!validation.success) {
      setErrors(validation.errors);
      setEstimate(null);
      // Scroll to the first error
      const firstErrorKey = Object.keys(validation.errors)[0];
      const element = document.getElementById(firstErrorKey);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const dist = parseFloat(formData.distanceKm);
    if (isNaN(dist) || dist <= 0) {
      setEstimate('pending'); // "Will be confirmed by team"
    } else {
      const computed = calculateCabFare(formData.vehicleType, dist);
      setEstimate(computed);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    const validation = validateCabBooking(formData);
    if (!validation.success) {
      setErrors(validation.errors);
      const firstErrorKey = Object.keys(validation.errors)[0];
      document.getElementById(firstErrorKey)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          serviceType: 'CAB',
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        if (errData.errors) {
          setErrors(errData.errors);
        } else {
          alert(errData.message || 'Something went wrong. Please try again.');
        }
        setIsSubmitting(false);
        return;
      }

      const booking = await response.json();
      // Redirect to confirmation page
      router.push(`/booking/confirm/${booking.bookingNumber}`);
    } catch (err) {
      console.error(err);
      alert('Network error. Failed to submit booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 sm:p-8 flex flex-col gap-6">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span className="text-2xl">🚕</span> Cab Booking Service
        </h3>
        <p className="text-xs text-slate-500 mt-1">Reliable rides for local and outstation trips.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="customerName" className="text-sm font-semibold text-slate-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="customerName"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            placeholder="Enter your full name"
            className={`px-4 py-2.5 rounded-lg border text-slate-800 placeholder-slate-400 bg-white transition-all outline-none text-sm
              ${errors.customerName ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-navy-600 focus:ring-1 focus:ring-navy-600'}`}
          />
          {errors.customerName && <span className="text-xs text-red-600 font-medium">{errors.customerName}</span>}
        </div>

        {/* Mobile */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="customerPhone" className="text-sm font-semibold text-slate-700">
            Mobile Number <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-medium">
              +91
            </span>
            <input
              type="tel"
              id="customerPhone"
              value={formData.customerPhone}
              onChange={(e) => handleInputChange('customerPhone', e.target.value)}
              placeholder="90416 87157"
              maxLength={10}
              className={`w-full pl-12 pr-4 py-2.5 rounded-lg border text-slate-800 placeholder-slate-400 bg-white transition-all outline-none text-sm
                ${errors.customerPhone ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-navy-600 focus:ring-1 focus:ring-navy-600'}`}
            />
          </div>
          {errors.customerPhone && <span className="text-xs text-red-600 font-medium">{errors.customerPhone}</span>}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="customerEmail" className="text-sm font-semibold text-slate-700">
            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            id="customerEmail"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            placeholder="example@email.com"
            className={`px-4 py-2.5 rounded-lg border text-slate-800 placeholder-slate-400 bg-white transition-all outline-none text-sm
              ${errors.customerEmail ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-navy-600 focus:ring-1 focus:ring-navy-600'}`}
          />
          {errors.customerEmail && <span className="text-xs text-red-600 font-medium">{errors.customerEmail}</span>}
        </div>

        {/* Predefined Hub / Custom Route Selectors */}
        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/55 p-5 rounded-xl border border-slate-200/50">
          {/* PICKUP */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-600"></span> Pickup Location (From)
            </h4>
            
            <div className="grid grid-cols-1 gap-3">
              <LocationSelect
                id="pickupSelection"
                value={pickupSelection}
                onChange={handlePickupSelectionChange}
                placeholder="-- Choose Pickup Location --"
                customOptionLabel="✍️ Enter Custom Address..."
              />

              {/* Text input for address if custom is selected */}
              {(isCustomPickup || pickupSelection === 'custom') && (
                <div className="animate-fadeIn">
                  <LocationInput
                    id="pickupLocation"
                    name="pickupLocation"
                    label="Enter Custom Pickup Address"
                    value={formData.pickupLocation}
                    onChange={(val) => handleInputChange('pickupLocation', val)}
                    placeholder="Enter pick-up address or landmark"
                    error={errors.pickupLocation}
                  />
                </div>
              )}
            </div>
          </div>

          {/* DROP */}
          <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-5 md:pt-0 md:pl-5">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-brand-orange-500"></span> Destination Location (To)
            </h4>
            
            <div className="grid grid-cols-1 gap-3">
              <LocationSelect
                id="dropSelection"
                value={dropSelection}
                onChange={handleDropSelectionChange}
                placeholder="-- Choose Drop Location --"
                customOptionLabel="✍️ Enter Custom Address..."
              />

              {/* Text input for address if custom is selected */}
              {(isCustomDrop || dropSelection === 'custom') && (
                <div className="animate-fadeIn">
                  <LocationInput
                    id="dropLocation"
                    name="dropLocation"
                    label="Enter Custom Drop Address"
                    value={formData.dropLocation}
                    onChange={(val) => handleInputChange('dropLocation', val)}
                    placeholder="Enter destination address or landmark"
                    error={errors.dropLocation}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Interactive Route Map */}
          <div className="md:col-span-2">
            <RouteMap
              pickupHub={selectedPickupHubObj}
              dropHub={selectedDropHubObj}
              distanceKm={formData.distanceKm ? parseFloat(formData.distanceKm) : null}
            />
          </div>
        </div>

        {/* Cab Type */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="vehicleType" className="text-sm font-semibold text-slate-700">
            Cab Type <span className="text-red-500">*</span>
          </label>
          <select
            id="vehicleType"
            value={formData.vehicleType}
            onChange={(e) => handleInputChange('vehicleType', e.target.value)}
            className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 bg-white transition-all outline-none text-sm focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
          >
            <optgroup label="Passenger Cars & Vans">
              <option value="hatchback">Hatchback (Alto, Nios, WagonR) - Economical</option>
              <option value="sedan">Sedan (Dzire, Aura, Etios) - Comfortable</option>
              <option value="suv">SUV (Ertiga, Innova) - Spacious</option>
              <option value="premium">Premium Sedan/SUV - Luxury</option>
              <option value="tempo">Tempo Traveller (12-20 Seater) - Group Travel</option>
            </optgroup>
            <optgroup label="Cargo Tempos & Pickups">
              <option value="mahindra_supro">Mahindra Supro - Cargo/Luggage Pickup</option>
              <option value="tata_ace">Tata Ace Gold - Cargo/Luggage Pickup</option>
              <option value="pickup">Bolero Pickup - Cargo/Luggage Pickup</option>
            </optgroup>
          </select>
          {errors.vehicleType && <span className="text-xs text-red-600 font-medium">{errors.vehicleType}</span>}
        </div>

        {/* Passengers */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="passengers" className="text-sm font-semibold text-slate-700">
            Number of Passengers <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="passengers"
            value={formData.passengers}
            onChange={(e) => handleInputChange('passengers', e.target.value)}
            min={1}
            max={26}
            className={`px-4 py-2.5 rounded-lg border text-slate-800 placeholder-slate-400 bg-white transition-all outline-none text-sm
              ${errors.passengers ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-navy-600 focus:ring-1 focus:ring-navy-600'}`}
          />
          {errors.passengers && <span className="text-xs text-red-600 font-medium">{errors.passengers}</span>}
          {['tata_ace', 'mahindra_supro', 'pickup'].includes(formData.vehicleType) && (
            <span className="text-xs text-amber-600 font-semibold mt-1 flex items-center gap-1">
              ⚠️ Note: Cargo Tempos only have cabin seating for up to 2 passengers.
            </span>
          )}
        </div>

        {/* Travel Date */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bookingDate" className="text-sm font-semibold text-slate-700">
            Travel Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="bookingDate"
            value={formData.bookingDate}
            onChange={(e) => handleInputChange('bookingDate', e.target.value)}
            className={`px-4 py-2.5 rounded-lg border text-slate-800 placeholder-slate-400 bg-white transition-all outline-none text-sm
              ${errors.bookingDate ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-navy-600 focus:ring-1 focus:ring-navy-600'}`}
          />
          {errors.bookingDate && <span className="text-xs text-red-600 font-medium">{errors.bookingDate}</span>}
        </div>

        {/* Travel Time */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="bookingTime" className="text-sm font-semibold text-slate-700">
            Travel Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            id="bookingTime"
            value={formData.bookingTime}
            onChange={(e) => handleInputChange('bookingTime', e.target.value)}
            className={`px-4 py-2.5 rounded-lg border text-slate-800 placeholder-slate-400 bg-white transition-all outline-none text-sm
              ${errors.bookingTime ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-slate-300 focus:border-navy-600 focus:ring-1 focus:ring-navy-600'}`}
          />
          {errors.bookingTime && <span className="text-xs text-red-600 font-medium">{errors.bookingTime}</span>}
        </div>

        {/* Optional Distance for Estimation */}
        <div className="flex flex-col gap-1.5 md:col-span-2 bg-slate-50 rounded-lg p-4 border border-slate-100">
          <div className="flex flex-col gap-1">
            <label htmlFor="distanceKm" className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
              <span>Estimated Distance (km)</span>
              <span className="text-xs font-normal text-slate-400">(Optional - for instant fare estimation)</span>
            </label>
            <p className="text-[11px] text-slate-500">Provide approximate distance if known, to get a pricing estimate.</p>
          </div>
          <input
            type="number"
            id="distanceKm"
            value={formData.distanceKm}
            onChange={(e) => handleInputChange('distanceKm', e.target.value)}
            placeholder="e.g. 25"
            min={1}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 bg-white outline-none text-sm focus:border-navy-600 focus:ring-1 focus:ring-navy-600 max-w-xs mt-2"
          />
        </div>

        {/* Requirements */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label htmlFor="additionalRequirements" className="text-sm font-semibold text-slate-700">
            Additional Requirements <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            id="additionalRequirements"
            rows={3}
            value={formData.additionalRequirements}
            onChange={(e) => handleInputChange('additionalRequirements', e.target.value)}
            placeholder="E.g. baby seat, carrier required, multiple pickups, specific route instructions..."
            className="px-4 py-2.5 rounded-lg border border-slate-300 text-slate-800 placeholder-slate-400 bg-white transition-all outline-none text-sm focus:border-navy-600 focus:ring-1 focus:ring-navy-600"
          ></textarea>
        </div>
      </div>

      {/* Fare Estimation Output */}
      {estimate !== null && (
        <div className="bg-navy-50 border border-navy-100 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h4 className="text-sm font-bold text-navy-950 uppercase tracking-wider">Fare Estimation</h4>
            <p className="text-xs text-slate-600 mt-0.5">Based on selected vehicle type and provided route details.</p>
          </div>
          <div className="text-right">
            {estimate === 'pending' ? (
              <span className="text-sm font-semibold text-navy-800 text-left sm:text-right block max-w-xs">
                Estimated fare will be confirmed by our team after reviewing your booking.
              </span>
            ) : (
              <div className="flex flex-col items-end">
                <span className="text-2xl font-black text-navy-900">₹{estimate}</span>
                <span className="text-[10px] text-slate-500 font-medium">*Excludes tolls, parking, state taxes (if applicable)</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-end border-t border-slate-100 pt-5 mt-2">
        <button
          type="button"
          onClick={handleGetEstimate}
          className="px-5 py-2.5 border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 rounded-lg text-sm font-bold cursor-pointer transition-colors outline-none focus:ring-2 focus:ring-slate-400"
        >
          Get Fare Estimate
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white rounded-lg text-sm font-bold cursor-pointer transition-colors shadow-md outline-none focus:ring-2 focus:ring-red-400"
        >
          {isSubmitting ? 'Submitting Request...' : 'Book Now'}
        </button>
      </div>
    </form>
  );
}
