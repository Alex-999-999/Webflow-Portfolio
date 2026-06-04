import { useState } from "react";
import { Link } from "@tanstack/react-router";
import logoImage from "@/assets/en_zuo_logo_transparent.webp";
import noiseTexture from "@/assets/noise-tex.webp";
import { CheckOutMyWorkLink } from "@/components/CheckOutMyWorkLink";
import { WorkPreviewImage } from "@/components/WorkPreviewImage";
import { WorkTechStack } from "@/components/WorkTechStack";
import { WorkProblemsSolved } from "@/components/WorkProblemsSolved";
import { MenuOverlay } from "@/components/MenuOverlay";
import { ProjectPreviewLightbox } from "@/components/ProjectPreviewLightbox";
import { WorkCornerMarks } from "@/components/WorkCornerMarks";
import { Route } from "@/routes/work.$slug";
import { WORK_PREVIEW_ASPECT, getWorkServiceBySlug } from "@/lib/workServices";

const MENU_FONT = "'Bebas Neue', sans-serif";
const BODY_FONT = "'Inter', system-ui, sans-serif";

export default function WorkProject() {
  const { slug } = Route.useParams();
  const project = getWorkServiceBySlug(slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  if (!project) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
        <p className="text-lg">Project not found.</p>
        <Link to="/work" className="mt-6 text-white underline">
          Back to work
        </Link>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute"
          style={{
            backgroundImage: `url(${noiseTexture})`,
            backgroundRepeat: "repeat",
            backgroundSize: "256px 256px",
            opacity: 0.14,
            inset: "-200%",
            width: "400%",
            height: "400%",
          }}
        />
      </div>

      <WorkCornerMarks />

      <header className="relative z-10 flex items-center justify-center px-6 pt-8 pb-1 sm:pt-10 sm:pb-2">
        <img
          src={logoImage}
          alt="EN ZUO"
          draggable={false}
          className="h-auto w-[min(120px,36vw)] object-contain sm:w-[140px]"
        />
      </header>

      <div
        className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-32 pt-2 text-left sm:px-10 sm:pb-36"
        style={{ fontFamily: BODY_FONT }}
      >
        <Link
          to="/work"
          className="text-[14px] text-white/60 transition-opacity hover:text-white"
        >
          ← Back to work
        </Link>

        <p className="mt-10 text-[13px] text-white/45">
          {project.number}
          {project.employer ? (
            <span className="text-white/35"> · {project.employer}</span>
          ) : null}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
          {project.title}
        </h1>

        {project.image ? (
          <button
            type="button"
            onClick={() => setPreviewOpen(true)}
            className="mt-10 block w-full cursor-zoom-in overflow-hidden text-left transition-opacity hover:opacity-90"
            aria-label={`View full preview of ${project.title}`}
          >
            <WorkPreviewImage
              src={project.image}
              alt={project.title}
              aspectRatio={project.imageAspect ?? WORK_PREVIEW_ASPECT}
            />
          </button>
        ) : null}

        <WorkTechStack
          coreStack={project.coreStack}
          infraStack={project.infraStack}
          highlights={project.techHighlights}
        />

        <WorkProblemsSolved items={project.problemsSolved} />

        <div className="mt-10 max-w-3xl space-y-5 text-[15px] leading-relaxed text-white/70">
          {(project.pageDescription ?? project.description)
            .split(/\n\n+/)
            .map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
        </div>

        <div className="mt-14 flex w-full justify-start pb-4">
          <CheckOutMyWorkLink
            href={project.ctaUrl}
            label={project.ctaLabel}
            className="shrink-0"
          />
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-8 z-50 flex justify-center sm:bottom-10">
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="rounded-[32px] bg-white px-8 py-2 text-[24px] leading-none text-black transition-all duration-300 hover:px-10 hover:py-3"
          style={{ fontFamily: MENU_FONT }}
        >
          Menu
        </button>
      </div>

      {project.image ? (
        <ProjectPreviewLightbox
          open={previewOpen}
          onClose={() => setPreviewOpen(false)}
          src={project.image}
          alt={project.title}
        />
      ) : null}

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </main>
  );
}
