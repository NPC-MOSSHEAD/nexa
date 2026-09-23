export type Project = {
  slug: string;
  index: string;
  title: string;
  category: string;
  year: string;
  descriptor: string;
  visual: "neural" | "commerce" | "identity" | "mobile";
};

export const projects: Project[] = [
  {
    slug: "neural-health",
    index: "01",
    title: "Neural Health",
    category: "AI Product System",
    year: "2026",
    descriptor: "Clinical intelligence shaped into a usable product layer.",
    visual: "neural",
  },
  {
    slug: "arc-commerce",
    index: "02",
    title: "Arc Commerce",
    category: "Digital Platform",
    year: "2026",
    descriptor: "A commerce system rebuilt around speed, behavior and signal.",
    visual: "commerce",
  },
  {
    slug: "form-01",
    index: "03",
    title: "Form / 01",
    category: "Brand System",
    year: "2025",
    descriptor: "Identity engineered as a flexible visual operating system.",
    visual: "identity",
  },
  {
    slug: "orbit-mobile",
    index: "04",
    title: "Orbit",
    category: "Mobile Experience",
    year: "2025",
    descriptor: "A high-frequency mobile product with almost no visual friction.",
    visual: "mobile",
  },
];
