import { getSocialLinks } from "@/lib/getSocialLinks";
import LinkedInIcon from "@/components/icons/LinkedInIcon";
import GitHubIcon from "@/components/icons/GitHubIcon";
import MediumIcon from "@/components/icons/MediumIcon";
import ProfilePicture from "@/components/ProfilePicture";

export default function Home() {
  const socialLinks = getSocialLinks();

  return (
    <main className="flex min-h-screen w-full bg-slate-300 flex items-center justify-center">
      <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-8 px-4">
        <div className="flex-1 text-center md:text-left space-y-8">
          <h2 className="text-3xl md:text-4xl font-light">Hey there,</h2>
          <h1 className="text-3xl md:text-4xl font-light">I am <span className="font-bold">Kavindu Perera</span>.</h1>
          <p>I am currently a Software Engineer at Wiley, specializing in backend development with Java and Spring Boot. I build robust, scalable backend solutions with a focus on microservices architecture and cloud technologies.</p>

          <div className="flex justify-center md:justify-start space-x-6">
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on LinkedIn"
              className="transition-colors duration-200"
            >
              <LinkedInIcon className="w-10 h-10 text-slate-800 hover:text-slate-700" />
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on GitHub"
              className="transition-colors duration-200"
            >
              <GitHubIcon className="w-10 h-10 text-slate-800 hover:text-slate-700" />
            </a>
            <a
              href={socialLinks.medium}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow on Medium"
              className="transition-colors duration-200"
            >
              <MediumIcon className="w-10 h-10 text-slate-800 hover:text-slate-700" />
            </a>
          </div>
        </div>

        <ProfilePicture 
          alt="Kavindu Perera's profile picture"
          className="w-48 h-48 md:w-64 md:h-64 shadow-lg"
        />
      </div>
    </main>
  );
}
