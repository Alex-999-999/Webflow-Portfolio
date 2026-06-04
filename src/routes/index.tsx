import { createFileRoute } from "@tanstack/react-router";
import Index from "@/pages/Index";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "En Zuo" },
      {
        name: "description",
        content:
          "En Zuo — Webflow developer portfolio: SaaS marketing sites, DeFi launches, advisory brands, and real estate experiences.",
      },
      { property: "og:title", content: "En Zuo" },
      {
        property: "og:description",
        content: "Webflow portfolio by En Zuo.",
      },
    ],
  }),
  component: Index,
});
