import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ChoiceState = "idle" | "correct" | "wrong" | "revealed";

export function choiceState({
  revealed,
  isAnswer,
  picked,
}: {
  revealed: boolean;
  isAnswer: boolean;
  picked: boolean;
}): ChoiceState {
  if (!revealed) return "idle";
  if (isAnswer) return "correct";
  if (picked) return "wrong";
  return "revealed";
}

export function ChoiceRow({
  state = "idle",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  state?: ChoiceState;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      className={cn(
        "flex min-h-12 w-full items-center justify-start rounded-[10px] border px-4 py-3 text-left",
        "transition-colors duration-[var(--motion-quick)] ease-[var(--ease-smooth-out)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-100 active:scale-[0.99]",
        state === "idle" && "border-border bg-choice text-fg hover:bg-choice-hover",
        state === "correct" && "border-forest bg-mist text-fg",
        state === "wrong" && "border-seal bg-danger-soft text-fg",
        state === "revealed" && "border-border bg-bg-elevated text-muted",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function ChoiceKana({ children }: { children: ReactNode }) {
  return <span className="font-jp text-base font-medium leading-snug text-fg">{children}</span>;
}

export function ChoiceRomaji({ children }: { children: ReactNode }) {
  return <span className="text-sm font-normal leading-snug text-muted">{children}</span>;
}
