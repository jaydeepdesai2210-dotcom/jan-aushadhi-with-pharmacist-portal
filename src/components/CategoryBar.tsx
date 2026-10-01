/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ProductCategory } from '../types/pharmacy';
import {
  Activity,
  Heart,
  Flame,
  Thermometer,
  Wind,
  ShieldPlus,
  Sparkles,
  Baby,
  Eye,
  Smile,
  Stethoscope,
  Cross,
  UserCheck,
  User,
  Layers
} from 'lucide-react';

interface CategoryBarProps {
  selectedCategory: ProductCategory | 'ALL';
  onSelectCategory: (category: ProductCategory | 'ALL') => void;
  categoryCounts: Record<string, number>;
}

interface CategoryConfig {
  id: ProductCategory | 'ALL';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryConfig[] = [
  { id: 'ALL', label: 'All Catalogue', icon: Layers },
  { id: 'Diabetes', label: 'Diabetes', icon: Activity },
  { id: 'Blood Pressure', label: 'Blood Pressure', icon: Activity },
  { id: 'Cardiac & Heart', label: 'Cardiac & Heart', icon: Heart },
  { id: 'Thyroid', label: 'Thyroid', icon: Activity },
  { id: 'Pain Relief', label: 'Pain Relief', icon: Flame },
  { id: 'Fever', label: 'Fever & Paracetamol', icon: Thermometer },
  { id: 'Cold & Cough', label: 'Cold & Cough', icon: Wind },
  { id: 'Respiratory', label: 'Respiratory & Inhalers', icon: Wind },
  { id: 'Gastro', label: 'Gastro & Acidity', icon: ShieldPlus },
  { id: 'Vitamins & Supplements', label: 'Vitamins & Supplements', icon: Sparkles },
  { id: 'Skin Care', label: 'Skin Care & Derma', icon: Sparkles },
  { id: 'Eye Care', label: 'Eye Care', icon: Eye },
  { id: 'ENT', label: 'ENT & Ear Care', icon: Eye },
  { id: 'Baby Care', label: 'Baby Care', icon: Baby },
  { id: 'Medical Devices', label: 'Medical Devices', icon: Stethoscope },
  { id: 'First Aid', label: 'First Aid & Surgical', icon: Cross },
  { id: "Women's Health", label: "Women's Health", icon: UserCheck },
  { id: "Men's Health", label: "Men's Health", icon: User },
  { id: 'Personal Care', label: 'Personal Care', icon: Smile },
  { id: 'OTC', label: 'OTC & Wellness', icon: Sparkles },
  { id: 'Other', label: 'Other Formulations', icon: Layers }
];

export const CategoryBar: React.FC<CategoryBarProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  return (
    <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 shadow-2xs">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map(({ id, label, icon: Icon }) => {
            const isSelected = selectedCategory === id;
            const count = categoryCounts[id] ?? 0;

            return (
              <button
                key={id}
                onClick={() => onSelectCategory(id)}
                className={`flex-shrink-0 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-xs ring-2 ring-emerald-600/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-200' : 'text-slate-500'}`} />
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-white text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
