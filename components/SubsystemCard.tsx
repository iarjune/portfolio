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
      className="border border-[#e7e0d3] rounded-xl p-5 hover:shadow-lg hover:border-[#9a3412]/40 cursor-pointer transition-all bg-[#ffffff] flex flex-col gap-3 group shadow-xs"
    >
      <div className="flex items-center justify-between">
        <LogoIcon logoKey={subsystem.logoKey} className="w-8 h-8 text-[#57534e] group-hover:text-[#9a3412] group-hover:scale-110 transition-transform" />
      </div>
      <div>
        <h3 className="font-semibold text-lg text-[#292524]">{subsystem.name}</h3>
        <p className="text-sm font-medium text-[#9a3412] mt-1">
          {subsystem.type}
        </p>
      </div>
      <p className="text-sm text-[#57534e] flex-1 line-clamp-3 leading-relaxed">
        {subsystem.description}
      </p>
      <div className="flex gap-2 mt-2 pt-4 border-t border-[#f4ede2]">
        {subsystem.techStackLogos.map((key) => (
          <LogoIcon key={key} logoKey={key} className="w-4 h-4 text-[#a8a29e]" />
        ))}
      </div>
    </div>
  );
}
