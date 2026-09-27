/**
 * =======================================================================
 * KINETIX LABS // CENTRALIZED TEAM & PORTFOLIO DATA CONFIGURATION
 * =======================================================================
 * Customize team identity, member profiles, featured projects, tech stack,
 * and contact links here. Changes automatically propagate across all sections.
 */

export const TEAM_INFO = {
  name: "KINETIX",
  taglineSuffix: "STUDIO",
  fullName: "KINETIX CREATIVE LABS",
  shortDescription: "A rogue creative engineering collective forging visceral 3D spatial interfaces, real-time kinetic interactions, and editorial web experiences.",
  established: "2026",
  availabilityStatus: "READY FOR HACKATHONS & CRAFT BUILDS",
  location: "GLOBAL // DISTRIBUTED COLLECTIVE",
  localTimezone: "IST (UTC+5:30)",
};

export const HERO_DATA = {
  headlinePrefix: "CRAFTING",
  headlineMain: "VISCERAL",
  headlineItalic: "Digital Realities",
  headlineSuffix: "WITHOUT LIMITS",
  subtext: "We dismantle generic web templates. Combining raw engineering precision with cinematic motion, WebGL shaders, and high-impact editorial design.",
  primaryCtaText: "EXPLORE SHOWCASE",
  primaryCtaLink: "#projects",
  secondaryCtaText: "INITIATE TRANSMISSION",
  secondaryCtaLink: "#contact",
  quickMetrics: [
    { label: "FRAME RATE", value: "60 FPS", detail: "hardware accelerated" },
    { label: "LATENCY", value: "0ms", detail: "instant micro-physics" },
    { label: "AESTHETICS", value: "100%", detail: "bespoke editorial" },
  ]
};

export const ABOUT_DATA = {
  sectionTag: "01 // PHILOSOPHY & MANIFESTO",
  headline: "WE DON'T BUILD WEBSITES. WE BUILD LIVING KINETIC ARTIFACTS.",
  manifesto: [
    "Most web applications are sterile grids and sanitized templates. We reject that mediocrity. Our collective was forged around a singular belief: the modern browser is the most expressive interactive canvas on Earth.",
    "By fusing brutalist typography with smooth mathematical physics, fluid WebGL graphics, and razor-sharp performance, we engineer digital experiences that hit users with immediate emotional weight."
  ],
  pillars: [
    {
      index: "01",
      title: "Radical Typography",
      accentWord: "Editorial Impact",
      desc: "Massive scale contrasts, high-fashion display italics paired with austere monospace data. Layouts that guide the eye with deliberate tension."
    },
    {
      index: "02",
      title: "Shader Sorcery",
      accentWord: "WebGL & 3D",
      desc: "Real-time generative particle fields, mathematical distortions, and reactive lighting. We treat every pixel as an organic, dynamic element."
    },
    {
      index: "03",
      title: "Tactile Physics",
      accentWord: "Sub-pixel Motion",
      desc: "Magnetic button snaps, inertia-weighted scrolling, and micro-audio feedback. The digital surface should respond with physical presence."
    }
  ],
  telemetry: [
    { metric: "28+", label: "PROTOTYPES SHIPPED", icon: "Boxes" },
    { metric: "99.9%", label: "ANIMATION SMOOTHNESS", icon: "Activity" },
    { metric: "14", label: "COMMUNITY AWARDS", icon: "Award" },
    { metric: "100%", label: "BESPOKE COMPONENTS", icon: "Zap" }
  ]
};

