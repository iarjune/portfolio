"use client"
import * as React from "react"
import mermaid from "mermaid"
import { ArrowLeft, ChevronRight, Layers, ArrowUpRight } from "lucide-react"
import { StrategicDomain, CaseStudy } from "@/lib/data"
import { Subsystem } from "@/types/topology"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import SubsystemCard from "./SubsystemCard"
import InspectorDrawer from "./InspectorDrawer"

function MermaidDiagram({ chart, id }: { chart: string; id: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = React.useState<string>("");

  React.useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
        primaryColor: '#f5efe6',
        primaryTextColor: '#292524',
        primaryBorderColor: '#9a3412',
        lineColor: '#78716c',
        secondaryColor: '#fbf8f3',
        tertiaryColor: '#ffffff',
        mainBkg: '#ffffff',
        nodeBorder: '#9a3412',
        clusterBkg: '#f5efe6',
        clusterBorder: '#e7e0d3',
        titleColor: '#292524',
        edgeLabelBackground: '#fbf8f3'
      }
    });

    let isMounted = true;
    const renderId = `mermaid-${id}-${Math.random().toString(36).substring(2, 9)}`;

    mermaid.render(renderId, chart)
      .then((result) => {
        if (isMounted) {
          setSvgContent(result.svg);
        }
      })
      .catch((err) => {
        console.error("Mermaid render error:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [chart, id]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center items-center overflow-x-auto p-4 bg-[#ffffff] rounded-xl border border-[#e7e0d3] shadow-xs"
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

interface CaseStudiesProps {
  domains: StrategicDomain[];
}

export default function CaseStudies({ domains }: CaseStudiesProps) {
  const [selectedDomain, setSelectedDomain] = React.useState<StrategicDomain | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = React.useState<CaseStudy | null>(null);
  const [inspectedSubsystem, setInspectedSubsystem] = React.useState<Subsystem | null>(null);
  const [imageErrors, setImageErrors] = React.useState<Record<string, boolean>>({});

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const handleDomainClick = (domain: StrategicDomain) => {
    setSelectedDomain(domain);
    setSelectedCaseStudy(null);
  };

  const handleCloseDialog = (open: boolean) => {
    if (!open) {
      setSelectedDomain(null);
      setSelectedCaseStudy(null);
    }
  };

  const handleImageError = (domainId: string) => {
    setImageErrors((prev) => ({ ...prev, [domainId]: true }));
  };

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#292524]">Strategic Initiatives</h2>
        <p className="text-2xl mt-1 text-[#292524] font-medium">
          Transforming Infrastructure. Delivering Business Impact.
        </p>
        <p className="text-[#57534e] mt-1 text-base leading-relaxed">
          A selection of enterprise-scale initiatives focused on modernization, operational excellence, engineering enablement, and business value.
        </p>
      </div>

      {/* Domain Cards Grid (2-Column Layout matching design reference) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {domains.map((domain) => {
          const hasImageError = imageErrors[domain.id];
          const imageSrc = domain.image.startsWith('/')
            ? `${basePath}${domain.image}`
            : `${basePath}/${domain.image}`;

          return (
            <div
              key={domain.id}
              onClick={() => handleDomainClick(domain)}
              className="group cursor-pointer rounded-2xl border border-[#e7e0d3] bg-[#ffffff] overflow-hidden shadow-xs hover:shadow-xl hover:border-[#9a3412]/50 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Visual Header */}
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#1c1917] relative flex items-center justify-center">
                {!hasImageError ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={imageSrc}
                    alt={domain.title}
                    onError={() => handleImageError(domain.id)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                ) : (
                  /* Fallback Placeholder Visual */
                  <div className="w-full h-full bg-gradient-to-br from-[#292524] via-[#1c1917] to-[#0c0a09] flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-[#9a3412]/20 border border-[#9a3412]/30 flex items-center justify-center mb-3 text-[#f5efe6]">
                      <Layers className="w-6 h-6 text-[#c2410c]" />
                    </div>
                    <span className="text-sm font-medium text-[#f5efe6]/90">{domain.title}</span>
                    <span className="text-xs text-[#a8a29e] mt-1">Image: {domain.image}</span>
                  </div>
                )}

                {/* Case Study Count Badge */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#1c1917]/75 text-[#fbf8f3] backdrop-blur-xs border border-white/10 flex items-center gap-1.5 shadow-sm">
                  <span>{domain.case_studies.length}</span>
                  <span>{domain.case_studies.length === 1 ? 'Initiative' : 'Initiatives'}</span>
                </div>
              </div>

              {/* Card Content Footer */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-[#292524] group-hover:text-[#9a3412] transition-colors flex items-start justify-between gap-2">
                    <span>{domain.title}</span>
                    <ArrowUpRight className="w-5 h-5 text-[#78716c] group-hover:text-[#9a3412] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5" />
                  </h3>
                  <p className="text-[#57534e] text-sm mt-2 leading-relaxed">
                    {domain.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#f4ede2] flex items-center justify-between text-xs font-semibold text-[#9a3412]">
                  <span>Explore Initiatives</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog: Level 1 (Case Studies List) & Level 2 (Architecture Deep Dive) */}
      <Dialog open={!!selectedDomain} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#ffffff] border-[#e7e0d3] text-[#292524] shadow-2xl p-6 sm:p-8 rounded-2xl">
          {selectedDomain && !selectedCaseStudy && (
            /* Level 1: Domain Overview & Case Studies List */
            <>
              <DialogHeader className="border-b border-[#f4ede2] pb-5">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" className="bg-[#9a3412]/10 text-[#7c2d12] border border-[#9a3412]/30 font-mono text-xs">
                    Strategic Domain
                  </Badge>
                  <span className="text-xs text-[#78716c]">
                    {selectedDomain.case_studies.length} {selectedDomain.case_studies.length === 1 ? 'Case Study' : 'Case Studies'}
                  </span>
                </div>
                <DialogTitle className="text-2xl sm:text-3xl font-bold text-[#292524]">
                  {selectedDomain.title}
                </DialogTitle>
                <DialogDescription className="text-[#57534e] mt-2 text-base leading-relaxed">
                  {selectedDomain.subtitle}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-6 space-y-4">
                <h4 className="text-sm font-semibold uppercase tracking-wider text-[#78716c]">
                  Select an initiative to view architecture & outcomes
                </h4>

                <div className="grid grid-cols-1 gap-4">
                  {selectedDomain.case_studies.map((study) => (
                    <div
                      key={study.id}
                      onClick={() => setSelectedCaseStudy(study)}
                      className="cursor-pointer border border-[#e7e0d3] bg-[#fbf8f3] hover:bg-[#ffffff] hover:border-[#9a3412] hover:shadow-md transition-all rounded-xl p-5 flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-4">
                          <h5 className="text-lg font-bold text-[#292524] group-hover:text-[#9a3412] transition-colors">
                            {study.title}
                          </h5>
                          <span className="text-xs font-semibold text-[#9a3412] flex items-center gap-1 group-hover:translate-x-1 transition-transform flex-shrink-0">
                            Deep Dive <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <p className="text-sm text-[#57534e] mt-2 line-clamp-2 leading-relaxed">
                          {study.problem}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#e7e0d3]/60 flex flex-wrap gap-2">
                        {study.metrics.map((metric, idx) => (
                          <Badge
                            key={idx}
                            variant="secondary"
                            className="bg-[#9a3412]/10 text-[#7c2d12] border border-[#9a3412]/30 font-mono text-xs"
                          >
                            {metric}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {selectedDomain && selectedCaseStudy && (
            /* Level 2: Transitioned View - Case Study Architecture Deep Dive */
            <>
              <div className="border-b border-[#f4ede2] pb-4">
                <button
                  type="button"
                  onClick={() => setSelectedCaseStudy(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9a3412] hover:text-[#7c2d12] transition-colors py-1 px-2.5 rounded-lg bg-[#f5efe6] border border-[#e7e0d3] mb-4 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to {selectedDomain.title}
                </button>

                <DialogHeader>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="secondary" className="bg-[#9a3412]/10 text-[#7c2d12] border border-[#9a3412]/30 font-mono text-xs">
                      {selectedDomain.title}
                    </Badge>
                  </div>
                  <DialogTitle className="text-2xl sm:text-3xl font-bold text-[#292524]">
                    {selectedCaseStudy.title}
                  </DialogTitle>
                  <DialogDescription className="text-[#57534e] mt-2 text-base leading-relaxed">
                    {selectedCaseStudy.problem}
                  </DialogDescription>
                </DialogHeader>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#9a3412] mb-2.5">
                    Metrics & Key Outcomes
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCaseStudy.metrics.map((metric, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-[#9a3412]/10 text-[#7c2d12] border border-[#9a3412]/30 font-mono text-xs py-1 px-2.5"
                      >
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#9a3412] mb-2">
                    Solution & Engineering Architecture
                  </h4>
                  <p className="text-[#57534e] text-sm sm:text-base leading-relaxed bg-[#fbf8f3] p-4 rounded-xl border border-[#e7e0d3]">
                    {selectedCaseStudy.solution}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#9a3412] mb-2">
                    System Architecture Diagram
                  </h4>
                  <MermaidDiagram chart={selectedCaseStudy.architecture} id={selectedCaseStudy.id} />
                </div>

                {/* Technical Deep Dive Narrative Sections (preceding component tiles) */}
                {((selectedCaseStudy.deep_dive_sections && selectedCaseStudy.deep_dive_sections.length > 0) ||
                  (selectedCaseStudy.subsystems && selectedCaseStudy.subsystems.length > 0)) && (
                    <div className="pt-4 border-t border-[#f4ede2] space-y-6">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-[#9a3412]">
                        Technical Deep Dive
                      </h4>

                      {selectedCaseStudy.deep_dive_sections?.map((section, idx) => (
                        <div key={idx} className="space-y-2">
                          <h5 className="text-sm font-semibold text-[#292524]">
                            {section.title}
                          </h5>
                          <div className="text-[#57534e] text-sm leading-relaxed bg-[#fbf8f3] p-4 rounded-xl border border-[#e7e0d3] whitespace-pre-line">
                            {section.content}
                          </div>
                        </div>
                      ))}

                      {/* Subsystem Component Tiles */}
                      {selectedCaseStudy.subsystems && selectedCaseStudy.subsystems.length > 0 && (
                        <div className="space-y-3 pt-2">
                          <h5 className="text-sm font-semibold text-[#292524]">
                            System Implementations & Artifacts
                          </h5>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {selectedCaseStudy.subsystems.map((subsystem) => (
                              <SubsystemCard
                                key={subsystem.id}
                                subsystem={subsystem}
                                onClick={(sub) => setInspectedSubsystem(sub)}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <InspectorDrawer
        subsystem={inspectedSubsystem}
        isOpen={!!inspectedSubsystem}
        onClose={() => setInspectedSubsystem(null)}
      />
    </section>
  );
}
