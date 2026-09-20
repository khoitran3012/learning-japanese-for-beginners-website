import type { CSSProperties, ReactNode } from "react";

export function Sprite({ className, style, children, title }: {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      style={style}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const SPRITES: Record<string, (props: { title?: string; className?: string; night?: boolean }) => ReactNode> = {
  sprout: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="32" cy="56" rx="10" ry="4" fill="#6b5a48" opacity="0.45" />
      <path d="M32 54 C32 40 32 28 32 20" stroke="#3d6b4f" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M32 34 C22 30 18 22 24 16 C28 22 32 26 32 34Z" fill="#7dba91" />
      <path d="M32 36 C42 32 46 22 40 16 C36 22 32 28 32 36Z" fill="#5d8a6a" />
    </Sprite>
  ),
  grass: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <path d="M18 56 C20 36 12 24 10 18" stroke="#3d6b4f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M28 56 C28 34 24 20 22 14" stroke="#5d8a6a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M38 56 C40 32 46 22 50 16" stroke="#3d6b4f" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M48 56 C48 38 54 28 58 22" stroke="#7dba91" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    </Sprite>
  ),
  wildflower: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <path d="M32 58 L32 30" stroke="#3d6b4f" strokeWidth="2" />
      <circle cx="32" cy="24" r="5" fill="#c45b52" />
      <circle cx="24" cy="26" r="4.5" fill="#e8b4b8" />
      <circle cx="40" cy="26" r="4.5" fill="#e8b4b8" />
      <circle cx="28" cy="18" r="4.2" fill="#f4efe6" />
      <circle cx="36" cy="18" r="4.2" fill="#f4efe6" />
      <circle cx="32" cy="24" r="2.4" fill="#d4a25a" />
    </Sprite>
  ),
  "flower-bed": ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="32" cy="50" rx="24" ry="8" fill="#6b5a48" opacity="0.35" />
      <circle cx="16" cy="38" r="5" fill="#c45b52" />
      <circle cx="28" cy="34" r="5.5" fill="#d4a25a" />
      <circle cx="40" cy="36" r="5" fill="#e8b4b8" />
      <circle cx="50" cy="40" r="4.5" fill="#8b9bb4" />
      <circle cx="22" cy="44" r="4" fill="#7dba91" />
    </Sprite>
  ),
  herb: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="32" cy="54" rx="12" ry="5" fill="#3d5c4a" opacity="0.4" />
      <ellipse cx="24" cy="40" rx="8" ry="12" fill="#5d8a6a" transform="rotate(-18 24 40)" />
      <ellipse cx="34" cy="36" rx="7" ry="14" fill="#7dba91" />
      <ellipse cx="42" cy="42" rx="8" ry="11" fill="#3d6b4f" transform="rotate(16 42 42)" />
    </Sprite>
  ),
  sakura: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <path d="M32 60 L32 34" stroke="#6b5a48" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M32 44 L18 32" stroke="#6b5a48" strokeWidth="2" />
      <path d="M32 40 L46 30" stroke="#6b5a48" strokeWidth="2" />
      <circle cx="32" cy="24" r="14" fill="#e8b4b8" />
      <circle cx="18" cy="30" r="9" fill="#f3c6c9" />
      <circle cx="46" cy="28" r="10" fill="#f7d6d8" />
      <circle cx="32" cy="22" r="6" fill="#f4efe6" opacity="0.7" />
    </Sprite>
  ),
  pine: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <rect x="29" y="44" width="6" height="16" rx="1" fill="#6b5a48" />
      <path d="M32 8 L48 28 L16 28 Z" fill="#3d5c4a" />
      <path d="M32 16 L50 38 L14 38 Z" fill="#3d6b4f" />
      <path d="M32 26 L52 50 L12 50 Z" fill="#5d8a6a" />
    </Sprite>
  ),
  maple: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <path d="M32 60 L32 36" stroke="#6b5a48" strokeWidth="3" />
      <path d="M32 20 L18 28 L24 18 L12 16 L24 12 L20 4 L32 12 L44 4 L40 12 L52 16 L40 18 L46 28 Z" fill="#c88870" />
      <circle cx="32" cy="22" r="6" fill="#d4a25a" />
    </Sprite>
  ),
  "ancient-tree": ({ title, className }) => (
    <Sprite className={className} title={title}>
      <path d="M32 62 C30 44 28 34 32 22" stroke="#5a4636" strokeWidth="7" fill="none" />
      <path d="M32 40 C18 36 12 28 14 20" stroke="#5a4636" strokeWidth="3" fill="none" />
      <circle cx="22" cy="18" r="12" fill="#3d5c4a" />
      <circle cx="40" cy="16" r="14" fill="#3d6b4f" />
      <circle cx="32" cy="10" r="11" fill="#5d8a6a" />
    </Sprite>
  ),
  stones: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="24" cy="44" rx="12" ry="8" fill="#8a8178" />
      <ellipse cx="40" cy="46" rx="10" ry="7" fill="#6b635b" />
      <ellipse cx="32" cy="38" rx="7" ry="5" fill="#7dba91" opacity="0.7" />
    </Sprite>
  ),
  path: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <path d="M20 58 C28 46 36 34 44 18" stroke="#c4b49a" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d="M20 58 C28 46 36 34 44 18" stroke="#ddd4c8" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7" />
    </Sprite>
  ),
  pond: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="32" cy="36" rx="26" ry="16" fill="#6d8ea8" />
      <ellipse cx="32" cy="36" rx="20" ry="11" fill="#7ea8c4" opacity="0.8" />
      <ellipse cx="24" cy="32" rx="8" ry="4" fill="#f4efe6" opacity="0.35" />
    </Sprite>
  ),
  bridge: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <path d="M8 44 C32 12 32 12 56 44" stroke="#8f6a4a" strokeWidth="5" fill="none" />
      <path d="M8 44 C32 18 32 18 56 44" stroke="#c4a574" strokeWidth="3" fill="none" />
      <path d="M16 36 L16 28" stroke="#8f6a4a" strokeWidth="2" />
      <path d="M48 36 L48 28" stroke="#8f6a4a" strokeWidth="2" />
    </Sprite>
  ),
  lantern: ({ title, className, night }) => (
    <Sprite className={className} title={title}>
      <rect x="22" y="40" width="20" height="6" rx="1" fill="#6b5a48" />
      <path d="M24 40 L32 16 L40 40" fill="#8a8178" />
      <rect x="26" y="24" width="12" height="12" rx="2" fill={night ? "#d4a25a" : "#ddd4c8"} />
      <rect x="30" y="12" width="4" height="6" fill="#6b5a48" />
    </Sprite>
  ),
  house: ({ title, className, night }) => (
    <Sprite className={className} title={title}>
      <rect x="14" y="30" width="36" height="24" rx="2" fill="#c4a574" />
      <path d="M10 32 L32 12 L54 32" fill="#6b5a48" />
      <rect x="18" y="14" width="8" height="10" fill="#6b5a48" />
      <rect x="28" y="38" width="10" height="16" fill="#5a4636" />
      <rect x="44" y="36" width="8" height="8" fill={night ? "#d4a25a" : "#8b9bb4"} />
    </Sprite>
  ),
  chime: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <path d="M32 8 L32 18" stroke="#6b5a48" strokeWidth="2" />
      <path d="M20 18 H44" stroke="#6b5a48" strokeWidth="2" />
      <rect x="22" y="22" width="5" height="16" rx="2" fill="#7ea8c4" />
      <rect x="30" y="20" width="5" height="20" rx="2" fill="#8b9bb4" />
      <rect x="38" y="22" width="5" height="16" rx="2" fill="#7dba91" />
    </Sprite>
  ),
  butterfly: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="22" cy="28" rx="12" ry="8" fill="#c45b52" />
      <ellipse cx="42" cy="28" rx="12" ry="8" fill="#d4a25a" />
      <ellipse cx="24" cy="40" rx="8" ry="6" fill="#e8b4b8" />
      <ellipse cx="40" cy="40" rx="8" ry="6" fill="#f4efe6" />
      <rect x="30" y="24" width="4" height="22" rx="2" fill="#3a3632" />
    </Sprite>
  ),
  bird: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="32" cy="34" rx="14" ry="9" fill="#8b9bb4" />
      <circle cx="46" cy="30" r="6" fill="#6d8ea8" />
      <path d="M50 30 L58 32 L50 34 Z" fill="#d4a25a" />
      <path d="M18 34 C12 24 8 20 6 18" stroke="#3a3632" strokeWidth="2" fill="none" />
      <circle cx="48" cy="28" r="1.4" fill="#1c1917" />
    </Sprite>
  ),
  frog: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="32" cy="40" rx="16" ry="12" fill="#5d8a6a" />
      <circle cx="22" cy="28" r="7" fill="#7dba91" />
      <circle cx="42" cy="28" r="7" fill="#7dba91" />
      <circle cx="22" cy="28" r="2.4" fill="#1c1917" />
      <circle cx="42" cy="28" r="2.4" fill="#1c1917" />
    </Sprite>
  ),
  squirrel: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="30" cy="38" rx="12" ry="10" fill="#c88870" />
      <circle cx="42" cy="28" r="8" fill="#c88870" />
      <path d="M16 40 C4 20 8 12 18 22 C22 30 18 38 16 40Z" fill="#b56a4e" />
      <circle cx="44" cy="26" r="1.6" fill="#1c1917" />
    </Sprite>
  ),
  cat: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <ellipse cx="34" cy="40" rx="18" ry="12" fill="#d7c4a8" />
      <circle cx="18" cy="28" r="10" fill="#d7c4a8" />
      <path d="M10 22 L14 12 L20 22Z" fill="#d7c4a8" />
      <path d="M18 22 L26 12 L28 24Z" fill="#d7c4a8" />
      <circle cx="16" cy="28" r="1.6" fill="#1c1917" />
      <path d="M50 42 C58 28 60 44 52 48" stroke="#d7c4a8" strokeWidth="4" fill="none" />
    </Sprite>
  ),
  fireflies: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <circle cx="18" cy="24" r="3" fill="#d4a25a" />
      <circle cx="32" cy="36" r="2.4" fill="#f4efe6" />
      <circle cx="46" cy="20" r="3.2" fill="#d4a25a" />
      <circle cx="40" cy="48" r="2" fill="#7dba91" />
    </Sprite>
  ),
  moon: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <circle cx="32" cy="32" r="16" fill="#f4efe6" />
      <circle cx="40" cy="26" r="12" fill="#2f4158" />
    </Sprite>
  ),
  star: ({ title, className }) => (
    <Sprite className={className} title={title}>
      <path d="M32 8 L36 24 L52 24 L40 34 L44 50 L32 40 L20 50 L24 34 L12 24 L28 24 Z" fill="#f4efe6" />
    </Sprite>
  ),
};

export function MascotMame({ waving }: { waving?: boolean }) {
  return (
    <svg viewBox="0 0 80 88" className={waving ? "garden-mascot-wave" : undefined} aria-hidden>
      <ellipse cx="40" cy="82" rx="16" ry="4" fill="#1c1917" opacity="0.18" />
      <ellipse cx="40" cy="50" rx="22" ry="26" fill="#f4efe6" />
      <ellipse cx="40" cy="56" rx="16" ry="14" fill="#7dba91" opacity="0.55" />
      <circle cx="32" cy="46" r="3.2" fill="#1c1917" />
      <circle cx="48" cy="46" r="3.2" fill="#1c1917" />
      <path d="M34 56 Q40 60 46 56" stroke="#8f3a32" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      <path d="M24 28 C18 12 28 10 32 22" fill="#5d8a6a" />
      <path d="M56 28 C62 12 52 10 48 22" fill="#5d8a6a" />
      <circle cx="58" cy="62" r="6" fill="#d4a25a" opacity="0.9" />
    </svg>
  );
}
