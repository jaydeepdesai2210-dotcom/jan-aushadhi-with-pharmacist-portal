/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { FilterOptions } from '../utils/search';
import { Search, X, SlidersHorizontal, Check, Zap } from 'lucide-react';

interface SearchBarProps {
  filterOptions: FilterOptions;
  onChangeOptions: (newOptions: FilterOptions) => void;
  companies: string[];
  totalResults: number;
}

const POPULAR_SEARCHES = [
  'THYROXINE',
  'METFORMIN',
  'DOLO',
  'ATORVASTATIN',
  'VOGLIBOSE',
  'AZITHROMYCIN',
  'CEFIXIME',
  'BPPI Generic'
];

export const SearchBar: React.FC<SearchBarProps> = ({
  filterOptions,
  onChangeOptions,
  companies,
  totalResults
}) => {
  return (
    <div className="bg-slate-50 border-b border-slate-200 py-6 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Section Title */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Search className="w-5 h-5 text-[#087F5B]" strokeWidth={2.2} />
              <span>Find Your Medicine</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Search by Medicine name, Product name, Company, Packing, or Category across our verified PMBJP inventory.
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1.5 rounded-full border border-slate-200 shadow-2xs">
            Showing <strong className="text-[#087F5B]">{totalResults}</strong> medicines
          </span>
        </div>

        {/* Main Search Input */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-emerald-700 absolute left-3.5 top-3" />
            <input
              type="text"
              value={filterOptions.searchQuery}
              onChange={(e) =>
                onChangeOptions({ ...filterOptions, searchQuery: e.target.value })
              }
              placeholder="Search by Product Name (e.g. Thyroxine, Metformin, Dolo), Company, Packing, or Salt..."
              className="w-full bg-white pl-11 pr-10 py-2.5 rounded-xl border border-slate-300 text-sm shadow-xs focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-hidden"
            />
            {filterOptions.searchQuery && (
              <button
                onClick={() => onChangeOptions({ ...filterOptions, searchQuery: '' })}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Availability checkbox */}
            <label className="inline-flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-100 select-none shadow-2xs">
              <input
                type="checkbox"
                checked={filterOptions.availabilityOnly}
                onChange={(e) =>
                  onChangeOptions({ ...filterOptions, availabilityOnly: e.target.checked })
                }
                className="w-3.5 h-3.5 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
              />
              <span>In Stock Only</span>
            </label>

            {/* Rx Filter */}
            <select
              value={filterOptions.rxFilter}
              onChange={(e) =>
                onChangeOptions({
                  ...filterOptions,
                  rxFilter: e.target.value as any
                })
              }
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="ALL">All Items (Rx + OTC)</option>
              <option value="OTC_ONLY">Over-the-Counter (OTC)</option>
              <option value="RX_ONLY">Prescription Only (Rx)</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={filterOptions.sortBy}
              onChange={(e) =>
                onChangeOptions({
                  ...filterOptions,
                  sortBy: e.target.value as any
                })
              }
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
            >
              <option value="name-asc">Sort: Name (A to Z)</option>
              <option value="name-desc">Sort: Name (Z to A)</option>
              <option value="availability">Sort: Availability</option>
              <option value="price-asc">Sort: Price (Low to High)</option>
              <option value="price-desc">Sort: Price (High to Low)</option>
            </select>

            {/* Company Filter (optional) */}
            <select
              value={filterOptions.companyFilter}
              onChange={(e) =>
                onChangeOptions({
                  ...filterOptions,
                  companyFilter: e.target.value
                })
              }
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 shadow-2xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden max-w-[130px] truncate"
            >
              <option value="ALL">All Companies</option>
              {companies.map(c => (
                <option key={c} value={c}>{c === 'BPP' ? 'BPPI (Jan Aushadhi)' : c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Popular Searches & Count */}
        <div className="flex items-center justify-between flex-wrap gap-2 pt-1 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Quick Search:
            </span>
            {POPULAR_SEARCHES.map(term => (
              <button
                key={term}
                onClick={() => {
                  const query = term === 'BPPI Generic' ? 'BPP' : term;
                  onChangeOptions({ ...filterOptions, searchQuery: query });
                }}
                className={`px-2 py-0.5 rounded-md border text-[11px] font-medium transition ${
                  filterOptions.searchQuery.toLowerCase() === term.toLowerCase() ||
                  (term === 'BPPI Generic' && filterOptions.searchQuery === 'BPP')
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-300 font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {term}
              </button>
            ))}
          </div>

          <div className="text-slate-500 font-medium text-xs">
            Showing <strong className="text-slate-900 font-bold">{totalResults}</strong> matching medicines
          </div>
        </div>
      </div>
    </div>
  );
};
