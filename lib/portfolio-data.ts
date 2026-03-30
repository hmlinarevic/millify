export const profile = {
  name: "Hrvoje Mlinarević",
  title: "Full-Stack Developer",
  location: "Zagreb, Croatia",
  email: "hrvoje@millify.dev",
  github: "https://github.com/millify",
  tagline:
    "Building web applications from frontend interfaces to backend systems.",
  bio: "I like building things that matter — from backend systems and servers to interfaces that people actually enjoy using. My goal is to help make the web a bit more approachable for everyone.",
};

export const experience = [
  {
    company: "KNB",
    role: "Full-Stack Developer",
    description: "Software development agency",
    tech: ["React", "React Native", "Node.js", "Nest.js", "Docker", "MySQL"],
    period: "Oct 2024 — Present",
    location: "Croatia (On site)",
    highlights: [
      "Building APIs that connect web and mobile apps",
      "Debugging and optimizing code across the full stack",
      "Taking features from development through to deployment",
      "Contributing to code reviews and QA to keep quality high",
    ],
  },
  {
    company: "Appliment",
    role: "Full-Stack Developer",
    description: "CRM & custom app development",
    tech: ["Vue.js", "PHP", "Laravel"],
    period: "Feb 2024 — Jul 2024",
    location: "Croatia (On site)",
    highlights: [
      "Developed features for custom applications and CRM systems",
      "Deployed applications to production environments",
      "Participated in code reviews and handled post-launch bug fixes",
    ],
  },
  {
    company: "Aspirations",
    role: "Backend Developer",
    description: "AI-powered newsletters",
    tech: ["Node.js", "AWS", "ChatGPT"],
    period: "Jul 2023 — Jan 2024",
    location: "USA (Freelance)",
    highlights: [
      "Built automated newsletter system with AI-curated content",
      "Developed web scraping on AWS serverless architecture",
      "Integrated ChatGPT for data analysis and correlation",
      "Set up scheduled AWS Lambda functions and DynamoDB storage",
    ],
  },
];

export type Project = {
  name: string;
  description?: string;
  url?: string;
};

export const projects: Project[] = [
  {
    name: "Sessions",
    description: "Portfolio project",
    url: "/projects/sessions",
  },
  {
    name: "Crosswit",
    description: "Portfolio project",
    url: "/projects/crosswit",
  },
];

const DEVICON = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

export const skillsByCategory = {
  frontend: [
    { name: "HTML", icon: DEVICON("html5"), docsUrl: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
    { name: "CSS", icon: DEVICON("css3"), docsUrl: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
    { name: "JavaScript", icon: DEVICON("javascript"), docsUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
    { name: "TypeScript", icon: DEVICON("typescript"), docsUrl: "https://www.typescriptlang.org/docs/" },
    { name: "React", icon: DEVICON("react"), docsUrl: "https://react.dev/" },
    { name: "Next.js", icon: DEVICON("nextjs"), docsUrl: "https://nextjs.org/docs" },
    { name: "Vue.js", icon: DEVICON("vuejs"), docsUrl: "https://vuejs.org/guide/" },
    { name: "Tailwind CSS", icon: DEVICON("tailwindcss"), docsUrl: "https://tailwindcss.com/docs" },
  ],
  backend: [
    { name: "Node.js", icon: DEVICON("nodejs"), docsUrl: "https://nodejs.org/docs/" },
    { name: "Nest.js", icon: DEVICON("nestjs"), docsUrl: "https://docs.nestjs.com/" },
    { name: "REST APIs", icon: DEVICON("swagger"), docsUrl: "https://swagger.io/specification/" },
    { name: "MySQL", icon: DEVICON("mysql"), docsUrl: "https://dev.mysql.com/doc/" },
    { name: "Docker", icon: DEVICON("docker"), docsUrl: "https://docs.docker.com/" },
  ],
};

export const education = {
  selfTaught: {
    intro:
      "In 2020, I started my programming journey with JavaScript through Udemy courses, learning how to build dynamic web apps. I took a deep dive into algorithmic challenges on platforms like Codewars, which pushed me to improve my problem-solving skills and write more efficient code. By building my own projects along the way, I developed a good technical foundation and became comfortable working with a variety of libraries and frameworks in the JavaScript ecosystem.",
  },
};

export const interests = [
  "Swimming",
  "Reading",
  "Making great coffee",
  "Salsa Dancing",
];

export const languages = [
  { name: "Croatian", level: "Native" },
  { name: "English", level: "Fluent" },
  { name: "Spanish", level: "Conversational" },
];
