export type ServiceSlug =
  | "ai-agents"
  | "ai-receptionist"
  | "custom-website-building"
  | "app-building";

export type PricingTier = {
  name: "Basic" | "Pro" | "Premium";
  price: string;
  description: string;
  features: string[];
};

export type CaseStudy = {
  title: string;
  beforeLabel: string;
  afterLabel: string;
  beforeGradient: string;
  afterGradient: string;
  outcome: string;
};

export type ServicePortfolioItem = {
  title: string;
  metric?: string;
  gradient: string;
};

export type ServiceContent = {
  slug: ServiceSlug;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  process: { step: string; title: string; description: string }[];
  pricing: PricingTier[];
  portfolio: ServicePortfolioItem[];
  caseStudies: CaseStudy[];
  testimonials: { quote: string; author: string; role: string }[];
};

export const SERVICE_SLUGS: ServiceSlug[] = [
  "ai-agents",
  "ai-receptionist",
  "custom-website-building",
  "app-building"
];

export const SERVICES_CONTENT: Record<ServiceSlug, ServiceContent> = {
  "ai-agents": {
    slug: "ai-agents",
    title: "AI Agents",
    tagline: "Intelligent automation for your workflows.",
    description: "We build custom AI agents powered by cutting-edge LLMs to automate repetitive tasks, analyze data, and supercharge your team's productivity.",
    features: [
      "Custom LLM Integrations",
      "Workflow Automation",
      "Data Analysis & Reporting",
      "Internal Knowledge Bots",
      "24/7 Availability"
    ],
    process: [
      { step: "01", title: "Discovery", description: "Identifying bottlenecks in your current workflows." },
      { step: "02", title: "Architecture", description: "Designing the agent's logic and data access." },
      { step: "03", title: "Development", description: "Building and training the AI model." },
      { step: "04", title: "Deployment", description: "Seamless integration into your systems." }
    ],
    pricing: [
      { name: "Basic", price: "Custom", description: "Single-task agent", features: ["1 Workflow", "Standard LLM", "Basic Support"] },
      { name: "Pro", price: "Custom", description: "Multi-task agent", features: ["Up to 5 Workflows", "Custom Knowledge Base", "Priority Support"] },
      { name: "Premium", price: "Custom", description: "Enterprise AI Suite", features: ["Unlimited Workflows", "Fine-tuned Models", "24/7 Support"] }
    ],
    portfolio: [],
    caseStudies: [],
    testimonials: []
  },
  "ai-receptionist": {
    slug: "ai-receptionist",
    title: "AI Receptionist",
    tagline: "Never miss a customer inquiry again.",
    description: "Deploy an intelligent, conversational AI receptionist that handles calls, schedules appointments, and answers FAQs with human-like empathy.",
    features: [
      "Voice & Text Capabilities",
      "Appointment Scheduling",
      "Multilingual Support",
      "CRM Integration",
      "Sentiment Analysis"
    ],
    process: [
      { step: "01", title: "Scripting", description: "Defining the tone and conversational flows." },
      { step: "02", title: "Integration", description: "Connecting to your phone systems and calendar." },
      { step: "03", title: "Testing", description: "Ensuring natural and accurate responses." },
      { step: "04", title: "Go Live", description: "Activating your 24/7 virtual front desk." }
    ],
    pricing: [
      { name: "Basic", price: "Custom", description: "Text-based bot", features: ["Website Chat", "FAQ Handling", "Lead Capture"] },
      { name: "Pro", price: "Custom", description: "Voice & Text", features: ["Voice Calls", "Appointment Booking", "CRM Sync"] },
      { name: "Premium", price: "Custom", description: "Omnichannel", features: ["All Channels", "Advanced Analytics", "Custom Voices"] }
    ],
    portfolio: [],
    caseStudies: [],
    testimonials: []
  },
  "custom-website-building": {
    slug: "custom-website-building",
    title: "Custom Website Building",
    tagline: "Stunning, high-performance web experiences.",
    description: "We craft bespoke websites using modern frameworks like Next.js and Tailwind CSS, focusing on speed, accessibility, and vibrant cyberpunk aesthetics.",
    features: [
      "Responsive Design",
      "SEO Optimization",
      "Interactive 3D Elements",
      "CMS Integration",
      "Lightning Fast Load Times"
    ],
    process: [
      { step: "01", title: "Design", description: "Wireframing and UI/UX mockups." },
      { step: "02", title: "Development", description: "Coding the frontend and backend." },
      { step: "03", title: "Testing", description: "Cross-browser and performance checks." },
      { step: "04", title: "Launch", description: "Deploying to edge networks." }
    ],
    pricing: [
      { name: "Basic", price: "Custom", description: "Landing Page", features: ["Single Page", "Contact Form", "Mobile Responsive"] },
      { name: "Pro", price: "Custom", description: "Corporate Site", features: ["Up to 10 Pages", "CMS", "SEO Setup"] },
      { name: "Premium", price: "Custom", description: "Web App", features: ["Custom Functionality", "User Authentication", "Database Integration"] }
    ],
    portfolio: [],
    caseStudies: [],
    testimonials: []
  },
  "app-building": {
    slug: "app-building",
    title: "App Building",
    tagline: "Scalable mobile applications for your business.",
    description: "From concept to app store, we develop cross-platform mobile apps that deliver native-like performance and exceptional user experiences.",
    features: [
      "Cross-platform (iOS/Android)",
      "UI/UX Design",
      "API Integrations",
      "Push Notifications",
      "Secure Authentication"
    ],
    process: [
      { step: "01", title: "Prototyping", description: "Interactive app mockups." },
      { step: "02", title: "Build", description: "Developing core features." },
      { step: "03", title: "Beta Testing", description: "User feedback and refinement." },
      { step: "04", title: "Release", description: "App store submission and optimization." }
    ],
    pricing: [
      { name: "Basic", price: "Custom", description: "MVP App", features: ["Core Features", "One Platform", "Basic UI"] },
      { name: "Pro", price: "Custom", description: "Full App", features: ["iOS & Android", "Custom Design", "Backend Integration"] },
      { name: "Premium", price: "Custom", description: "Enterprise App", features: ["Advanced Security", "Scalable Infrastructure", "Ongoing Maintenance"] }
    ],
    portfolio: [],
    caseStudies: [],
    testimonials: []
  }
};

export function getServiceContent(slug: string): ServiceContent | undefined {
  return SERVICES_CONTENT[slug as ServiceSlug];
}
