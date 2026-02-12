import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");
const blogsDir = path.join(contentDir, "blogs");

export interface BlogPostMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

/**
 * Read and return the About Me markdown content.
 */
export function getAboutMe(): string {
  const filePath = path.join(contentDir, "about-me.md");
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Read and return the Get in Touch markdown content.
 */
export function getGetInTouch(): string {
  const filePath = path.join(contentDir, "get-in-touch.md");
  return fs.readFileSync(filePath, "utf-8");
}

/**
 * Get all blog posts sorted by date (newest first).
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(blogsDir)) {
    return [];
  }

  const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".md"));

  const posts = files.map((filename) => {
    const filePath = path.join(blogsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      description: data.description ?? "",
      slug: data.slug ?? filename.replace(/\.md$/, ""),
      content,
    } satisfies BlogPost;
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single blog post by slug.
 */
export function getBlogPost(slug: string): BlogPost | null {
  if (!fs.existsSync(blogsDir)) {
    return null;
  }

  const files = fs.readdirSync(blogsDir).filter((f) => f.endsWith(".md"));

  for (const filename of files) {
    const filePath = path.join(blogsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const postSlug = data.slug ?? filename.replace(/\.md$/, "");

    if (postSlug === slug) {
      return {
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        description: data.description ?? "",
        slug: postSlug,
        content,
      };
    }
  }

  return null;
}
