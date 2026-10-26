"use client";

import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Subsystem } from '@/types/topology';
import LogoIcon from './LogoIcon';

interface Props {
  subsystem: Subsystem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InspectorDrawer({ subsystem, isOpen, onClose }: Props) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-[#1c1917]/50 backdrop-blur-xs z-40 transition-opacity" />
        <Dialog.Content 
          className="fixed right-0 top-0 h-full w-full max-w-md bg-[#ffffff] p-6 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col gap-6 overflow-y-auto border-l border-[#e7e0d3] text-[#292524]"
          onInteractOutside={(e) => {
            // Optional: prevent closing if needed, or handle outside interaction
          }}
        >
          {subsystem && (
            <>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-[#f5efe6] rounded-lg border border-[#e2dacb]">
                    <LogoIcon logoKey={subsystem.logoKey} className="w-8 h-8 text-[#7c2d12]" />
                  </div>
                  <div>
                    <Dialog.Title className="text-xl font-bold text-[#292524]">
                      {subsystem.name}
                    </Dialog.Title>
                    <Dialog.Description className="text-sm font-medium text-[#9a3412]">
                      {subsystem.type}
                    </Dialog.Description>
                  </div>
                </div>
                <Dialog.Close asChild>
                  <button className="p-2 hover:bg-[#f5efe6] rounded-full transition-colors text-[#57534e]">
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="text-sm font-semibold text-[#292524] mb-2 uppercase tracking-wider">About</h4>
                  <p className="text-sm text-[#57534e] leading-relaxed">{subsystem.description}</p>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-[#292524] mb-3 uppercase tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {subsystem.techStackLogos.map((key) => (
                      <div key={key} className="flex items-center gap-2 bg-[#f5efe6] border border-[#e2dacb] px-3 py-1.5 rounded-full">
                        <LogoIcon logoKey={key} className="w-4 h-4 text-[#7c2d12]" />
                        <span className="text-xs font-medium text-[#44403c] capitalize">{key}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-[#292524] mb-3 uppercase tracking-wider">Components</h4>
                  <div className="space-y-3">
                    {subsystem.components.map((comp, i) => (
                      <div key={i} className="bg-[#fbf8f3] border border-[#e7e0d3] p-3 rounded-lg">
                        <h5 className="font-medium text-[#292524] text-sm">{comp.name}</h5>
                        <p className="text-xs text-[#57534e] mt-1 font-mono">{comp.spec}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-[#292524] mb-3 uppercase tracking-wider">Links</h4>
                  <div className="flex flex-col gap-2">
                    <a href={subsystem.repoUrl} target="_blank" rel="noreferrer" className="text-sm text-[#9a3412] font-medium hover:underline">
                      Repository URL
                    </a>
                    {subsystem.gitopsPath && (
                      <p className="text-sm text-[#57534e]">
                        GitOps Path: <code className="bg-[#f5efe6] border border-[#e2dacb] px-1.5 py-0.5 rounded text-xs text-[#7c2d12] font-mono">{subsystem.gitopsPath}</code>
                      </p>
                    )}
                  </div>
                </section>
              </div>
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
