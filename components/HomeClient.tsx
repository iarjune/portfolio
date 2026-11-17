'use client';

import React, { useState } from 'react';
import Hero, { personaConfig } from '@/components/Hero';
import { RolePersona, CareerData, StrategicDomain } from '@/lib/data';
import CareerTimeline from '@/components/CareerTimeline';
import SkillMatrix from '@/components/SkillMatrix';
import CommandPalette from '@/components/CommandPalette';
import CaseStudies from '@/components/CaseStudies';

interface HomeClientProps {
  careerData: CareerData;
  strategicDomains?: StrategicDomain[];
  skills?: CareerData['skills'];
}

export default function HomeClient({ careerData, strategicDomains, skills }: HomeClientProps) {
  const [activePersona, setActivePersona] = useState<RolePersona>('persona3');

  const personaLabels: Record<RolePersona, { title: string }> = {
    persona1: { title: personaConfig.persona1.title },
    persona2: { title: personaConfig.persona2.title },
    persona3: { title: personaConfig.persona3.title },
  };

  const formattedExperience = (careerData?.experience || []).map((item) => ({
    ...item,
    achievements: Array.isArray(item.achievements)
      ? item.achievements.map((ach) =>
        typeof ach === 'string'
          ? { title: item.roles?.[0] || item.company, story: ach }
          : ach
      )
      : [],
  }));

  const activeDomains = strategicDomains ?? careerData?.strategic_domains ?? [];
  const activeSkills = skills ?? careerData?.skills ?? ({} as CareerData['skills']);

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <CommandPalette />

      <Hero
        careerData={careerData}
        currentPersona={activePersona}
        onPersonaChange={setActivePersona}
        personaLabels={personaLabels}
        resumeUrls={careerData?.resumes || { persona1: '', persona2: '', persona3: '' }}
      />
      <div id="case-studies">
        <CaseStudies domains={activeDomains} />
      </div>
      <CareerTimeline careerData={formattedExperience} />

      <SkillMatrix skills={activeSkills} activePersona={activePersona} />

      <footer className="border-t border-[#e7e0d3] bg-[#f5efe6] py-8 px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-[#57534e]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>Next.js Static Export (SSG) • Deployed via GitHub Actions</div>
        </div>
      </footer>
    </main>
  );
}