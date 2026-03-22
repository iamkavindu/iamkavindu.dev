import { getAllBlogPosts, getBlogPost } from "@/lib/content";
import Header from "@/components/Header";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <Header />

      <main className="min-h-screen py-16 px-4">
        <article className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href="/#blogs"
              className="inline-flex items-center gap-2 mb-4 -ml-2 px-3 py-2 text-sm font-medium rounded-lg hover:bg-default-100 text-default-600 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Blogs
            </Link>

            <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
            <time className="text-default-400" dateTime={post.date}>
              {formattedDate}
            </time>
          </div>

          <MarkdownRenderer content={post.content} />
        </article>
      </main>
    </>
  );
}
