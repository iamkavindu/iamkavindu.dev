import { Card, CardBody } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/lib/content";
import { DEFAULT_BLOG_HERO_IMAGE } from "@/lib/content";

interface BlogCardProps {
  post: BlogPostMeta;
}

export default function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const heroImage = post.heroImage ?? DEFAULT_BLOG_HERO_IMAGE;

  return (
    <Link href={`/blog/${post.slug}/`} className="block w-full">
      <Card className="w-full hover:shadow-lg transition-all duration-300 hover:border-l-4 hover:border-l-primary">
        <CardBody className="p-4">
          <div className="flex flex-row items-start gap-4">
            <div
              className="relative shrink-0 w-48 rounded-lg overflow-hidden border border-default-200"
              style={{ aspectRatio: "2 / 1" }}
            >
              <Image
                src={heroImage}
                alt={`${post.title} hero image`}
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
            <div className="flex flex-col flex-1 min-w-0 gap-1">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <time className="text-small text-default-400" dateTime={post.date}>
                {formattedDate}
              </time>
              <p className="text-default-600 mt-1">{post.description}</p>
            </div>
          </div>
        </CardBody>
      </Card>
    </Link>
  );
}
