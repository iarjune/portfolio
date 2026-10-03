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
    leadership_engineering_management: SkillItem[];
    infrastructure_cloud: SkillItem[];
    kubernetes_container_platforms: SkillItem[];
    infrastructure_as_code: SkillItem[];
    gitops_cicd_release: SkillItem[];
    mlops_ml_platform: SkillItem[];
    data_streaming_distributed_systems: SkillItem[];
    observability_reliability_devsecops: SkillItem[];
    ai_llm_developer_tooling: SkillItem[];
    networking_compute: SkillItem[];
    storage_data_center: SkillItem[];
    automation_scripting_api: SkillItem[];
    engineering_tools_collaboration: SkillItem[];
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
  leadership_engineering_management: {
    title: 'Engineering Leadership & Strategy',
    description:
      'Technical leadership, engineering strategy, architecture, modernization, delivery, and organizational transformation.',
  },

  infrastructure_cloud: {
    title: 'Cloud & Infrastructure Engineering',
    description:
      'Cloud architecture, hybrid infrastructure, compute platforms, and infrastructure modernization at scale.',
  },

  kubernetes_container_platforms: {
    title: 'Kubernetes & Container Platforms',
    description:
      'Kubernetes platform engineering, container orchestration, cluster lifecycle management, and cloud-native platforms.',
  },

  infrastructure_as_code: {
    title: 'Infrastructure as Code & Automation',
    description:
      'Declarative infrastructure, configuration management, provisioning, and automated infrastructure lifecycles.',
  },

  gitops_cicd_release: {
    title: 'GitOps, CI/CD & Release Engineering',
    description:
      'GitOps architectures, continuous delivery, workflow automation, progressive delivery, and release engineering.',
  },

  mlops_ml_platform: {
    title: 'MLOps & ML Platforms',
    description:
      'Machine learning infrastructure, model lifecycle automation, ML platforms, feature stores, and model delivery.',
  },

  data_streaming_distributed_systems: {
    title: 'Data, Streaming & Distributed Systems',
    description:
      'High-throughput distributed systems, streaming platforms, search, messaging, and large-scale data infrastructure.',
  },

  observability_reliability_devsecops: {
    title: 'Reliability, Observability & DevSecOps',
    description:
      'Observability, reliability engineering, security automation, policy enforcement, secrets management, and incident response.',
  },

  ai_llm_developer_tooling: {
    title: 'AI, LLM & Developer Tooling',
    description:
      'AI-assisted engineering, LLM integrations, developer tooling, centralized AI services, and secure AI workflows.',
  },

  networking_compute: {
    title: 'Networking & Compute Infrastructure',
    description:
      'Enterprise networking, routing, load balancing, virtualization, bare-metal compute, and datacenter infrastructure.',
  },

  storage_data_center: {
    title: 'Storage & Datacenter Infrastructure',
    description:
      'Enterprise storage, SAN/NAS, distributed storage, physical infrastructure, and large-scale datacenter operations.',
  },

  automation_scripting_api: {
    title: 'Automation, Scripting & APIs',
    description:
      'Infrastructure automation, Python and shell scripting, API integration, and engineering productivity tooling.',
  },

  engineering_tools_collaboration: {
    title: 'Engineering Tools & Collaboration',
    description:
      'Engineering collaboration, documentation, planning, and tools supporting technical delivery at scale.',
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