export const TEAM_MEMBERS = [
  {
    id: "kunal-sabale",
    name: "Kunal Sabale",
    role: "Lead Creative Technologist & 3D Engineer",
    badge: "CORE COLLECTIVE",
    bio: "Obsessed with low-level WebGL pipelines, reactive Three.js scenes, and fluid spatial interfaces. Pushes the boundaries where code meets kinetic art.",
    quote: "If it doesn't move with real physics, it's just a dead document.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    specialties: ["Three.js", "GLSL Shaders", "React Architecture", "Motion Systems"],
    socials: {
      github: "https://github.com/Kunal-sabale10",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    }
  },
  {
    id: "elena-vance",
    name: "Elena Vance",
    role: "Design Systems & Lead Motion Artist",
    badge: "VISUAL ARCHITECT",
    bio: "Master of micro-interactions and editorial typography hierarchies. Translates brand energy into hypnotic easing curves and scroll choreographies.",
    quote: "Great motion is never decorative; it's the rhythm of comprehension.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    specialties: ["Framer Motion", "Design Systems", "Typography", "Art Direction"],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    }
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    role: "Fullstack Architecture & Core Engines",
    badge: "SYSTEMS LEAD",
    bio: "Architects zero-lag runtime state, custom canvas renderers, and resilient client-side infrastructures. Keeps complex creative canvases running at solid 60 FPS.",
    quote: "Performance is not an afterthought; it is our primary creative constraint.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    specialties: ["Vite / React 19", "Web Audio API", "Performance Tuning", "Canvas APIs"],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    }
  },
  {
    id: "sofia-rodriguez",
    name: "Sofia Rodriguez",
    role: "UX Strategist & Creative Director",
    badge: "STRATEGY & CONCEPT",
    bio: "Connects futuristic aesthetic experiments to human intuition. Ensures every radical interaction feels immediately rewarding, accessible, and unforgettable.",
    quote: "The future belongs to interfaces that respect both intellect and emotion.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    specialties: ["UX Strategy", "Narrative Design", "Brand Systems", "Interaction Design"],
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    }
  }
];

export const PROJECTS_DATA = [
  {
    id: "aura-engine",
    title: "AURA ENGINE",
    subtitle: "Real-time Generative Sound & Spatial Visualizer",
    category: "3D WEBGL & AUDIO REACTIVE",
    year: "2026",
    role: "Full Build // Creative Tech",
    description: "An experimental browser workstation that converts ambient microphonic and audio frequencies into undulating parametric 3D mesh topologies with zero latency.",
    accent: "#d4ff00",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    tags: ["Three.js", "Web Audio API", "GLSL Shaders", "React 19"],
    metrics: { fps: "60 FPS locked", compute: "Web Audio AnalyserNode", latency: "< 4ms" },
    demoUrl: "https://github.com/Kunal-sabale10/team-portfolio-",
    githubUrl: "https://github.com/Kunal-sabale10/team-portfolio-",
    features: [
      "Dynamic procedural vertex displacement synchronized to audio band pass filters",
      "Custom post-processing bloom and chromatic aberration pipeline",
      "Seamless export of generative SVG stills and real-time audio playback",
      "Touch-enabled multi-axis camera orbit and inertial damping"
    ]
  },
  {
    id: "kinetix-studio",
    title: "VORTEX SPATIAL",
    subtitle: "Headless 3D Commerce & Interactive Showroom",
    category: "EXPERIMENTAL E-COMMERCE",
    year: "2026",
    role: "Architecture & Interaction",
    description: "A reimagined retail space featuring real-time photorealistic model raymarching, physics-driven product unpack animations, and magnetic navigational gestures.",
    accent: "#ff3800",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
    tags: ["React Three Fiber", "Tailwind CSS", "Framer Motion", "Lenis"],
    metrics: { loadTime: "0.8s", renderPasses: "Custom PBR", mobileScore: "98/100" },
    demoUrl: "https://github.com/Kunal-sabale10/team-portfolio-",
    githubUrl: "https://github.com/Kunal-sabale10/team-portfolio-",
    features: [
      "Progressive asset streaming with procedural wireframe placeholders",
      "Fluid scroll-driven camera trajectories tied to page narrative",
      "Interactive lighting studio allowing users to adjust key, fill, and rim lights",
      "Haptic micro-interactions on purchase checkpoints"
    ]
  },
  {
    id: "nexus-protocol",
    title: "NEXUS PROTOCOL",
    subtitle: "Cyberpunk Telemetry & Decentralized Analytics",
    category: "FINTECH & DATA VISUALIZATION",
    year: "2025",
    role: "Interface Design & Shaders",
    description: "High-density institutional dashboard rendering live cryptographic transactions through holographic particle constellations and topological surface maps.",
    accent: "#8b5cf6",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80",
    tags: ["Canvas API", "WebGL 2.0", "Tailwind CSS", "Lucide"],
    metrics: { dataPoints: "50,000 nodes", frameBudget: "16ms", responsiveness: "Adaptive" },
    demoUrl: "https://github.com/Kunal-sabale10/team-portfolio-",
    githubUrl: "https://github.com/Kunal-sabale10/team-portfolio-",
    features: [
      "Instanced mesh rendering of 50k transaction nodes with quadtree spatial partitioning",
      "Dual colorway optimization for daytime trading and midnight cyber rooms",
      "Tactile sound synthesis on high-value block validations",
      "Keyboard shortcut mastery with command palette integration"
    ]
  }
];

