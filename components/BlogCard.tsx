import { Card, CardHeader, CardBody } from "@heroui/react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/content";

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}/`}>
      <Card
        isPressable
        className="w-full hover:shadow-lg transition-all duration-300 hover:border-l-4 hover:border-l-primary"
      >
        <CardHeader className="flex-col items-start gap-1 pb-0">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <time className="text-small text-default-400" dateTime={post.date}>
            {formattedDate}
          </time>
        </CardHeader>
        <CardBody>
          <p className="text-default-600">{post.description}</p>
        </CardBody>
      </Card>
    </Link>
  );
}
