import { PriorityOption } from "./BookDemoTypes";

export const PRIORITY_DEFINITIONS: PriorityOption[] = [
  {
    id: "collections",
    label: "Collections & receivables",
    tagline: "Turn follow-up into focus",
    contextTitle: "Turn follow-up into focus.",
    contextDesc: "Explore what’s delaying cash—and where your team can act.",
    svgPath: "M4 5h14v14H4z M8 9h6 M8 13h4 M17 4v4 M15 6h4",
  },
  {
    id: "cash",
    label: "Cash visibility",
    tagline: "See your cash position",
    contextTitle: "See your cash position.",
    contextDesc: "Connect expected receipts and commitments for a clearer cash position.",
    svgPath: "M3 17V7h16v10z M3 10h16 M7 14h3",
  },
  {
    id: "procurement",
    label: "Procurement & payables",
    tagline: "Connect spend and suppliers",
    contextTitle: "Connect spend and suppliers.",
    contextDesc: "Explore connected purchases, invoices and payment decisions.",
    svgPath: "M3 4h2l3 11h10l3-8H6 M9 19h.01 M17 19h.01",
  },
  {
    id: "inventory",
    label: "Inventory & warehouse",
    tagline: "Keep stock and teams aligned",
    contextTitle: "Keep stock and teams aligned.",
    contextDesc: "See how inventory decisions connect to operations and working cash.",
    svgPath: "m3 8 9-5 9 5v9l-9 5-9-5z M3 8l9 5 9-5 M12 13v9 M7 5l10 6",
  },
  {
    id: "control",
    label: "GST & financial control",
    tagline: "Bring clarity to control",
    contextTitle: "Bring clarity to control.",
    contextDesc: "Explore how transactions, compliance and financial oversight connect.",
    svgPath: "m12 3 8 4v6c0 4-8 8-8 8s-8-4-8-8V7z M8 12l3 3 5-6",
    fullWidth: true,
  },
  {
    id: "explore",
    label: "Help me explore",
    tagline: "Find the right starting point",
    contextTitle: "Find the right starting point.",
    contextDesc: "We’ll start with your business and explore where flowOne may fit.",
    svgPath: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zm4-13-3 5-5 3 3-5z",
    fullWidth: true,
    dashed: true,
  },
];

export const ROLE_OPTIONS = [
  "CFO / Finance leader",
  "CEO / Business owner",
  "Finance controller / Accounts",
  "AR / Credit / Collections",
  "Operations / Procurement",
  "Warehouse / Inventory",
  "IT / Systems",
  "Other",
] as const;

export function getPriorityById(id: string): PriorityOption | undefined {
  return PRIORITY_DEFINITIONS.find((p) => p.id === id);
}