export const SKILLS_DATA = {
  sectionTag: "03 // CAPABILITIES & ARSENAL",
  headline: "THE CRAFT STACK",
  subtext: "Tools and paradigms we wield daily to engineer digital anomalies.",
  marqueeRow1: [
    "Three.js", "React 19", "GLSL Shaders", "Tailwind CSS", "Framer Motion",
    "WebGL 2.0", "Vite", "Lenis Smooth Scroll", "TypeScript", "Canvas 2D API"
  ],
  marqueeRow2: [
    "Web Audio API", "Blender 3D", "PostCSS", "Interaction Design", "Shader Art",
    "Performance Profiling", "GSAP Physics", "Git Architecture", "Reactive UI", "Awwwards Craft"
  ],
  categories: [
    {
      id: "creative-code",
      title: "3D & Creative Coding",
      description: "Generative mathematics, spatial coordinates, and hardware-accelerated shaders.",
      items: [
        { name: "Three.js & Scene Graphs", level: 95 },
        { name: "GLSL Shader Programming", level: 88 },
        { name: "Procedural Mesh Generation", level: 90 },
        { name: "Web Audio API Synthesis", level: 85 }
      ]
    },
    {
      id: "motion-ux",
      title: "Motion & Interaction",
      description: "Cinematic scroll timelines, spring physics, and micro-interactions.",
      items: [
        { name: "Framer Motion Choreography", level: 96 },
        { name: "Lenis Weighted Momentum", level: 94 },
        { name: "Magnetic Hover Physics", level: 92 },
        { name: "Layout Spring Transitions", level: 90 }
      ]
    },
    {
      id: "frontend-arch",
      title: "Core Architecture",
      description: "Zero-bloat modern web standards, build pipelines, and reactive state.",
      items: [
        { name: "React 19 & Component Architecture", level: 98 },
        { name: "Tailwind CSS Design Systems", level: 96 },
        { name: "Vite Bundler & HMR", level: 95 },
        { name: "Lighthouse 100 Performance", level: 92 }
      ]
    },
    {
      id: "art-direction",
      title: "Art Direction & Finish",
      description: "Editorial hierarchy, chromatic balance, and tactile atmosphere.",
      items: [
        { name: "Editorial Typography Scaling", level: 95 },
        { name: "Dual-Palette Dark/Light Logic", level: 94 },
        { name: "Noise & Grain Compositing", level: 90 },
        { name: "Glassmorphism & Lighting", level: 92 }
      ]
    }
  ]
};

export const CONTACT_DATA = {
  sectionTag: "04 // TRANSMISSION & COLLABORATION",
  headline: "LET'S BUILD SOMETHING EXTRAORDINARY",
  subtext: "Have an impossible creative vision or a high-stakes hackathon challenge? Drop us a transmission. We reply within 24 hours.",
  directEmail: "hello.kinetix@collective.dev",
  studioLocation: "PUNE / BENGALURU / REMOTE GLOBAL",
  workingHours: "IST: 10:00 - 22:00 // ALWAYS IN SYNC",
  budgetOptions: [
    "<$5K (Hackathon / MVP)",
    "$5K - $15K (Craft Build)",
    "$15K - $30K (Full 3D Platform)",
    "Just Connecting"
  ],
  projectTypes: [
    "3D WebGL Experience",
    "Design System & Motion",
    "Hackathon Core Build",
    "Editorial Portfolio"
  ],
  socials: [
    { label: "GITHUB", url: "https://github.com/Kunal-sabale10" },
    { label: "TWITTER / X", url: "https://twitter.com" },
    { label: "LINKEDIN", url: "https://linkedin.com" },
    { label: "DISCORD", url: "https://discord.com" },
  ]
};
