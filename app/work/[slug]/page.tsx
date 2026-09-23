import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { ProjectVisual } from "@/components/ProjectVisual";
import { TransitionLink } from "@/components/TransitionProvider";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return notFound();

  return (
    <main className="case-page">
      <header className="case-nav">
        <TransitionLink href="/" data-cursor="BACK">NEXA®</TransitionLink>
        <span>{project.category}</span>
        <TransitionLink href="/" data-cursor="CLOSE">CLOSE ×</TransitionLink>
      </header>

      <section className="case-hero">
        <div className="case-hero__meta micro"><span>{project.index} / CASE STUDY</span><span>{project.year}</span></div>
        <h1>{project.title}</h1>
        <p>{project.descriptor}</p>
        <ProjectVisual project={project} />
      </section>

      <section className="case-story section-grid">
        <div className="micro">THE SYSTEM</div>
        <h2 className="display-serif">A case-study shell designed to accept real strategy, process, product and results.</h2>
        <div className="case-story__copy">
          <p>This demo page proves the transition and content architecture. Replace the placeholder narrative with the real brief, constraints, design decisions and measurable outcomes.</p>
          <p>The visual language remains connected to the homepage while giving each project enough space to develop its own identity.</p>
        </div>
      </section>

      <section className="case-metrics">
        <div><span>01</span><strong>STRATEGY</strong><p>Define the problem before decorating the answer.</p></div>
        <div><span>02</span><strong>DESIGN</strong><p>Build a behavior system that survives real content.</p></div>
        <div><span>03</span><strong>ENGINEERING</strong><p>Ship motion and interaction without wrecking performance.</p></div>
      </section>

      <footer className="case-next">
        <span className="micro">END / {project.index}</span>
        <TransitionLink href="/" data-cursor="RETURN">RETURN TO ALL WORK ↗</TransitionLink>
      </footer>
    </main>
  );
}
