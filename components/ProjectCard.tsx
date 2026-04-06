import { Card, CardBody, Chip } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/lib/content";
import { getGitHubSocialPreviewUrl } from "@/lib/content";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const previewImage =
    project.image ?? (project.url ? getGitHubSocialPreviewUrl(project.url) : undefined);

  const cardContent = (
    <Card className="w-full hover:shadow-lg transition-all duration-300 hover:border-l-4 hover:border-l-primary">
      <CardBody className="p-4">
        <div className="flex flex-row items-start gap-4">
          {previewImage && (
            <div
              className="relative shrink-0 w-48 rounded-lg overflow-hidden border border-default-200"
              style={{ aspectRatio: "2 / 1" }}
            >
              <Image
                src={previewImage}
                alt={`${project.title} social preview`}
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
          )}
          <div className="flex flex-col flex-1 min-w-0 gap-2">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              {project.url && (
                <ExternalLink size={16} className="text-default-400 shrink-0" />
              )}
            </div>
            <p className="text-default-600">{project.description}</p>
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Chip key={tag} size="sm" variant="flat" color="primary">
                    {tag}
                  </Chip>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );

  if (project.url) {
    return (
      <Link href={project.url} target="_blank" rel="noopener noreferrer" className="block w-full">
        {cardContent}
      </Link>
    );
  }

  return <div className="block w-full">{cardContent}</div>;
}
