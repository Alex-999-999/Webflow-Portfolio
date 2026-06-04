import { createFileRoute } from "@tanstack/react-router";

import Work from "@/pages/Work";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — En Zuo" },
      {
        name: "description",
        content:
          "Webflow projects by En Zuo — SaaS marketing sites, DeFi product pages, advisory brands, and real estate experiences.",
      },
      { property: "og:title", content: "Work — En Zuo" },
      {
        property: "og:description",
        content:
          "Selected Webflow builds for SaaS, product, and property clients by En Zuo.",
      },
    ],
  }),
  component: Work,
});
