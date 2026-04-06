"use client";

import dynamic from "next/dynamic";

const MarkdownRenderer = dynamic(() => import("./MarkdownRenderer"), {
  loading: () => <div className="animate-pulse h-24 bg-default-100 rounded-lg" />,
});

interface MarkdownSectionProps {
  content: string;
}

export default function MarkdownSection({ content }: MarkdownSectionProps) {
  return <MarkdownRenderer content={content} className="prose-heroui" />;
}
