'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CareerData, RolePersona } from '@/lib/data';
import Image from 'next/image';

export interface HeroProps {
  careerData: CareerData;
  currentPersona: RolePersona;
  onPersonaChange: (persona: RolePersona) => void;
  resumeUrls: Record<RolePersona, string>;
  personaLabels?: Record<RolePersona, { title: string }>;
}

export const personaConfig: Record<
  RolePersona,
  {
    buttonLabel: string;
    title: string;
    subtitle: string;
    activeClass: string;
  }
> = {
  persona1: {
    buttonLabel: 'Lead Ops Engineer',
    title: 'Lead Ops Engineer',
    subtitle: 'Strategic Operations Leadership, Digital Transformation, and Platform Scale',
    activeClass: 'bg-blue-600 text-white shadow-lg shadow-blue-500/20',
  },
  persona2: {
    buttonLabel: 'Infrastructure / MLOps Engineer',
    title: 'Infrastructure / MLOps Engineer',
    subtitle: 'Architecting & Modernizing multi-cloud systems for max resiliency and efficiency.',
    activeClass: 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/20',
  },
  persona3: {
    buttonLabel: 'Platform Engineer',
    title: 'Platform Engineer',
    subtitle: 'Bridging Systems & Developer Autonomy to Drive High-Velocity Engineering for 20 Years',
    activeClass: 'bg-purple-600 text-white shadow-lg shadow-purple-500/20',
  },
};

export default function Hero({
  careerData,
  currentPersona,
  onPersonaChange,
  resumeUrls,
  personaLabels
}: HeroProps) {
  // Option to use custom label if passed via personaLabels
  const config = personaConfig[currentPersona];
  const displayTitle = personaLabels?.[currentPersona]?.title || config.title;

  const valueProp = careerData.basics.value_props?.[currentPersona] ||
    "Driving cloud-native transformation, scalable infrastructure, and high-performance platform engineering.";

  const currentResumeUrl = resumeUrls[currentPersona];

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  return (
    <section className="relative overflow-hidden pt-12 pb-16 border-b border-zinc-800 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-mono mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{careerData.basics.status}</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-zinc-100">
              {careerData.basics.name}
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-emerald-400/90 tracking-tight">
              {careerData.basics.label}
            </h2>
            <p className="text-sm font-mono text-zinc-400">
              {careerData.basics.location}
            </p>

            <div className="pt-1 flex flex-row items-center gap-4">
              <a
                href="https://github.com/orgs/devops-end2end/repositories"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="inline-block opacity-80 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={`${basePath}/GitHub_Invertocat_White.svg`}
                  alt="GitHub"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </a>

              <a
                href="https://www.linkedin.com/in/ivan-arjune-37350519/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="inline-block opacity-80 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={`${basePath}/linkedin-social-media.png`}
                  alt="LinkedIn"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </a>
              <a
                href="https://calendly.com/iarjune/new-meeting/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Schedule a meeting"
                className="inline-block opacity-80 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={`${basePath}/icon-calendar-white.png`}
                  alt="Calendar"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </a>
              <a
                href="mailto:iarjune@gmail.com"
                aria-label="Send Email"
                className="inline-block opacity-80 hover:opacity-100 transition-opacity"
              >
                <Image
                  src={`${basePath}/mail-icon.png`}
                  alt="Send Email"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                />
              </a>
            </div>
          </div>

          <div className="w-60 h-32 sm:w-[480px] sm:h-[280px] flex-start items-start justify-start">
            <Image
              src={`${basePath}/artwork2.webp`}
              alt="Portfolio Graphic"
              width={480}
              height={280}
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Persona Switcher Tabs */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
            Select Perspective
          </div>
          <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-xl border border-zinc-800 bg-zinc-950/80 backdrop-blur">
            {(Object.keys(personaConfig) as RolePersona[]).map((key) => {
              const isActive = currentPersona === key;
              return (
                <button
                  key={key}
                  onClick={() => onPersonaChange(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                    ? personaConfig[key].activeClass
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    }`}
                >
                  [ {personaConfig[key].buttonLabel} ]
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Proposition with Framer Motion */}
        <motion.div
          key={currentPersona}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 max-w-4xl"
        >
          <span className="text-sm font-mono tracking-widest text-zinc-400 uppercase">
            {config.subtitle}
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            {displayTitle}
          </h3>
          <p
            className="text-lg sm:text-xl text-zinc-300 leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: valueProp }}
          />
        </motion.div>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-wrap items-center gap-4">
          {currentResumeUrl && (
            <a
              href={currentResumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
            >
              Download Tailored Resume
            </a>
          )}

          <a
            href="#case-studies"
            className="px-5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900/80 text-white hover:border-zinc-500 transition-colors font-medium"
          >
            View Architecture Cases
          </a>
          <a
            href="#experience"
            className="px-5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900/80 text-white hover:border-zinc-500 transition-colors font-medium"
          >
            View Experience
          </a>
          <a
            href="#skills"
            className="px-5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900/80 text-white hover:border-zinc-500 transition-colors font-medium"
          >
            View Skills
          </a>
          <a
            href="#topology"
            className="px-5 py-2.5 rounded-lg border border-zinc-700 bg-zinc-900/80 text-white hover:border-zinc-500 transition-colors font-medium"
          >
            View Systems
          </a>
        </div>
      </div>
    </section>
  );
}