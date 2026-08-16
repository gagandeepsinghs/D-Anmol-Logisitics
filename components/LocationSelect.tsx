'use client';

import React, { useState, useEffect, useRef } from 'react';
import { CITIES, HUBS, findHubById } from '@/lib/locations';

interface LocationSelectProps {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  customOptionLabel: string;
  id: string;
}

export default function LocationSelect({
  value,
  onChange,
  placeholder,
  customOptionLabel,
  id
}: LocationSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset search when opening/closing
  useEffect(() => {
    if (!isOpen) {
      setSearch('');
    }
  }, [isOpen]);

  // Find label of currently selected option
  const getSelectedLabel = () => {
    if (value === 'custom') return customOptionLabel;
    if (!value) return placeholder;
    const match = findHubById(value);
    if (match) {
      const cityName = CITIES.find(c => c.id === match.cityId)?.name || '';
      return `${match.hub.name} (${cityName})`;
    }
    return placeholder;
  };

  // Filter hubs based on search input
  const filteredCities = CITIES.map(city => {
    const cityHubs = HUBS[city.id] || [];
    const matchedHubs = cityHubs.filter(hub => 
      hub.name.toLowerCase().includes(search.toLowerCase()) ||
      city.name.toLowerCase().includes(search.toLowerCase())
    );
    return {
      ...city,
      hubs: matchedHubs
    };
  }).filter(city => city.hubs.length > 0);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={containerRef} id={`container-${id}`}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 bg-white transition-all outline-none text-sm text-left focus:border-navy-600 focus:ring-1 focus:ring-navy-600 cursor-pointer shadow-xs"
      >
        <span className="truncate">{getSelectedLabel()}</span>
        <span className="text-slate-400 shrink-0 ml-2">
          {isOpen ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl flex flex-col overflow-hidden max-h-80 animate-fadeIn">
          {/* Search Box */}
          <div className="p-2 border-b border-slate-100 bg-slate-50/80 sticky top-0 z-10">
            <input
              type="text"
              placeholder="🔍 Search hubs or cities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-800 placeholder-slate-400 outline-none text-xs focus:border-navy-600"
              autoFocus
            />
          </div>

          {/* List Options */}
          <div className="overflow-y-auto flex-1 max-h-60 py-1.5 text-sm">
            {/* Custom Entry Option */}
            <button
              type="button"
              onClick={() => handleSelect('custom')}
              className={`w-full text-left px-4 py-2 hover:bg-slate-50 font-bold border-b border-slate-100/50 flex items-center gap-1.5 transition-colors cursor-pointer
                ${value === 'custom' ? 'bg-navy-50/50 text-navy-800' : 'text-slate-700'}`}
            >
              {customOptionLabel}
            </button>

            {filteredCities.length > 0 ? (
              filteredCities.map(city => (
                <div key={city.id} className="flex flex-col">
                  {/* City Header */}
                  <span className="px-4 py-1.5 text-xs font-black text-slate-400 uppercase tracking-wider bg-slate-50/30">
                    {city.name}
                  </span>

                  {/* Hub Options */}
                  {city.hubs.map(hub => (
                    <button
                      key={hub.id}
                      type="button"
                      onClick={() => handleSelect(hub.id)}
                      className={`w-full text-left pl-6 pr-4 py-2 hover:bg-slate-50 transition-colors cursor-pointer truncate
                        ${value === hub.id ? 'bg-red-50 text-red-700 font-semibold' : 'text-slate-600'}`}
                    >
                      {hub.name}
                    </button>
                  ))}
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-xs text-slate-400 font-medium">
                No matching location found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
