"use client";

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Maximize2, Minimize2, ArrowUpRight } from 'lucide-react';
import { DeepDiveSection } from '@/lib/data';

interface DeepDiveProps {
    section: DeepDiveSection;
}

export default function DeepDive({ section }: DeepDiveProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

    const imageSrc = section.image
        ? section.image.startsWith('/')
            ? `${basePath}${section.image}`
            : `${basePath}/${section.image}`
        : null;

    return (
        <div className="space-y-3 bg-[#fbf8f3] p-5 rounded-xl border border-[#e7e0d3]">
            <h5 className="text-base font-semibold text-[#292524]">
                {section.title}
            </h5>

            {/* Optional Structured Image with In-Place Expand/Collapse */}
            {imageSrc && (
                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={`relative group rounded-lg overflow-hidden bg-[#fbf8f3] transition-all duration-300 cursor-pointer ${isExpanded ? 'p-2 border border-[#9a3412]/30 shadow-md bg-white' : ''
                        }`}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={imageSrc}
                        alt={section.title}
                        className={`w-full mx-auto transition-all duration-300 ${isExpanded ? 'max-h-[600px] object-contain' : 'max-h-[320px] object-contain p-2'
                            }`}
                    />
                    <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity bg-[#1c1917]/80 text-[#fbf8f3] text-xs px-2.5 py-1 rounded-md flex items-center gap-1.5 backdrop-blur-xs">
                        {isExpanded ? (
                            <>
                                <Minimize2 className="w-3.5 h-3.5" />
                                <span>Collapse</span>
                            </>
                        ) : (
                            <>
                                <Maximize2 className="w-3.5 h-3.5" />
                                <span>Expand</span>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Optional Markdown Content */}
            {section.content && (
                <div className="text-[#57534e] text-sm leading-relaxed space-y-3">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            a: ({ ...props }) => (
                                <a
                                    {...props}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#9a3412] font-medium underline underline-offset-2 hover:text-[#7c2d12] break-words"
                                />
                            ),
                            p: ({ ...props }) => <p {...props} className="leading-relaxed" />,
                            ul: ({ ...props }) => <ul {...props} className="list-disc pl-5 space-y-1" />,
                            ol: ({ ...props }) => <ol {...props} className="list-decimal pl-5 space-y-1" />,
                            code: ({ ...props }) => (
                                <code
                                    {...props}
                                    className="bg-[#f4ede2] text-[#292524] px-1.5 py-0.5 rounded font-mono text-xs"
                                />
                            ),
                        }}
                    >
                        {section.content}
                    </ReactMarkdown>
                </div>
            )}

            {/* Optional Structured Links */}
            {section.links && section.links.length > 0 && (
                <div className="pt-3 mt-1 border-t border-[#e7e0d3]/70 flex flex-wrap gap-2">
                    {section.links.map((link, idx) => (
                        <a
                            key={idx}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#9a3412] hover:text-[#7c2d12] bg-[#ffffff] hover:bg-[#f5efe6] border border-[#e7e0d3] hover:border-[#9a3412]/40 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                        >
                            <span>{link.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}