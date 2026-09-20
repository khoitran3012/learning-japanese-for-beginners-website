import { SESSION_TOKEN_COOKIE } from "@/lib/auth/server";

/** Browser-safe cookie prefix on HTTP public hosts (no `__Host-` / Secure). */
const HTTP_PREFIX = "akari-auth.";
const HOST_PREFIX = "__Host-grok-auth.";

function requestHostname(request: Request): string {
  const raw =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";
  return raw.split(",")[0]?.trim().split(":")[0]?.toLowerCase() || "";
}

function requestProto(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-proto");
  if (forwarded) return forwarded.split(",")[0]!.trim().toLowerCase();
  try {
    return new URL(request.url).protocol.replace(":", "").toLowerCase();
  } catch {
    return "http";
  }
}

function loopback(hostname: string): boolean {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
}

function grokHost(hostname: string): boolean {
  return hostname.endsWith(".grok-sandbox.com") || hostname.endsWith(".grok.me");
}

/**
 * HTTP on a public hostname (khoitran3012.ddns.net, LAN IP, …) cannot store
 * `__Host-` / `Secure` cookies — the browser silently drops them and login
 * looks broken. HTTPS preview + localhost keep the template cookies.
 */
export function isHttpPublicSelfHost(request: Request): boolean {
  const host = requestHostname(request);
  if (!host || loopback(host) || grokHost(host)) return false;
  return requestProto(request) !== "https";
}

function expectedPrefix(): string {
  return SESSION_TOKEN_COOKIE.replace(/session_token$/, "");
}

function swapCookieNames(value: string, from: string, to: string): string {
  if (!from || from === to) return value;
  return value.split(from).join(to);
}

/** Map browser HTTP cookie names to whatever Better Auth is configured to read. */
export function rewriteIncomingAuthRequest(request: Request): Request {
  if (!isHttpPublicSelfHost(request)) return request;
  const cookie = request.headers.get("cookie");
  if (!cookie) return request;
  const expected = expectedPrefix();
  let next = cookie;
  if (expected === HOST_PREFIX && cookie.includes(HTTP_PREFIX)) {
    next = swapCookieNames(next, HTTP_PREFIX, HOST_PREFIX);
  } else if (expected === HTTP_PREFIX && cookie.includes(HOST_PREFIX)) {
    next = swapCookieNames(next, HOST_PREFIX, HTTP_PREFIX);
  }
  if (next === cookie) return request;
  try {
    request.headers.set("cookie", next);
    return request;
  } catch {
    const headers = new Headers(request.headers);
    headers.set("cookie", next);
    const init: RequestInit & { duplex?: "half" } = {
      method: request.method,
      headers,
    };
    if (request.body) {
      init.body = request.body;
      init.duplex = "half";
    }
    return new Request(request.url, init);
  }
}

function stripSecure(setCookie: string): string {
  return setCookie
    .replace(/;\s*Secure/gi, "")
    .replace(/;\s*Partitioned/gi, "");
}

/** Emit non-Secure `akari-auth.*` cookies so HTTP DDNS browsers will store them. */
export function rewriteOutgoingAuthResponse(request: Request, response: Response): Response {
  if (!isHttpPublicSelfHost(request)) return response;
  const cookies =
    typeof response.headers.getSetCookie === "function" ? response.headers.getSetCookie() : [];
  if (!cookies.length) return response;
  const headers = new Headers(response.headers);
  headers.delete("set-cookie");
  for (const raw of cookies) {
    let next = swapCookieNames(raw, HOST_PREFIX, HTTP_PREFIX);
    next = stripSecure(next);
    headers.append("set-cookie", next);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function handleSelfHostAuth(request: Request, handler: (req: Request) => Promise<Response>) {
  const incoming = rewriteIncomingAuthRequest(request);
  const response = await handler(incoming);
  return rewriteOutgoingAuthResponse(request, response);
}
