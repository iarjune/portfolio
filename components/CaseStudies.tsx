"use client"
import * as React from "react"
import mermaid from "mermaid"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Badge } from "./ui/badge"

export interface CaseStudy {
  id: string;
  title: string;
  problem: string;
  solution: string;
  metrics: string[];
  architecture: string;
}

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
  caseStudies: CaseStudy[];
}

export default function CaseStudies({ caseStudies }: CaseStudiesProps) {
  const [selectedStudy, setSelectedStudy] = React.useState<CaseStudy | null>(null);

  return (
    <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight text-[#292524]">Architecture Cases</h2>
        <p className="text-[#57534e] mt-2">
          Deep-dive technical architectural transformations, trade-offs, and measurable engineering outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((study) => (
          <Card
            key={study.id}
            className="cursor-pointer border-[#e7e0d3] bg-[#ffffff] hover:border-[#9a3412]/40 hover:shadow-md transition-all flex flex-col justify-between rounded-xl shadow-xs"
            onClick={() => setSelectedStudy(study)}
          >
            <CardHeader className="pb-3 border-b border-[#f4ede2]">
              <CardTitle className="text-lg text-[#292524]">{study.title}</CardTitle>
              <CardDescription className="text-[#57534e] line-clamp-2 mt-1">
                {study.problem}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {study.metrics.map((metric, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-[#9a3412]/10 text-[#7c2d12] border border-[#9a3412]/30 font-mono text-xs">
                    {metric}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-[#57534e] line-clamp-3 leading-relaxed">{study.solution}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedStudy} onOpenChange={(open) => !open && setSelectedStudy(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-[#ffffff] border-[#e7e0d3] text-[#292524] shadow-2xl">
          {selectedStudy && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-[#292524]">{selectedStudy.title}</DialogTitle>
                <DialogDescription className="text-[#57534e] mt-2 text-base">
                  {selectedStudy.problem}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-[#9a3412] uppercase tracking-wider mb-2">Metrics & Outcomes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudy.metrics.map((metric, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-[#9a3412]/10 text-[#7c2d12] border border-[#9a3412]/30 font-mono text-xs">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#9a3412] uppercase tracking-wider mb-2">Proposed Solution</h4>
                  <p className="text-[#57534e] text-sm leading-relaxed">{selectedStudy.solution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-[#9a3412] uppercase tracking-wider mb-2">Architecture Diagram</h4>
                  <MermaidDiagram chart={selectedStudy.architecture} id={selectedStudy.id} />
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
