import { Project, SkillCategory, KnowledgeNode, EducationItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Aryan Shukla',
  title: 'Systems & Software Developer',
  subtitle: 'Computer Engineering Student @ DBIT Mumbai (Expected May 2028)',
  location: 'Mumbai, Maharashtra, India',
  email: 'aryanshukla4132@gmail.com',
  github: 'https://github.com/Aryan4132',
  linkedin: 'https://linkedin.com/in/aryanshukla4132',
  tagline: 'Building offline-first desktop tools, custom data visualization engines, and full-stack backend caching systems.',
  bio: 'Computer engineering student focusing on software systems and interactive applications. Experienced in developing offline desktop tools with local ReAct agent loops, custom HTML5 Canvas rendering engines, zero-dependency parsers, and responsive web platforms with high-performance memory caching layers.',
};

export const PROJECTS: Project[] = [
  {
    id: 'meridian-x',
    title: 'Meridian-X',
    subtitle: 'Offline Desktop Assistant & Agent Loop',
    description: 'An offline-first desktop companion running local ReAct agent loops against Ollama models with Python sidecar services booting in ~1.5s.',
    fullDescription: 'Meridian-X is an autonomous local workspace companion built with Tauri, React 19, FastAPI, Ollama, and SQLite. It automates file workflows, parses documents (PDF, DOCX, CSV, MD), and executes multi-step tool calls locally without external cloud API dependencies.',
    category: 'ai',
    tags: ['Tauri', 'React 19', 'FastAPI', 'Ollama', 'SQLite', 'Python', 'ReAct Agent'],
    githubUrl: 'https://github.com/Aryan4132/Meridian-X',
    icon: 'Bot',
    metrics: [
      { label: 'Cloud API Cost', value: '$0.00' },
      { label: 'Sidecar Boot Time', value: '~1.5s' },
      { label: 'Tool Signature Repair', value: '100% AST' },
      { label: 'Data Privacy', value: 'Local-Only' },
    ],
    highlights: [
      'Engineered an AST signature validator using inspect.signature in Python to dynamically inspect tool functions and strip unexpected kwargs, eliminating local LLM tool-call crashes.',
      'Architected asynchronous execution paths separating read-only scans and write actions to prevent file-system locks and unsafe concurrent writes.',
      'Parses local documents (PDF, DOCX, CSV, MD) offline and maintains context via SQLite vector indexes.',
    ],
    architecture: [
      'Frontend: React 19 + Tailwind CSS in Tauri Webview',
      'Backend: Python / FastAPI sidecar initialized via Tauri IPC',
      'Inference Engine: Local Ollama API with streaming SSE response parser',
      'Database: SQLite for message history and document index embeddings',
    ],
  },
  {
    id: 'knowledge-graph',
    title: 'AI Knowledge Graph',
    subtitle: 'Workspace Visualizer & Native MCP Server',
    description: 'A local knowledge graph server watching workspace directories in real-time with a custom 60 FPS HTML5 Canvas force-directed graph engine.',
    fullDescription: 'A zero-dependency workspace visualizer that monitors project directories and renders files, notes, and database schemas as an interactive 2D force graph. Includes a native Model Context Protocol (MCP) server over stdio and SSE transport streams.',
    category: 'systems',
    tags: ['Node.js', 'Express', 'SQLite', 'React', 'Chokidar', 'HTML5 Canvas', 'MCP Protocol'],
    githubUrl: 'https://github.com/Aryan4132/Knowledge_Graph',
    icon: 'Network',
    metrics: [
      { label: 'Canvas Frame Rate', value: '60 FPS' },
      { label: 'Workspace Nodes', value: '40–50' },
      { label: 'Debounce Latency', value: '200ms' },
      { label: 'D3 Dependencies', value: '0 (Custom)' },
    ],
    highlights: [
      'Engineered a custom force-directed graph engine in TypeScript directly on HTML5 Canvas—without D3 dependencies—rendering 40-50 workspace nodes smoothly at 60 FPS.',
      'Built a 200ms debounced event queue in Chokidar to resolve UI node flashing caused by Windows atomic file system churn (unlink + add cycles).',
      'Exposed live graph structures to external tools by building a native Model Context Protocol (MCP) server over stdio and SSE transport streams.',
    ],
    architecture: [
      'Force Physics: Custom TypeScript spring-embedder simulation with Barnes-Hut repulsion',
      'Watcher Engine: Chokidar event queue with atomic-write debouncing',
      'Protocol Layer: Native MCP Server (stdio & SSE endpoints)',
      'UI Layer: HTML5 Canvas 2D Context with matrix zoom/pan controls',
    ],
  },
  {
    id: 'investiq',
    title: 'InvestIQ',
    subtitle: 'Full-Stack Portfolio Tracker & Local Advisory',
    description: 'Financial analytics platform featuring live Yahoo Finance equity feeds, transaction history logging, and a locally-hosted streaming advisor.',
    fullDescription: 'InvestIQ combines portfolio tracking with local data privacy. It provides real-time allocation tracking, backend stock quote caching, and an Ollama-driven financial advisor that streams analysis without transmitting personal portfolio data to cloud endpoints.',
    category: 'fullstack',
    tags: ['React 19', 'Express.js', 'MongoDB', 'Zustand', 'Ollama', 'Recharts', 'JWT'],
    githubUrl: 'https://github.com/Aryan4132/InvestIQ',
    icon: 'TrendingUp',
    metrics: [
      { label: 'Quote Latency', value: '<50ms' },
      { label: 'Latency Reduction', value: '93%' },
      { label: 'Auth Standard', value: 'JWT + HTTP Cookie' },
      { label: 'Advisor Cost', value: '100% Free' },
    ],
    highlights: [
      'Implemented an Express backend caching layer for Yahoo Finance API feeds, dropping stock ticker response latency by 93% (from ~800ms down to <50ms).',
      'Serves last-known good cached quotes automatically when third-party upstream requests fail or get rate-limited.',
      'Implemented secure JWT-based authentication with bcrypt password hashing and secure HTTP-only cookies.',
    ],
    architecture: [
      'Frontend: React 19 + Zustand state management + Recharts analytics',
      'Backend: Express.js REST API with memory caching middleware',
      'Local AI: Ollama llama3 model streaming via SSE',
      'Persistence: MongoDB document store for portfolio transactions',
    ],
  },
  {
    id: 'meridian-website',
    title: 'Meridian Landing Page',
    subtitle: 'Interactive Product Landing Page & Mascot Simulator',
    description: 'Landing page for Meridian-X featuring interactive mascot state preview widgets and product documentation viewer.',
    fullDescription: 'A responsive landing site for Meridian-X showcasing interactive simulator widgets, feature breakdowns, and documentation previews.',
    category: 'fullstack',
    tags: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
    githubUrl: 'https://github.com/Aryan4132/meridian_website',
    icon: 'Layers',
    metrics: [
      { label: 'Initial Load', value: '<1.0s' },
      { label: 'Mascot States', value: 'Interactive' },
      { label: 'Build Output', value: 'Vite Optimized' },
    ],
    highlights: [
      'Built an interactive mascot simulator component allowing visitors to preview agent state transitions directly in the browser.',
      'Fixed Framer Motion state lockup bugs during rapid tab switching by implementing lifecycle cleanup hooks inside useEffect.',
      'Designed responsive UI layouts with high visual clarity and zero render delay.',
    ],
    architecture: [
      'UI Framework: React 19 with TypeScript',
      'Animation Engine: Framer Motion state transitions',
      'Bundler: Vite production optimization',
    ],
  },
  {
    id: 'javamini',
    title: 'JavaMini Compiler',
    subtitle: 'Interpreter & AST Execution Engine',
    description: 'A lightweight compiler experiment built to parse subsets of Java/JS into AST representations and execute them end-to-end.',
    fullDescription: 'Built from scratch to master compiler fundamentals, JavaMini includes a handwritten lexer, recursive descent parser, Abstract Syntax Tree (AST) generator, and runtime evaluator.',
    category: 'tool',
    tags: ['JavaScript', 'Node.js', 'Compilers', 'AST', 'Lexer', 'Parser'],
    githubUrl: 'https://github.com/Aryan4132/javamini',
    icon: 'Code2',
    metrics: [
      { label: 'External Libs', value: 'Zero' },
      { label: 'Execution', value: 'AST Walk' },
      { label: 'Parse Speed', value: 'Instant' },
      { label: 'Scope', value: 'Control Flow' },
    ],
    highlights: [
      'Custom Lexer with regular expression tokenization and accurate error line reporting.',
      'Recursive Descent Parser building strongly-typed AST nodes.',
      'Tree-walking evaluator supporting variables, loops, conditionals, and arithmetic functions.',
    ],
    architecture: [
      'Lexical Analysis -> Token Stream -> AST Parser -> Scope Environment -> Evaluator Walk',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Systems & Backend',
    icon: 'Terminal',
    skills: [
      { name: 'Python', level: 'Advanced', description: 'FastAPI, inspect.signature AST validation, asyncio' },
      { name: 'Rust', level: 'Intermediate', description: 'Tauri IPC bindings, memory safety, CLI tools' },
      { name: 'C++', level: 'Proficient', description: 'Systems concepts, Data Structures & Algorithms' },
      { name: 'Node.js & Express', level: 'Advanced', description: 'Async event handling, backend caching, MCP servers' },
      { name: 'FastAPI', level: 'Advanced', description: 'Python sidecars, SSE streaming endpoints, OpenAPI' },
      { name: 'SQLite & PostgreSQL', level: 'Proficient', description: 'Local storage, indexing, schema design' },
      { name: 'MongoDB', level: 'Proficient', description: 'Document stores, Mongoose schema modeling' },
    ],
  },
  {
    title: 'Frontend & Web',
    icon: 'Layout',
    skills: [
      { name: 'TypeScript', level: 'Advanced', description: 'Strict typing, custom physics math, interfaces' },
      { name: 'React 19', level: 'Advanced', description: 'Hooks, concurrent state, custom canvas hooks' },
      { name: 'Three.js / HTML5 Canvas', level: 'Advanced', description: '3D scenes, custom 60 FPS force-directed graph physics' },
      { name: 'Tailwind CSS', level: 'Advanced', description: 'Dark aesthetics, responsive layouts, glassmorphism' },
      { name: 'Zustand / State', level: 'Proficient', description: 'Lightweight reactive state stores' },
      { name: 'Tauri', level: 'Proficient', description: 'Cross-platform desktop application shell' },
    ],
  },
  {
    title: 'AI & Local Tools',
    icon: 'Cpu',
    skills: [
      { name: 'Ollama & Local Models', level: 'Advanced', description: 'Llama 3, DeepSeek, local API integration' },
      { name: 'ReAct Agent Loops', level: 'Advanced', description: 'Offline Thought-Action-Observation loop design' },
      { name: 'MCP Protocol', level: 'Advanced', description: 'Model Context Protocol stdio & SSE servers' },
      { name: 'AST & Signature Healing', level: 'Advanced', description: 'Dynamic inspect.signature parameter validation' },
      { name: 'File Parsers', level: 'Proficient', description: 'PDF, DOCX, CSV, MD local text extractors' },
    ],
  },
  {
    title: 'Infrastructure & Tools',
    icon: 'Server',
    skills: [
      { name: 'Docker', level: 'Proficient', description: 'Containerized services and development environments' },
      { name: 'Git & GitHub Actions', level: 'Advanced', description: 'Version control and CI/CD pipelines' },
      { name: 'Chokidar', level: 'Advanced', description: 'Debounced OS atomic file event watching' },
      { name: 'REST APIs & SSE', level: 'Advanced', description: 'Server-Sent Events streaming & HTTP routing' },
      { name: 'Linux / Bash', level: 'Proficient', description: 'Shell scripting, system diagnostics' },
    ],
  },
];

export const KNOWLEDGE_GRAPH_NODES: KnowledgeNode[] = [
  { id: '1', label: 'Meridian-X Core', type: 'model', connections: ['2', '3', '4'], details: 'Offline ReAct Agent loop powered by local Ollama' },
  { id: '2', label: 'FastAPI Sidecar', type: 'mcp', connections: ['1', '5'], details: 'Python process booted in ~1.5s via Tauri IPC' },
  { id: '3', label: 'Ollama Llama3', type: 'model', connections: ['1', '6'], details: 'Local LLM inference engine with streaming SSE' },
  { id: '4', label: 'Signature Validator', type: 'tool', connections: ['1'], details: 'inspect.signature runtime tool parameter healing' },
  { id: '5', label: 'Chokidar Watcher', type: 'tool', connections: ['2', '7'], details: '200ms debounced atomic filesystem watcher' },
  { id: '6', label: 'Document Parsers', type: 'concept', connections: ['3', '8'], details: 'PDF, DOCX, CSV, MD local file indexer' },
  { id: '7', label: 'Canvas Engine 60FPS', type: 'file', connections: ['5', '9'], details: 'Zero-D3 custom force-directed spring physics' },
  { id: '8', label: 'MCP Stdio/SSE Server', type: 'mcp', connections: ['6', '9'], details: 'Native Model Context Protocol implementation' },
  { id: '9', label: 'InvestIQ Wealth Cache', type: 'concept', connections: ['7', '8'], details: 'Express memory cache reducing quote latency to <50ms' },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering in Computer Engineering',
    institution: 'Don Bosco Institute of Technology (DBIT)',
    location: 'Kurla, Mumbai, MH, India',
    timeline: '2024 – May 2028 (Expected)',
    status: 'In Progress (Degree Candidate)',
    coursework: [
      'Data Structures & Algorithms',
      'Operating Systems & Kernel Concepts',
      'Database Management Systems (DBMS)',
      'Computer Networks & Protocols',
      'Systems & Compiler Design',
    ],
  },
];
