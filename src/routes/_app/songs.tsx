import { createFileRoute } from "@tanstack/react-router";
import { RouteOutlet } from "@/components/layout/route-outlet";

export const Route = createFileRoute("/_app/songs")({
  component: RouteOutlet,
});
