"use client";

import { useState } from 'react';
import { TopologyData, Subsystem } from '@/types/topology';
import SubsystemCard from './SubsystemCard';
import InspectorDrawer from './InspectorDrawer';
import { GitBranch } from 'lucide-react'; // Can map string icons dynamically later if needed

interface Props {
  data: TopologyData;
}

export default function TopologyViewer({ data }: Props) {
  const [selectedSubsystem, setSelectedSubsystem] = useState<Subsystem | null>(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Builds</h1>
        <p className="text-zinc-400 mt-2">System designs</p>
      </div>

      {data.domains.map((domain) => (
        <section key={domain.id} className="space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <div className="p-2 bg-blue-900/30 rounded-lg text-blue-400">
              <GitBranch className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{domain.name}</h2>
              <p className="text-zinc-400 text-sm mt-1">{domain.summary}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {domain.subsystems.map((subsystem) => (
              <SubsystemCard
                key={subsystem.id}
                subsystem={subsystem}
                onClick={setSelectedSubsystem}
              />
            ))}
          </div>
        </section>
      ))}

      <InspectorDrawer
        subsystem={selectedSubsystem}
        isOpen={!!selectedSubsystem}
        onClose={() => setSelectedSubsystem(null)}
      />
    </div>
  );
}
