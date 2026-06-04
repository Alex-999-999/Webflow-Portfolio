import { createFileRoute } from "@tanstack/react-router";
import WorkProject from "@/pages/WorkProject";

export const Route = createFileRoute("/work/$slug")({
  component: WorkProject,
});
