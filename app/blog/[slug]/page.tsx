import { getAllBlogPosts, getBlogPost } from "@/lib/content";
import Header from "@/components/Header";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { Button } from "@heroui/react";
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
            <Link href="/#blogs">
              <Button
                variant="light"
                startContent={<ArrowLeft size={16} />}
                className="mb-4 -ml-2"
              >
                Back to Blogs
              </Button>
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
