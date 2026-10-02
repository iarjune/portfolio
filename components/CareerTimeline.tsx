'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export interface DetailedCategory {
  category: string;
  bullets: string[];
}

export interface AchievementGroup {
  title: string;
  story: string;
}

export interface CareerRole {
  company: string;
  roles: string[];
  image: string;
  tenure: string;
  location?: string;
  tags?: string[];
  summary?: string;
  achievements: AchievementGroup[];
  detailed_achievements?: DetailedCategory[];
}

interface CareerTimelineProps {
  careerData: CareerRole[];
}

export default function CareerTimeline({ careerData }: CareerTimelineProps) {
  // Track open state for both dropdowns across job cards
  const [openStories, setOpenStories] = useState<Record<number, boolean>>({ 0: true });
  const [openDetailed, setOpenDetailed] = useState<Record<number, boolean>>({});

  const toggleStories = (index: number) => {
    setOpenStories((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleDetailed = (index: number) => {
    setOpenDetailed((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section id="experience" className="py-16 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-white">Experience</h2>
          <p className="text-zinc-400 mt-2 text-base">
            Chronological leadership and architectural impact across diverse environments.
          </p>
        </div>

        {/* Timeline List */}
        <div className="relative border-l border-zinc-800 ml-4 md:ml-6 space-y-8">
          {careerData.map((job, idx) => {
            const isStoriesOpen = !!openStories[idx];
            const isDetailedOpen = !!openDetailed[idx];
            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

            return (
              <motion.div
                key={`${job.company}-${idx}`}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                className="relative pl-6 md:pl-8"
              >
                {/* Node marker */}
                <span className="absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-zinc-900 bg-blue-500" />

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-5 md:p-6 transition-colors hover:border-zinc-700">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className="flex-shrink-0 w-14 h-14 rounded-lg flex items-center justify-center p-2">
                        <Image
                          src={`${basePath}/${job.image}`}
                          alt={`${job.company} logo`}
                          width={50}
                          height={50}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{job.roles.join(' / ')}</h3>
                        <div className="text-blue-400 font-medium text-md mt-0.5">{job.company}</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono text-zinc-400 text-left sm:text-right">
                      <div>{job.tenure}</div>
                      {job.location && <div className="text-zinc-500">{job.location}</div>}
                    </div>
                  </div>

                  {job.summary && (
                    <p className="text-md text-zinc-300 mt-3 leading-relaxed">{job.summary}</p>
                  )}

                  {/* Technology & Focus Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {job.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded font-mono uppercase bg-zinc-900 text-zinc-300 border border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Dropdowns Container */}
                  <div className="mt-6 space-y-3 pt-4 border-t border-zinc-800/80">

                    {/* 1. Key Achievements & Architectural Stories Dropdown */}
                    {job.achievements && job.achievements.length > 0 && (
                      <div>
                        <button
                          onClick={() => toggleStories(idx)}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-left hover:border-zinc-700 transition-colors group"
                        >
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold group-hover:text-white">
                            Key Architectural & Leadership Stories
                          </span>
                          <span className="text-xs font-mono text-blue-400">
                            {isStoriesOpen ? 'Collapse Stories ▲' : 'Expand Stories ▼'}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isStoriesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden mt-3 space-y-3 pl-1"
                            >
                              {job.achievements.map((item, aIdx) => (
                                <div
                                  key={aIdx}
                                  className="rounded-lg bg-zinc-950/60 border border-zinc-800/60 p-4 space-y-2"
                                >
                                  <h5 className="text-md font-semibold text-blue-400 flex items-center gap-2">
                                    {item.title}
                                  </h5>
                                  <p className="text-md text-zinc-300 leading-relaxed pl-4">
                                    {item.story}
                                  </p>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                    {/* 2. Itemized Category Achievements Dropdown */}
                    {job.detailed_achievements && job.detailed_achievements.length > 0 && (
                      <div>
                        <button
                          onClick={() => toggleDetailed(idx)}
                          className="w-full flex items-center justify-between p-3 rounded-lg bg-zinc-900/80 border border-zinc-800 text-left hover:border-zinc-700 transition-colors group"
                        >
                          <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold group-hover:text-white">
                            View Itemized Achievements List
                          </span>
                          <span className="text-xs font-mono text-blue-400">
                            {isDetailedOpen ? 'Collapse List ▲' : 'Expand Category Bullets ▼'}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isDetailedOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden mt-3 space-y-3 pl-1"
                            >
                              {job.detailed_achievements.map((cat, cIdx) => (
                                <div
                                  key={cIdx}
                                  className="rounded-lg bg-zinc-950/60 border border-zinc-800/60 p-4 space-y-2"
                                >
                                  <h6 className="text-md font-mono uppercase font-semibold text-emerald-400 tracking-wider">
                                    {cat.category}
                                  </h6>
                                  <ul className="space-y-2 pt-1">
                                    {cat.bullets.map((bullet, bIdx) => (
                                      <li
                                        key={bIdx}
                                        className="text-sm text-zinc-300 flex items-start gap-2 leading-relaxed"
                                      >
                                        <span className="text-emerald-400 font-bold mt-0.5">•</span>
                                        <span>{bullet}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}