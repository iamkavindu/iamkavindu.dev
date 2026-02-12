"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface MermaidBlockProps {
  chart: string;
}

let mermaidInitialized = false;

export default function MermaidBlock({ chart }: MermaidBlockProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { theme } = useTheme();

  useEffect(() => {
    let cancelled = false;

    async function renderChart() {
      try {
        const mermaid = (await import("mermaid")).default;

        if (!mermaidInitialized) {
          mermaid.initialize({
            startOnLoad: false,
            theme: theme === "dark" ? "dark" : "default",
            securityLevel: "loose",
          });
          mermaidInitialized = true;
        } else {
          mermaid.initialize({
            startOnLoad: false,
            theme: theme === "dark" ? "dark" : "default",
            securityLevel: "loose",
          });
        }

        const id = `mermaid-${Math.random().toString(36).substring(2, 9)}`;
        const { svg: renderedSvg } = await mermaid.render(id, chart);

        if (!cancelled) {
          setSvg(renderedSvg);
          setError("");
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Failed to render diagram"
          );
          setSvg("");
        }
      }
    }

    renderChart();

    return () => {
      cancelled = true;
    };
  }, [chart, theme]);

  if (error) {
    return (
      <div className="bg-danger-50 border border-danger-200 rounded-lg p-4 my-4">
        <p className="text-danger text-sm">Failed to render diagram: {error}</p>
        <pre className="mt-2 text-xs overflow-x-auto">{chart}</pre>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex items-center justify-center py-8 my-4 bg-default-100 rounded-lg">
        <div className="w-6 h-6 border-2 border-default-400 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-4 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
