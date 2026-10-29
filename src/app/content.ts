// All site copy lives here. Components only render it.

export interface Tech {
  name: string;
  icon: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  name: string;
  year: string;
  image: string;
  imageAlt: string;
  summary: string;
  tech: Tech[];
  status?: string;
  client?: string;
  links: ProjectLink[];
  group: 'featured' | 'more' | 'client';
  /** Featured only: the one engineering decision worth reading, and what backs it up. */
  story?: { decision: string; proof?: string };
}

export interface Role {
  title: string;
  org: string;
  period: string;
  logo: { kind: 'image'; src: string; dark?: boolean } | { kind: 'text'; text: string };
  summary?: string;
  highlights?: { name: string; text: string; current?: boolean }[];
}

export interface Education {
  title: string;
  org: string;
  period: string;
  note?: string;
}

export interface Post {
  platform: 'LinkedIn post' | 'Medium article';
  date: string;
  title: string;
  summary: string;
  image: string;
  url: string;
}

export interface Book {
  title: string;
  author: string;
  cover: string;
  note: string;
}

const icon = (name: string, file: string): Tech => ({ name, icon: `images/icons/${file}.svg` });

const T = {
  typescript: icon('TypeScript', 'typescript'),
  python: icon('Python', 'python'),
  node: icon('Node.js', 'nodedotjs'),
  angular: icon('Angular', 'angular'),
  nest: icon('NestJS', 'nestjs'),
  postgres: icon('PostgreSQL', 'postgresql'),
  docker: icon('Docker', 'docker'),
  openai: icon('OpenAI', 'openai'),
  anthropic: icon('Anthropic', 'anthropic'),
  gemini: icon('Gemini · ADK', 'googlegemini'),
  redis: icon('Redis', 'redis'),
  mysql: icon('MySQL', 'mysql'),
  shopify: icon('Shopify', 'shopify'),
  actions: icon('GitHub Actions', 'githubactions'),
  prisma: icon('Prisma', 'prisma'),
  elevenlabs: icon('ElevenLabs', 'elevenlabs'),
  ffmpeg: icon('FFmpeg', 'ffmpeg'),
  claude: icon('Claude', 'claude'),
  rust: icon('Rust', 'rust'),
  tauri: icon('Tauri', 'tauri'),
};

export const profile = {
  name: 'Güngör Deniz Karataş',
  role: 'Full-Stack Engineer',
  tagline: 'AI agents and LLM products',
  location: 'Istanbul, Türkiye',
  photo: 'images/profile.jpg',
  bio: [
    '5+ years of TypeScript in production, front to back: Angular apps, Node.js and NestJS APIs, data-heavy business systems on SQL. I owned backend architecture and deployments and worked directly with clients.',
    'Now I build AI agents with deterministic controls, human review and evals, and I measure what they do before I trust them.',
  ],
  stack: [T.typescript, T.python, T.node, T.angular, T.nest, T.postgres, T.docker, T.openai, T.anthropic, T.gemini],
  stackVisible: 7,
  skills: ['RAG', 'Tool calling', 'Evals'],
  github: 'https://github.com/GDenizKaratas',
  linkedin: 'https://www.linkedin.com/in/g-deniz-karatas',
  email: 'karatas.gun@gmail.com',
  cv: 'cv/gungor-deniz-karatas-cv.pdf',
  cvPreview: 'cv/gungor-deniz-karatas-cv.webp',
};

const gh = (repo: string) => `https://github.com/GDenizKaratas/${repo}`;
const arteon = 'Arteon';

