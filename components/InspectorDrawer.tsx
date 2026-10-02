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
        <Dialog.Overlay className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity" />
        <Dialog.Content 
          className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 p-6 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col gap-6 overflow-y-auto border-l border-zinc-800"
          onInteractOutside={(e) => {
            // Optional: prevent closing if needed, or handle outside interaction
          }}
        >
          {subsystem && (
            <>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-zinc-900 rounded-lg border border-zinc-800">
                    <LogoIcon logoKey={subsystem.logoKey} className="w-8 h-8 text-zinc-300" />
                  </div>
                  <div>
                    <Dialog.Title className="text-xl font-bold text-zinc-100">
                      {subsystem.name}
                    </Dialog.Title>
                    <Dialog.Description className="text-sm font-medium text-blue-400">
                      {subsystem.type}
                    </Dialog.Description>
                  </div>
                </div>
                <Dialog.Close asChild>
                  <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
                    <X className="w-5 h-5 text-zinc-400" />
                  </button>
                </Dialog.Close>
              </div>

              <div className="space-y-6">
                <section>
                  <h4 className="text-sm font-semibold text-zinc-100 mb-2 uppercase tracking-wider">About</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed">{subsystem.description}</p>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-zinc-100 mb-3 uppercase tracking-wider">Tech Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {subsystem.techStackLogos.map((key) => (
                      <div key={key} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-full">
                        <LogoIcon logoKey={key} className="w-4 h-4 text-zinc-400" />
                        <span className="text-xs font-medium text-zinc-300 capitalize">{key}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-zinc-100 mb-3 uppercase tracking-wider">Components</h4>
                  <div className="space-y-3">
                    {subsystem.components.map((comp, i) => (
                      <div key={i} className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg">
                        <h5 className="font-medium text-zinc-100 text-sm">{comp.name}</h5>
                        <p className="text-xs text-zinc-400 mt-1">{comp.spec}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-sm font-semibold text-zinc-100 mb-3 uppercase tracking-wider">Links</h4>
                  <div className="flex flex-col gap-2">
                    <a href={subsystem.repoUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-400 hover:underline">
                      Repository URL
                    </a>
                    {subsystem.gitopsPath && (
                      <p className="text-sm text-zinc-400">
                        GitOps Path: <code className="bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded text-xs">{subsystem.gitopsPath}</code>
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
