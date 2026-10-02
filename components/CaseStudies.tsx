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
      theme: 'dark',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: 'inherit',
        primaryColor: '#3b82f6',
        primaryTextColor: '#f8fafc',
        primaryBorderColor: '#60a5fa',
        lineColor: '#94a3b8',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a'
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
      className="w-full flex justify-center items-center overflow-x-auto p-4 bg-slate-950/60 rounded-lg border border-slate-800"
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
        <h2 className="text-3xl font-bold tracking-tight text-slate-100">Architecture Cases</h2>
        <p className="text-slate-400 mt-2">
          Deep-dive technical architectural transformations, trade-offs, and measurable engineering outcomes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {caseStudies.map((study) => (
          <Card
            key={study.id}
            className="cursor-pointer border-slate-800 bg-slate-900/50 hover:bg-slate-900/80 transition-all hover:border-slate-700 flex flex-col justify-between"
            onClick={() => setSelectedStudy(study)}
          >
            <CardHeader>
              <CardTitle className="text-lg text-slate-100">{study.title}</CardTitle>
              <CardDescription className="text-slate-400 line-clamp-2 mt-1">
                {study.problem}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {study.metrics.map((metric, idx) => (
                  <Badge key={idx} variant="secondary" className="bg-slate-800 text-cyan-400 border-slate-700">
                    {metric}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-slate-300 line-clamp-3">{study.solution}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedStudy} onOpenChange={(open) => !open && setSelectedStudy(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-800 text-slate-100">
          {selectedStudy && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-slate-100">{selectedStudy.title}</DialogTitle>
                <DialogDescription className="text-slate-400 mt-2">
                  {selectedStudy.problem}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Metrics & Outcomes</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedStudy.metrics.map((metric, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-slate-800 text-cyan-400 border-slate-700">
                        {metric}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Proposed Solution</h4>
                  <p className="text-slate-300 text-sm leading-relaxed">{selectedStudy.solution}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Architecture Diagram</h4>
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
