import { useRouter } from "@tanstack/react-router";
import { forwardRef, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Client-side link for runtime paths that are not a typed route literal. */
export const DynamicLink = forwardRef<
  HTMLAnchorElement,
  { to: string; className?: string; children: ReactNode }
>(function DynamicLink({ to, className, children }, ref) {
  const router = useRouter();
  function go(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    void router.navigate({ to: to as never });
  }
  return (
    <a ref={ref} href={to} className={cn(className)} onClick={go}>
      {children}
    </a>
  );
});
