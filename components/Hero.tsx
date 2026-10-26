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
    activeClass: 'bg-[#9a3412] text-white shadow-md shadow-[#9a3412]/20',
  },
  persona2: {
    buttonLabel: 'Infrastructure / MLOps Engineer',
    title: 'Infrastructure / MLOps Engineer',
    subtitle: 'Architecting & Modernizing multi-cloud systems for max resiliency and efficiency.',
    activeClass: 'bg-[#b45309] text-white shadow-md shadow-[#b45309]/20',
  },
  persona3: {
    buttonLabel: 'Platform Engineer',
    title: 'Platform Engineer',
    subtitle: 'Bridging Systems & Developer Autonomy to Drive High-Velocity Engineering for 20 Years',
    activeClass: 'bg-[#15803d] text-white shadow-md shadow-[#15803d]/20',
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
    <section className="relative overflow-hidden pt-12 pb-16 border-b border-[#e7e0d3] bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Status Indicator */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#15803d]/30 bg-[#15803d]/10 text-[#166534] text-xs sm:text-sm font-mono mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#15803d] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#15803d]"></span>
          </span>
          <span>{careerData.basics.status}</span>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-10">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#292524]">
              {careerData.basics.name}
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-[#9a3412] tracking-tight">
              {careerData.basics.label}
            </h2>
            <p className="text-sm font-mono text-[#57534e]">
              {careerData.basics.location}
            </p>

            <div className="pt-2 flex flex-row items-center gap-3">
              <a
                href="https://github.com/orgs/devops-end2end/repositories"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2 rounded-lg bg-[#ffffff] border border-[#e7e0d3] hover:border-[#9a3412] hover:bg-[#f5efe6] shadow-xs transition-all"
              >
                <Image
                  src={`${basePath}/GitHub_Invertocat_White.svg`}
                  alt="GitHub"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain brightness-0"
                />
              </a>

              <a
                href="https://www.linkedin.com/in/ivan-arjune-37350519/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2 rounded-lg bg-[#ffffff] border border-[#e7e0d3] hover:border-[#9a3412] hover:bg-[#f5efe6] shadow-xs transition-all"
              >
                <Image
                  src={`${basePath}/linkedin-social-media.png`}
                  alt="LinkedIn"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </a>
              <a
                href="https://calendly.com/iarjune/new-meeting/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Schedule a meeting"
                className="p-2 rounded-lg bg-[#ffffff] border border-[#e7e0d3] hover:border-[#9a3412] hover:bg-[#f5efe6] shadow-xs transition-all"
              >
                <Image
                  src={`${basePath}/icon-calendar-white.png`}
                  alt="Calendar"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain brightness-0"
                />
              </a>
              <a
                href="mailto:iarjune@gmail.com"
                aria-label="Send Email"
                className="p-2 rounded-lg bg-[#ffffff] border border-[#e7e0d3] hover:border-[#9a3412] hover:bg-[#f5efe6] shadow-xs transition-all"
              >
                <Image
                  src={`${basePath}/mail-icon.png`}
                  alt="Send Email"
                  width={20}
                  height={20}
                  className="w-5 h-5 object-contain"
                />
              </a>
            </div>
          </div>

          <div className="w-60 h-32 sm:w-[480px] sm:h-[280px] flex-start items-start justify-start">
            <Image
              src={`${basePath}/hiking_selfie_sketch_portfolio.svg`}
              alt="Portfolio Graphic"
              width={480}
              height={280}
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
        </div>

        {/* Persona Switcher Tabs */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-[#78716c] mb-3">
            Select Perspective
          </div>
          <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-xl border border-[#e7e0d3] bg-[#ffffff] shadow-xs">
            {(Object.keys(personaConfig) as RolePersona[]).map((key) => {
              const isActive = currentPersona === key;
              return (
                <button
                  key={key}
                  onClick={() => onPersonaChange(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                    ? personaConfig[key].activeClass
                    : 'text-[#57534e] hover:text-[#292524] hover:bg-[#f5efe6]'
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
          <span className="text-sm font-mono tracking-widest text-[#b45309] uppercase font-semibold">
            {config.subtitle}
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#292524] leading-tight">
            {displayTitle}
          </h3>
          <p
            className="text-lg sm:text-xl text-[#57534e] leading-relaxed whitespace-pre-line"
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
              className="px-5 py-2.5 rounded-lg text-white font-semibold shadow-md transition-all bg-gradient-to-r from-[#7c2d12] to-[#9a3412] hover:from-[#9a3412] hover:to-[#c2410c] shadow-[#9a3412]/25 hover:shadow-lg hover:shadow-[#9a3412]/30"
            >
              Download Tailored Resume
            </a>
          )}

          <a
            href="#case-studies"
            className="px-5 py-2.5 rounded-lg border border-[#d7cec0] bg-[#ffffff] text-[#9a3412] hover:border-[#9a3412] hover:bg-[#9a3412]/5 transition-colors font-medium shadow-xs"
          >
            View Architecture Cases
          </a>
          <a
            href="#experience"
            className="px-5 py-2.5 rounded-lg border border-[#d7cec0] bg-[#ffffff] text-[#9a3412] hover:border-[#9a3412] hover:bg-[#9a3412]/5 transition-colors font-medium shadow-xs"
          >
            View Experience
          </a>
          <a
            href="#skills"
            className="px-5 py-2.5 rounded-lg border border-[#d7cec0] bg-[#ffffff] text-[#9a3412] hover:border-[#9a3412] hover:bg-[#9a3412]/5 transition-colors font-medium shadow-xs"
          >
            View Skills
          </a>
          <a
            href="#topology"
            className="px-5 py-2.5 rounded-lg border border-[#d7cec0] bg-[#ffffff] text-[#9a3412] hover:border-[#9a3412] hover:bg-[#9a3412]/5 transition-colors font-medium shadow-xs"
          >
            View Systems
          </a>
        </div>
      </div>
    </section>
  );
}