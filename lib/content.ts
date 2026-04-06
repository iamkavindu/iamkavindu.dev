import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "content");
const blogsDir = path.join(contentDir, "blogs");
const projectsDir = path.join(contentDir, "projects");

export const DEFAULT_BLOG_HERO_IMAGE = "/default-blog-hero.webp";

function generatePlaceholderBlur(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="2" height="1"><rect width="100%" height="100%" fill="#1a1a2e"/></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
}

export interface BlogPostMeta {
  title: string;
  date: string;
  description: string;
  slug: string;
  heroImage?: string;
  blurDataURL?: string;
  draft?: boolean;
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

  const posts = files
    .map((filename) => {
      const filePath = path.join(blogsDir, filename);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);

      return {
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        description: data.description ?? "",
        slug: data.slug ?? filename.replace(/\.md$/, ""),
        heroImage: data.heroImage ?? undefined,
        blurDataURL: generatePlaceholderBlur(),
        draft: data.draft === true,
        content,
      } satisfies BlogPost;
    })
    .filter((post) => !post.draft);

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

    if (postSlug === slug && data.draft !== true) {
      return {
        title: data.title ?? "Untitled",
        date: data.date ?? "",
        description: data.description ?? "",
        slug: postSlug,
        heroImage: data.heroImage ?? undefined,
        blurDataURL: generatePlaceholderBlur(),
        draft: false,
        content,
      };
    }
  }

  return null;
}

export interface Project {
  title: string;
  description: string;
  url: string;
  image?: string;
  tags: string[];
  slug: string;
}

/**
 * Derive the GitHub social preview URL from a github.com repo URL.
 * Returns undefined if the URL is not a GitHub repo URL.
 */
export function getGitHubSocialPreviewUrl(url: string): string | undefined {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") return undefined;
    const parts = parsed.pathname.replace(/^\//, "").split("/");
    if (parts.length < 2 || !parts[0] || !parts[1]) return undefined;
    return `https://opengraph.githubassets.com/1/${parts[0]}/${parts[1]}`;
  } catch {
    return undefined;
  }
}

/**
 * Get all projects.
 */
export function getProjects(): Project[] {
  if (!fs.existsSync(projectsDir)) {
    return [];
  }

  const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const filePath = path.join(projectsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      title: data.title ?? "Untitled",
      description: data.description ?? "",
      url: data.url ?? "",
      image: data.image ?? undefined,
      tags: Array.isArray(data.tags) ? data.tags : [],
      slug: data.slug ?? filename.replace(/\.md$/, ""),
    } satisfies Project;
  });
}