export const projects: Project[] = [
  {
    name: 'Bank Agent Lab',
    year: '2026',
    image: 'images/projects/bank-agent-lab.jpg',
    imageAlt: 'All 4 automatic checks passed',
    summary:
      'Too many flagged transactions for people to review. An AI agent gathers evidence through four read-only tools and RAG; a human decides.',
    tech: [T.python, T.gemini],
    links: [{ label: 'View code', url: gh('bank-agent-lab') }],
    group: 'featured',
    story: {
      decision: 'Risk scoring stays in deterministic code, never in the model.',
      proof: '120+ tests · eval set · full audit log',
    },
  },
  {
    name: 'Content Pilot',
    year: '2025',
    image: 'images/projects/content.png',
    imageAlt: 'Draft, schedule, publish to X, LinkedIn and Instagram',
    summary:
      'Teams were posting the same content to every platform by hand. A multi-tenant NestJS SaaS with one provider interface per platform: X, LinkedIn, Instagram.',
    tech: [T.nest, T.angular, T.prisma, T.openai],
    links: [
      { label: 'API', url: gh('nest-ai-pilot') },
      { label: 'UI', url: gh('content-pilot-ui') },
    ],
    group: 'featured',
    story: {
      decision: 'The database is the only lock; tokens are encrypted at rest.',
      proof: '30+ Prisma models · CI',
    },
  },
  {
    name: 'No-code API platform',
    year: '2020–25',
    image: 'images/projects/nocode.png',
    imageAlt: 'A data model becomes a generated CRUD API',
    client: arteon,
    summary:
      'Every client project needed the same secured CRUD backend. A visual data-model designer plus a Node.js API generator.',
    tech: [T.angular, T.node],
    links: [],
    group: 'featured',
    story: {
      decision: 'JWT-protected endpoints are generated from the model, not written by hand.',
    },
  },
  {
    name: 'Multi-Channel Inventory Sync',
    year: '2026',
    image: 'images/projects/inventory.png',
    imageAlt: 'Shopify and more channels share one stock count',
    summary:
      'Keeps one stock count in sync across sales channels, starting with Shopify, so a sale on one channel updates inventory everywhere.',
    tech: [T.shopify, T.angular, T.nest, T.postgres, T.actions],
    status: 'Working on',
    links: [],
    group: 'more',
  },
  {
    name: 'Teach Yourself AI',
    year: '2026',
    image: 'images/projects/teach-yourself-ai.jpg',
    imageAlt: 'Progress panel: topics learned and study days',
    summary: 'A personal tutor inside Claude Code: maps a learning path and brings topics back when they are due.',
    tech: [T.python, T.claude],
    links: [{ label: 'View code', url: gh('teach-yourself-ai') }],
    group: 'more',
  },
  {
    name: 'timewent',
    year: '2026',
    image: 'images/projects/timewent.jpg',
    imageAlt: 'timewent panel: where your time went in a session',
    summary: 'A tiny, local-first time tracker for macOS. No timers, no labels: see where your time went.',
    tech: [T.rust, T.tauri],
    links: [{ label: 'View code', url: gh('timewent') }],
    group: 'more',
  },
  {
    name: 'LLM Provider Layer',
    year: '2025',
    image: 'images/projects/provider.png',
    imageAlt: 'One layer routes to OpenAI and falls back to Anthropic',
    summary:
      'One interface over OpenAI and Anthropic, with retry and fallback, so an outage or rate limit does not stop the workflow.',
    tech: [T.typescript, T.openai, T.anthropic],
    links: [],
    group: 'more',
  },
  {
    name: 'Video Automation Pipeline',
    year: '2025',
    image: 'images/projects/video.png',
    imageAlt: 'JSON to script to voice to mp4',
    summary: 'Structured JSON in, publish-ready video out: LLM-written scripts, ElevenLabs voiceovers, FFmpeg rendering.',
    tech: [T.node, T.openai, T.elevenlabs, T.ffmpeg],
    links: [],
    group: 'more',
  },
  {
    name: 'Reporting & analytics engine',
    year: '2020–25',
    image: 'images/projects/reporting.png',
    imageAlt: 'User SQL runs through an engine into charts',
    client: arteon,
    summary: 'Runs dynamic, user-defined SQL on Oracle and MySQL, with Redis caching and Angular dashboards.',
    tech: [T.angular, T.node, T.mysql, T.redis],
    links: [],
    group: 'client',
  },
  {
    name: 'MES & ERP integrations',
    year: '2020–25',
    image: 'images/projects/mes.png',
    imageAlt: 'Factory MES and ERP stay in sync',
    client: arteon,
    summary: 'Moves production data between factory systems and business workflows.',
    tech: [T.angular, T.node],
    links: [],
    group: 'client',
  },
  {
    name: 'Project management platform',
    year: '2020–25',
    image: 'images/projects/gantt.png',
    imageAlt: 'A Gantt chart with three tasks',
    client: arteon,
    summary: 'My first product after the MES work: an interactive Gantt chart for planning tasks and dependencies, with real-time task tracking.',
    tech: [T.angular, T.node],
    links: [],
    group: 'client',
  },
];

