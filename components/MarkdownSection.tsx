"use client";

import MarkdownRenderer from "./MarkdownRenderer";

interface MarkdownSectionProps {
  content: string;
}

export default function MarkdownSection({ content }: MarkdownSectionProps) {
  return <MarkdownRenderer content={content} className="prose-heroui" />;
}
