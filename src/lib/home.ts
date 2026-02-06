export interface ServicePillar {
  description: string;
  href: string;
  label: string;
  notes: readonly string[];
}

export interface ProcessStep {
  detail: string;
  title: string;
}

export interface StudioStat {
  label: string;
  value: string;
}

export interface ClientNote {
  client: string;
  quote: string;
}

export const servicePillars: readonly ServicePillar[] = [
  {
    description:
      "Full floral direction for ceremonies, receptions, and private celebrations.",
    href: "/contact",
    label: "Weddings & Events",
    notes: [
      "Floral concept and palette planning",
      "Personal flowers and installations",
      "On-site styling and strike"
    ]
  },
  {
    description:
      "Weekly or monthly floral styling for boutique hospitality spaces and lobbies.",
    href: "/contact",
    label: "Hospitality Styling",
    notes: [
      "Front desk and dining arrangements",
      "Seasonal refreshes",
      "Brand-aligned floral direction"
    ]
  },
  {
    description:
      "Compact custom work for gifting, dinner parties, and milestone moments.",
    href: "/contact",
    label: "Signature Deliveries",
    notes: [
      "Locally sourced premium stems",
      "Modern vessel pairings",
      "Flexible pickup and delivery windows"
    ]
  }
];

export const processSteps: readonly ProcessStep[] = [
  {
    detail:
      "We review your date, setting, budget range, and creative references to align scope.",
    title: "Inquiry & Discovery"
  },
  {
    detail:
      "A floral concept deck maps palette, flower movement, vessel style, and visual rhythm.",
    title: "Concept Direction"
  },
  {
    detail:
      "Stem selection, prep, and design execution are built around seasonality and longevity.",
    title: "Design & Production"
  },
  {
    detail:
      "Install, final styling, and cleanup ensure every arrangement is polished and complete.",
    title: "Install & Finish"
  }
];

export const studioStats: readonly StudioStat[] = [
  { label: "Events Designed", value: "80+" },
  { label: "Seasonal Collections", value: "24" },
  { label: "Editorial Shoots", value: "14" },
  { label: "Studio Response Time", value: "<24h" }
];

export const clientNotes: readonly ClientNote[] = [
  {
    client: "Wedding Client Placeholder",
    quote:
      "The designs felt sculptural and romantic without being overly formal. Every table had movement and personality."
  },
  {
    client: "Hospitality Client Placeholder",
    quote:
      "Our lobby arrangements transformed the atmosphere each week and consistently reflected our brand tone."
  }
];