export const roles: Role[] = [
  {
    title: 'Independent Software Engineer',
    org: 'Own products, remote',
    period: 'Jun 2025 – now',
    logo: { kind: 'text', text: 'GDK' },
    summary: 'Client work and my own products.',
    highlights: [
      { name: 'Multi-Channel Inventory Sync', text: 'Stock sync across sales channels, starting with Shopify.', current: true },
      { name: 'Bank Agent Lab', text: 'AI agent for transaction risk review, with evals.' },
      { name: 'Content Pilot', text: 'Multi-tenant SaaS for scheduling AI-written posts.' },
      { name: 'Video Automation Pipeline', text: 'JSON to publish-ready video with LLM scripts and voiceovers.' },
      { name: 'LLM Provider Layer', text: 'OpenAI and Anthropic behind one interface, with fallback.' },
      { name: 'timewent and Teach Yourself AI', text: 'Open-source tools I use every day.' },
    ],
  },
  {
    title: 'Full-Stack Engineer',
    org: 'ARTEON Software Consultancy',
    period: 'Feb 2020 – Jun 2025',
    logo: { kind: 'image', src: 'images/logos/arteon.png', dark: true },
    summary:
      'Owned products end to end in a small team: backend architecture, database design and production deployments, working directly with clients. Started as an intern.',
    highlights: [
      {
        name: 'Production on client servers',
        text: 'Deployed and ran apps on customer-managed Linux and Windows (IIS) servers with Nginx, PM2 and Docker, in isolated on-premises networks.',
      },
      {
        name: 'MES & ERP integrations',
        text: 'Moved production data between factory systems and business workflows.',
      },
      {
        name: 'Project management platform',
        text: 'My first product after the MES work: Gantt planning, real-time task tracking, REST API.',
      },
      {
        name: 'No-code API platform',
        text: 'Built its core: models designed visually become JWT-protected CRUD APIs.',
      },
      {
        name: 'Reporting engine',
        text: 'User-defined SQL on Oracle and MySQL, Redis caching, Angular dashboards.',
      },
      {
        name: 'Shared automation',
        text: 'Scheduled jobs for monitoring and reporting, reused across client projects. Also started the social media scheduler that became Content Pilot.',
      },
    ],
  },
  {
    title: 'Long-term Intern',
    org: 'H&M',
    period: '2018 – 2019',
    logo: { kind: 'image', src: 'images/logos/hm.svg' },
    summary: 'Corporate office, structured team workflows.',
  },
];

export const education: Education[] = [
  { title: 'B.Sc. Textile Engineering', org: 'Istanbul Technical University', period: '2014 – 2019', note: 'Taught 100% in English.' },
  { title: 'B.Sc. Management Information Systems', org: 'Anadolu University', period: '2025 – now' },
];

export const languages = [
  'Turkish (native)',
  'English (C1; 6-month advanced program at ILSC Sydney)',
  'IBM Full-Stack Developer course, 2024–2025',
];

export const posts: Post[] = [
  {
    platform: 'LinkedIn post',
    date: 'Oct 2026',
    title: 'Quick question: 400K of 1M, new topic. What now?',
    summary: 'A one-question quiz: why a long chat costs more on every message, even when the context window is far from full.',
    image: 'images/writing/context.png',
    url: 'https://www.linkedin.com/posts/g-deniz-karatas_llm-contextengineering-share-7520449736634417152-syTx/',
  },
  {
    platform: 'LinkedIn post',
    date: 'Oct 2026',
    title: 'Fewer words, more tokens: Turkish vs English',
    summary: '1012 parallel sentences: Turkish costs 1.43× the tokens of English on GPT-5, down from 1.92× on GPT-4.',
    image: 'images/writing/tokens.png',
    url: 'https://www.linkedin.com/posts/g-deniz-karatas_llm-tokenization-share-7518996453126709248-ZMhc/',
  },
  {
    platform: 'LinkedIn post',
    date: 'Oct 2026',
    title: 'How AI agents reverse engineer apps',
    summary: "I read REA's source: no model calls inside, Ghidra does the decompiling, the agent carries the evidence.",
    image: 'images/writing/rea.png',
    url: 'https://www.linkedin.com/posts/g-deniz-karatas_reverseengineering-aiagents-share-7516879761185554433-aMDC/',
  },
  {
    platform: 'Medium article',
    date: 'Jun 2025',
    title: 'Understanding extends and super() in TypeScript classes',
    summary: 'How class inheritance works in TypeScript, and why super() comes first in a subclass constructor.',
    image: 'images/writing/typescript.png',
    url: 'https://medium.com/@karatas.gun/understanding-extends-and-super-in-typescript-classes-27ac827ca263',
  },
];

export const books: Book[] = [
  {
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt',
    cover: 'images/books/pragmatic-programmer.webp',
    note: 'More about habits than code. Taking small, reversible steps is still the advice I find most useful.',
  },
  {
    title: 'AI Engineering',
    author: 'Chip Huyen',
    cover: 'images/books/ai-engineering.webp',
    note: 'Grounded, not hype. Treats evaluation as the real work of building with foundation models.',
  },
  {
    title: 'A Philosophy of Software Design',
    author: 'John Ousterhout',
    cover: 'images/books/philosophy-of-software-design.webp',
    note: 'Short and practical. It changed how I think about where complexity should live.',
  },
  {
    title: 'Effective TypeScript',
    author: 'Dan Vanderkam',
    cover: 'images/books/effective-typescript.webp',
    note: 'Less about clever types, more about making mistakes harder to write.',
  },
];
