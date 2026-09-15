import { Outlet } from "@tanstack/react-router";

/** Layout for list+detail route pairs (`foo.tsx` + `foo.$id.tsx`). */
export function RouteOutlet() {
  return <Outlet />;
}
