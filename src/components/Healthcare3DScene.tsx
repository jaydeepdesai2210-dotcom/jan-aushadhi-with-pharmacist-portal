/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ShieldCheck, Sparkles, Check, Heart, Activity } from 'lucide-react';

export const Healthcare3DScene: React.FC = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[380px] sm:h-[420px] md:h-[460px] flex items-center justify-center select-none"
      style={{ perspective: 1200 }}
    >
      {/* Soft Green Glowing Particle Orbs */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-72 h-72 rounded-full bg-[#087F5B]/30 blur-3xl -z-10 pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 7, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute w-60 h-60 rounded-full bg-[#B8F36B]/20 blur-2xl top-10 right-10 -z-10 pointer-events-none"
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-12, 12, -12],
            x: [i % 2 === 0 ? -8 : 8, i % 2 === 0 ? 8 : -8, i % 2 === 0 ? -8 : 8],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.7,
          }}
          className="absolute w-2.5 h-2.5 rounded-full bg-[#B8F36B] shadow-[0_0_12px_#B8F36B] pointer-events-none"
          style={{
            top: `${18 + (i * 14)}%`,
            left: `${15 + ((i * 15) % 70)}%`,
          }}
        />
      ))}

      {/* 3D Rotating Container */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-[420px] h-full flex items-center justify-center"
      >
        {/* ==================================================== */}
        {/* 1. MEDICAL SHIELD (Central anchor in 3D space)       */}
        {/* ==================================================== */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative z-10 w-44 h-56 rounded-3xl bg-linear-to-b from-white/95 via-emerald-50/90 to-emerald-100/90 border-2 border-emerald-400/60 shadow-[0_20px_45px_rgba(6,59,43,0.35)] backdrop-blur-md p-5 flex flex-col items-center justify-between"
          style={{ transform: 'translateZ(40px)' }}
        >
          {/* Glossy highlight */}
          <div className="absolute top-2 left-3 right-3 h-10 bg-linear-to-b from-white/80 to-transparent rounded-2xl pointer-events-none" />

          <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-[#087F5B] to-[#063B2B] flex items-center justify-center shadow-md border border-[#B8F36B]/40">
            <ShieldCheck className="w-7 h-7 text-[#B8F36B]" />
          </div>

          <div className="text-center space-y-1">
            <span className="text-[10px] font-extrabold tracking-widest text-[#087F5B] uppercase block">
              PMBJP VERIFIED
            </span>
            <h4 className="text-xs font-black text-[#063B2B] leading-tight">
              100% Quality Generics
            </h4>
            <div className="inline-flex items-center gap-1 text-[10px] text-emerald-800 font-bold bg-[#B8F36B]/40 px-2 py-0.5 rounded-full">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>NABL Lab Tested</span>
            </div>
          </div>

          <div className="w-full pt-2 border-t border-emerald-300/50 flex items-center justify-between text-[10px] text-emerald-950 font-semibold">
            <span>Adajan Kendra</span>
            <span className="font-mono text-[9px] bg-emerald-700 text-white px-1.5 py-0.5 rounded">GJ-0482</span>
          </div>
        </motion.div>

        {/* ==================================================== */}
        {/* 2. MEDICINE BOTTLE (Floating left in 3D)              */}
        {/* ==================================================== */}
        <motion.div
          animate={{ y: [-8, 8, -8], rotate: [-2, 3, -2] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
          className="absolute -left-2 sm:left-2 top-16 z-20 w-28 rounded-2xl bg-linear-to-b from-amber-500/90 to-amber-700/95 border border-amber-300/60 shadow-[0_15px_35px_rgba(217,119,6,0.35)] p-2.5 text-white flex flex-col items-center backdrop-blur-xs"
          style={{ transform: 'translateZ(70px)' }}
        >
          {/* Bottle White Cap */}
          <div className="w-14 h-4 rounded-t-md bg-white border border-slate-200 shadow-xs -mt-5 mb-1" />
          {/* Bottle Neck */}
          <div className="w-10 h-1.5 bg-amber-400/80 mb-1 rounded-xs" />

          {/* Bottle White Label */}
          <div className="w-full bg-white text-slate-900 rounded-lg p-1.5 text-center shadow-xs">
            <span className="text-[8px] font-bold text-emerald-700 uppercase tracking-wider block">
              Jan Aushadhi
            </span>
            <span className="text-[10px] font-black text-slate-900 block leading-tight">
              Tablets
            </span>
            <span className="text-[8px] font-semibold text-slate-500 block">
              WHO-GMP Quality
            </span>
          </div>
          <span className="text-[9px] font-mono text-amber-100 font-bold mt-1.5">
            50-90% OFF
          </span>
        </motion.div>

        {/* ==================================================== */}
        {/* 3. MEDICINE BOX (Floating bottom right in 3D)        */}
        {/* ==================================================== */}
        <motion.div
          animate={{ y: [6, -8, 6], rotate: [3, -2, 3] }}
          transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
          className="absolute -right-2 sm:right-2 bottom-12 z-20 w-36 rounded-2xl bg-white border-2 border-[#087F5B]/30 shadow-[0_18px_40px_rgba(6,59,43,0.25)] p-3 text-slate-900"
          style={{ transform: 'translateZ(85px)' }}
        >
          <div className="flex items-center justify-between pb-1 mb-1 border-b border-slate-100">
            <span className="text-[8px] font-extrabold text-[#087F5B] uppercase tracking-wider">
              Generic Pharma
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="font-extrabold text-xs text-[#063B2B] leading-tight">
            Paracetamol 650mg
          </div>
          <div className="text-[9px] text-slate-500 font-medium">
            Strip of 10 Tablets
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs font-black text-[#087F5B]">
              ₹12.00
            </span>
            <span className="text-[9px] line-through text-slate-400">
              ₹35.00
            </span>
          </div>
        </motion.div>

        {/* ==================================================== */}
        {/* 4. CAPSULES (Dual-Tone Floating 3D Pills)            */}
        {/* ==================================================== */}
        {/* Lime & Emerald Capsule Top Right */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [20, -15, 20],
          }}
          transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute right-6 top-8 z-30 w-16 h-7 rounded-full shadow-[0_10px_25px_rgba(8,127,91,0.3)] flex overflow-hidden border border-white/40 cursor-pointer"
          style={{ transform: 'translateZ(95px)' }}
        >
          <div className="w-1/2 h-full bg-[#B8F36B] flex items-center justify-center">
            <div className="w-full h-1 bg-white/60 blur-[0.5px] rounded-full mx-1" />
          </div>
          <div className="w-1/2 h-full bg-[#087F5B]" />
        </motion.div>

        {/* Amber & White Capsule Bottom Left */}
        <motion.div
          animate={{
            y: [8, -8, 8],
            rotate: [-35, -10, -35],
          }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
          className="absolute left-6 bottom-8 z-30 w-14 h-6 rounded-full shadow-[0_8px_20px_rgba(217,119,6,0.25)] flex overflow-hidden border border-white/50"
          style={{ transform: 'translateZ(60px)' }}
        >
          <div className="w-1/2 h-full bg-amber-500" />
          <div className="w-1/2 h-full bg-white" />
        </motion.div>

        {/* Floating Mini Activity Badge */}
        <motion.div
          animate={{ y: [-5, 5, -5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 z-25 bg-[#063B2B] text-white px-3 py-1.5 rounded-full border border-[#B8F36B]/40 shadow-lg flex items-center gap-1.5 text-[10px] font-bold"
          style={{ transform: 'translateZ(105px)' }}
        >
          <Sparkles className="w-3 h-3 text-[#B8F36B]" />
          <span>8,785+ Verified Products</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
