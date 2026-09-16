import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AuthSlot({ compact = false }: { compact?: boolean }) {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-border" aria-hidden />;
  }
  if (!user) {
    return (
      <Link
        to="/login"
        className="inline-flex h-9 items-center rounded-[10px] border border-border bg-surface px-3 text-sm hover:bg-bg-elevated"
      >
        Đăng nhập
      </Link>
    );
  }
  if (compact) {
    return (
      <UserButton />
    );
  }
  return <UserButton />;
}
