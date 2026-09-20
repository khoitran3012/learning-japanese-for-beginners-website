import { createFileRoute } from "@tanstack/react-router";
import { auth } from "@/lib/auth/server";
import { handleSelfHostAuth } from "@/lib/akari/auth-http-cookies.server";

async function handle({ request }: { request: Request }) {
  return handleSelfHostAuth(request, (req) => auth.handler(req));
}

export const Route = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
    },
  },
});
