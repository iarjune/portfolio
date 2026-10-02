"use client";

import LogoIcon from './LogoIcon';
import { Subsystem } from '@/types/topology';

interface Props {
  subsystem: Subsystem;
  onClick: (subsystem: Subsystem) => void;
}

export default function SubsystemCard({ subsystem, onClick }: Props) {
  return (
    <div
      onClick={() => onClick(subsystem)}
      className="border border-zinc-800 rounded-xl p-5 hover:shadow-lg hover:border-zinc-700 cursor-pointer transition-all bg-zinc-900 flex flex-col gap-3 group"
    >
      <div className="flex items-center justify-between">
        <LogoIcon logoKey={subsystem.logoKey} className="w-8 h-8 text-zinc-300 group-hover:scale-110 transition-transform" />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-zinc-100">{subsystem.name}</h3>
        <p className="text-sm font-medium text-blue-400 mt-1">
          {subsystem.type}
        </p>
      </div>
      <p className="text-sm text-zinc-400 flex-1 line-clamp-3">
        {subsystem.description}
      </p>
      <div className="flex gap-2 mt-2 pt-4 border-t border-zinc-800">
        {subsystem.techStackLogos.map((key) => (
          <LogoIcon key={key} logoKey={key} className="w-4 h-4 text-zinc-500" />
        ))}
      </div>
    </div>
  );
}
