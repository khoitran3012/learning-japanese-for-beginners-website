import { useRouter } from "@tanstack/react-router";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Client-side link for runtime paths that are not a typed route literal. */
export function DynamicLink({
  to,
  className,
  children,
}: {
  to: string;
  className?: string;
  children: ReactNode;
}) {
  const router = useRouter();
  function go(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    void router.navigate({ to: to as never });
  }
  return (
    <a href={to} className={cn(className)} onClick={go}>
      {children}
    </a>
  );
}
