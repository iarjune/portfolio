'use client';

import React from 'react';
import { RolePersona, SkillItem } from '@/lib/data';

interface SkillCategory {
  title: string;
  description: string;
  skills: SkillItem[];
}

interface SkillMatrixProps {
  skills: {
    cloud_k8s: SkillItem[];
    gitops_cicd: SkillItem[];
    data_ml_search: SkillItem[];
    devsecops_observability: SkillItem[];
    hardware_networking: SkillItem[];
  };
  activePersona: RolePersona;
}

const personaHighlightClass: Record<RolePersona, string> = {
  persona1: 'bg-blue-600/20 border-blue-500/50 text-blue-300 shadow-sm shadow-blue-500/10',
  persona2: 'bg-emerald-600/20 border-emerald-500/50 text-emerald-300 shadow-sm shadow-emerald-500/10',
  persona3: 'bg-purple-600/20 border-purple-500/50 text-purple-300 shadow-sm shadow-purple-500/10',
};

const defaultChipClass = 'bg-zinc-900 border-zinc-800 text-zinc-500';

const categoryMap: Record<string, { title: string; description: string }> = {
  cloud_k8s: {
    title: 'Cloud & K8s Platforms',
    description: 'Multi-cloud architectures, bare-metal clusters, and container orchestration.',
  },
  infrastructure_as_code: {
    title: 'IaC & Platform Automation',
    description: 'Automating entire infrastructure lifecycles from bare-metal provisioning to cloud-native deployments.',
  },
  gitops_cicd: {
    title: 'GitOps & CI/CD',
    description: 'Declarative infrastructure-as-code and automated canary delivery workflows.',
  },
  ai_developer_tooling: {
    title: 'AI Tooling & LLMOps',
    description: 'AI-Augmented development and MLOps integrations.',
  },
  scripting_devtools: {
    title: 'Scripting & Dev Tooling',
    description: 'Building tools for automation, AI-augmented coding, and secure development workflows.',
  },
  data_ml_search: {
    title: 'Data, MLOps & Vector Search',
    description: 'High-throughput real-time distributed data pipelines and AI retrieval engines.',
  },
  devsecops_observability: {
    title: 'DevSecOps, Identity & Observability',
    description: 'Zero-trust networks, telemetric telemetry tracing, and secrets management.',
  },
  hardware_networking: {
    title: 'Datacenter & Networking',
    description: 'Datacenter hardware engineering, low-latency switching, and edge networks.',
  },
};

export default function SkillMatrix({ skills, activePersona }: SkillMatrixProps) {
  const skillCategories: SkillCategory[] = Object.entries(skills).map(([key, skillList]) => {
    const meta = categoryMap[key] || { title: key, description: '' };
    return {
      title: meta.title,
      description: meta.description,
      skills: skillList,
    };
  });

  return (
    <section id="skills" className="py-16 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-white">Skills</h2>
          <p className="text-zinc-400 mt-2 text-base">
            Categorized skills across infrastructure architecture, platform engineering, and enterprise operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all hover:shadow-md"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{category.title}</h3>
                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const isHighlighted = skill.personas?.includes(activePersona) ?? false;
                    return (
                      <span
                        key={skill.name}
                        className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono border transition-all duration-300 ${isHighlighted
                          ? personaHighlightClass[activePersona]
                          : defaultChipClass
                          }`}
                      >
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
