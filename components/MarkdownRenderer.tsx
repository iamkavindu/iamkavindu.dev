"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Components } from "react-markdown";
import MermaidBlock from "./MermaidBlock";

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const components: Components = {
  // Render mermaid code blocks with the MermaidBlock component
  code({ className, children, ...props }) {
    const match = /language-mermaid/.exec(className || "");
    if (match) {
      return <MermaidBlock chart={String(children).replace(/\n$/, "")} />;
    }

    // Inline code
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="bg-default-100 text-default-800 px-1.5 py-0.5 rounded text-sm font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    // Block code
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  // Styled markdown elements
  h1({ children }) {
    return <h1 className="text-3xl font-bold mb-4 mt-8 first:mt-0">{children}</h1>;
  },
  h2({ children }) {
    return <h2 className="text-2xl font-semibold mb-3 mt-6">{children}</h2>;
  },
  h3({ children }) {
    return <h3 className="text-xl font-semibold mb-2 mt-4">{children}</h3>;
  },
  p({ children }) {
    return <p className="mb-4 leading-relaxed">{children}</p>;
  },
  ul({ children }) {
    return <ul className="list-disc list-inside mb-4 space-y-1">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="list-decimal list-inside mb-4 space-y-1">{children}</ol>;
  },
  li({ children }) {
    return <li className="leading-relaxed">{children}</li>;
  },
  a({ href, children }) {
    return (
      <a
        href={href}
        className="text-primary hover:underline"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
  blockquote({ children }) {
    return (
      <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-default-600">
        {children}
      </blockquote>
    );
  },
  pre({ children }) {
    return (
      <pre className="bg-default-100 rounded-lg p-4 overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    );
  },
  hr() {
    return <hr className="my-8 border-divider" />;
  },
  table({ children }) {
    return (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-divider">
          {children}
        </table>
      </div>
    );
  },
  th({ children }) {
    return (
      <th className="border border-divider px-4 py-2 bg-default-100 font-semibold text-left">
        {children}
      </th>
    );
  },
  td({ children }) {
    return (
      <td className="border border-divider px-4 py-2">{children}</td>
    );
  },
};

export default function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div className={className}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
