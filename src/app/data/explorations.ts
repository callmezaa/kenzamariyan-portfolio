export interface Exploration {
  slug: string;
  title: string;
  caption: string;
  image: string;
  tag?: string;
}

// Placeholder data — replace `image` paths with your own exploration shots.
export const explorations: Exploration[] = [
  {
    slug: "contract-chill",
    title: "AI Contract Analyzer",
    caption: "Gemini-powered document review UI",
    image: "/image/contract-chill/screenshot/mockup.png",
    tag: "AI",
  },
  {
    slug: "interviewos",
    title: "Live Interview Studio",
    caption: "WebRTC + collaborative code editor",
    image: "/image/interviewOS/mockup.png",
    tag: "Realtime",
  },
  {
    slug: "assetra",
    title: "Digital Asset Marketplace",
    caption: "Creator economy storefront",
    image: "/image/assetra/mockup.png",
    tag: "Product",
  },
  {
    slug: "gotani-pos",
    title: "Offline-first POS",
    caption: "Mobile transaction cockpit",
    image: "/image/GotaniApp/mockup.png",
    tag: "Mobile",
  },
  {
    slug: "monetra",
    title: "Finance Dashboard",
    caption: "Go + React spending insights",
    image: "/image/monetra/mockup.png",
    tag: "Dashboard",
  },
  {
    slug: "nextalk",
    title: "Realtime Messenger",
    caption: "WebSocket chat with AI assistant",
    image: "/image/nextalkApp/mockup.png",
    tag: "Realtime",
  },
];
