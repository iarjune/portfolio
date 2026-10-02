'use client';

import React, { useState } from 'react';
import Hero, { personaConfig } from '@/components/Hero';
import { RolePersona, CareerData } from '@/lib/data';
import CareerTimeline from '@/components/CareerTimeline';
import SkillMatrix from '@/components/SkillMatrix';
import CommandPalette from '@/components/CommandPalette';
import CaseStudies from '@/components/CaseStudies';
import { getSystemTopology } from '@/lib/topology';
import TopologyViewer from '@/components/TopologyViewer';

interface HomeClientProps {
  careerData: CareerData;
  topologyData: ReturnType<typeof getSystemTopology>;
}

export default function HomeClient({ careerData, topologyData }: HomeClientProps) {
  const [activePersona, setActivePersona] = useState<RolePersona>('persona3');

  const personaLabels: Record<RolePersona, { title: string }> = {
    persona1: { title: personaConfig.persona1.title },
    persona2: { title: personaConfig.persona2.title },
    persona3: { title: personaConfig.persona3.title },
  };

  const formattedExperience = careerData.experience.map((item) => ({
    ...item,
    achievements: Array.isArray(item.achievements)
      ? item.achievements.map((ach) =>
        typeof ach === 'string'
          ? { title: item.roles?.[0] || item.company, story: ach }
          : ach
      )
      : [],
  }));

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <CommandPalette />

      <Hero
        careerData={careerData}
        currentPersona={activePersona}
        onPersonaChange={setActivePersona}
        personaLabels={personaLabels}
        resumeUrls={careerData.resumes}
      />

      <div id="case-studies">
        <CaseStudies caseStudies={careerData.case_studies} />
      </div>

      <CareerTimeline careerData={formattedExperience} />

      <SkillMatrix skills={careerData.skills} activePersona={activePersona} />

      <div id="topology" className="bg-black">
        <TopologyViewer data={topologyData} />
      </div>

      <footer className="border-t border-zinc-900 py-8 px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-zinc-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>Next.js Static Export (SSG) • Deployed via GitHub Actions</div>
        </div>
      </footer>
    </main>
  );
}