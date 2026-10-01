/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface ShoppingBagIconProps {
  count: number;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

export const ShoppingBagIcon: React.FC<ShoppingBagIconProps> = ({
  count,
  onClick,
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  const [bounce, setBounce] = useState(false);

  // Trigger subtle bounce when count increases
  useEffect(() => {
    if (count > 0) {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 450);
      return () => clearTimeout(timer);
    }
  }, [count]);

  const dimensions = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center justify-center p-2 rounded-full text-[#087F5B] hover:text-[#063B2B] hover:bg-emerald-50/70 transition-colors cursor-pointer select-none group ${className}`}
      aria-label={`My Cart (${count} items)`}
      title="Open My Cart"
    >
      <motion.div
        animate={bounce ? { scale: [1, 1.2, 0.94, 1.08, 1], y: [0, -3, 1, -1, 0] } : { scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="relative flex items-center justify-center"
      >
        {/* Minimal clean green outline shopping bag */}
        <svg
          viewBox="0 0 24 24"
          className={`${dimensions[size]} stroke-[#087F5B] group-hover:stroke-[#063B2B] transition-colors`}
          fill="none"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Bag Body with rounded base */}
          <path d="M6 8 L18 8 L19 20 C19 20.6 18.5 21 18 21 L6 21 C5.5 21 5 20.6 5 20 L6 8 Z" />
          {/* Handle arch */}
          <path d="M9 9 V6 C9 4.34 10.34 3 12 3 C13.66 3 15 4.34 15 6 V9" />
        </svg>

        {/* Quantity Badge */}
        {count > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            key={count}
            className="absolute -top-1.5 -right-2 min-w-[18px] h-[18px] px-1 rounded-full bg-[#B8F36B] text-[#063B2B] font-extrabold text-[10px] flex items-center justify-center shadow-xs border border-[#087F5B]/30"
          >
            {count}
          </motion.span>
        )}
      </motion.div>

      {showLabel && (
        <span className="ml-1 text-xs font-bold text-[#063B2B]">
          Cart ({count})
        </span>
      )}
    </button>
  );
};
