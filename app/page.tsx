import { getSocialLinks } from "@/lib/getSocialLinks";
import { getAboutMe, getGetInTouch, getAllBlogPosts } from "@/lib/content";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import MediumIcon from "@/components/icons/MediumIcon";
import ProfilePicture from "@/components/ProfilePicture";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import MarkdownSection from "@/components/MarkdownSection";
import { Divider } from "@heroui/react";

export default function Home() {
  const socialLinks = getSocialLinks();
  const aboutContent = getAboutMe();
  const contactContent = getGetInTouch();
  const blogPosts = getAllBlogPosts();

  return (
    <>
      <Header />

      <main className="min-h-screen">
        {/* Landing Section */}
        <section className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center px-4 py-16">
          <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left space-y-8">
              <h2 className="text-3xl md:text-4xl font-light text-foreground">
                Hey there,
              </h2>
              <h1 className="text-3xl md:text-4xl font-light text-foreground">
                I am <span className="font-bold">Kavindu Perera</span>.
              </h1>
              <p className="text-default-600 text-lg leading-relaxed">
                I am currently a Software Engineer at Wiley, specializing in
                backend development with Java and Spring Boot. I build robust,
                scalable backend solutions with a focus on microservices
                architecture and cloud technologies.
              </p>

              <div className="flex justify-center md:justify-start space-x-6">
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on LinkedIn"
                  className="transition-colors duration-200"
                >
                  <LinkedInIcon className="w-10 h-10 text-foreground hover:text-primary" />
                </a>
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on GitHub"
                  className="transition-colors duration-200"
                >
                  <GitHubIcon className="w-10 h-10 text-foreground hover:text-primary" />
                </a>
                <a
                  href={socialLinks.medium}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow on Medium"
                  className="transition-colors duration-200"
                >
                  <MediumIcon className="w-10 h-10 text-foreground hover:text-primary" />
                </a>
              </div>
            </div>

            <ProfilePicture
              alt="Kavindu Perera's profile picture"
              className="w-48 h-48 md:w-64 md:h-64 shadow-lg"
            />
          </div>
        </section>

        <Divider className="max-w-4xl mx-auto" />

        {/* About Me Section */}
        <section id="about" className="scroll-mt-20 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <MarkdownSection content={aboutContent} />
          </div>
        </section>

        <Divider className="max-w-4xl mx-auto" />

        {/* Blogs Section */}
        <section id="blogs" className="scroll-mt-20 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Blogs</h1>
            {blogPosts.length > 0 ? (
              <div className="grid gap-6">
                {blogPosts.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            ) : (
              <p className="text-default-500">No blog posts yet. Stay tuned!</p>
            )}
          </div>
        </section>

        <Divider className="max-w-4xl mx-auto" />

        {/* Get in Touch Section */}
        <section id="contact" className="scroll-mt-20 py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <MarkdownSection content={contactContent} />
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-divider">
          <div className="max-w-4xl mx-auto text-center text-default-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Kavindu Perera. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
