import { cn } from "@/lib/utils";

const BLOSSOMS: Record<number, Array<[number, number, number]>> = {
  5: [
    [72, 86, 2.2],
    [96, 70, 2.4],
    [118, 80, 2.1],
    [84, 102, 1.8],
    [132, 98, 2],
  ],
  6: [
    [68, 82, 2.3],
    [90, 64, 2.5],
    [112, 72, 2.2],
    [128, 90, 2],
    [80, 98, 1.9],
    [104, 88, 2.4],
    [58, 104, 1.8],
    [140, 108, 2.1],
    [96, 78, 2],
  ],
  7: [
    [66, 78, 2.4],
    [88, 58, 2.6],
    [110, 66, 2.3],
    [126, 84, 2.2],
    [78, 94, 2],
    [102, 82, 2.5],
    [54, 102, 1.9],
    [144, 104, 2.2],
    [94, 72, 2.1],
    [118, 96, 2],
    [70, 110, 1.8],
    [136, 76, 2],
    [84, 54, 2.3],
  ],
};

export function SakuraTree({
  stage,
  compact = false,
  celebrate = false,
  className,
}: {
  stage: number;
  compact?: boolean;
  celebrate?: boolean;
  className?: string;
}) {
  const s = Math.max(0, Math.min(7, Math.floor(stage)));
  const bloom = s >= 5;
  const petals = BLOSSOMS[s] ?? BLOSSOMS[Math.min(s, 7)] ?? [];
  return (
    <svg
      viewBox="0 0 200 260"
      className={cn("tree-svg", compact && "tree-svg-compact", celebrate && "tree-celebrate", className)}
      role="img"
      aria-label={`Cây Sakura cấp ${s}`}
    >
      <title>Sakura</title>
      <defs>
        <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-sky)" stopOpacity="0.28" />
          <stop offset="70%" stopColor="var(--color-mist)" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="leafG" cx="42%" cy="38%" r="62%">
          <stop offset="0%" stopColor="var(--color-meadow)" />
          <stop offset="100%" stopColor="var(--color-forest)" />
        </radialGradient>
        <radialGradient id="bloomG" cx="46%" cy="36%" r="64%">
          <stop offset="0%" stopColor="var(--color-blossom)" />
          <stop offset="100%" stopColor="var(--color-seal)" stopOpacity="0.72" />
        </radialGradient>
      </defs>

      <rect width="200" height="260" fill="url(#skyG)" />
      <ellipse cx="100" cy="238" rx="72" ry="10" fill="var(--color-forest)" opacity="0.14" />
      <path d="M28 236c18-10 40-14 72-14s54 4 72 14v16H28z" fill="var(--color-forest)" opacity="0.22" />
      <path d="M48 236c6-10 10-12 8 0" stroke="var(--color-meadow)" strokeWidth="1.4" fill="none" opacity="0.7" />
      <path d="M150 236c-5-11-9-13-7 0" stroke="var(--color-forest)" strokeWidth="1.4" fill="none" opacity="0.65" />
      <path d="M62 237c4-8 8-9 5 1" stroke="var(--color-meadow)" strokeWidth="1.2" fill="none" opacity="0.55" />

      <g className={cn("tree-layer", s === 0 ? "is-on" : "is-off")}>
        <path d="M100 214c5.5 0 10 4.2 10 10.5 0 7.4-4.4 14.6-10 19.5-5.6-4.9-10-12.1-10-19.5 0-6.3 4.5-10.5 10-10.5z" fill="var(--color-bark)" />
        <ellipse cx="97" cy="222" rx="2.4" ry="1.6" fill="var(--color-blossom)" opacity="0.45" />
      </g>

      <g className={cn("tree-layer", s >= 1 ? "is-on" : "is-off")}>
        <g className={s >= 2 ? "tree-sway" : undefined}>
          {s === 1 ? (
            <>
              <path d="M100 232v-34" stroke="var(--color-bark)" strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M100 206c-10-2-14-8-16-14 6 2 12 4 16 8" fill="var(--color-meadow)" />
              <path d="M100 206c10-2 14-8 16-14-6 2-12 4-16 8" fill="var(--color-forest)" />
            </>
          ) : null}

          {s >= 2 ? (
            <path
              d={s >= 4 ? "M100 234c1-24 3-78 2-118" : "M100 234c1-18 2-56 1-78"}
              stroke="var(--color-bark)"
              strokeWidth={s >= 4 ? 7 : s >= 3 ? 5 : 3.4}
              strokeLinecap="round"
              fill="none"
            />
          ) : null}

          {s >= 3 ? (
            <>
              <path d="M101 168c-18-12-32-16-42-12" stroke="var(--color-bark)" strokeWidth="3.4" fill="none" strokeLinecap="round" />
              <path d="M101 158c18-12 30-15 40-11" stroke="var(--color-bark)" strokeWidth="3.2" fill="none" strokeLinecap="round" />
              <path d="M101 140c-8-18-10-28-6-38" stroke="var(--color-bark)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
              <path d="M101 134c10-16 14-26 11-38" stroke="var(--color-bark)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
            </>
          ) : null}

          {s === 2 ? (
            <path
              d="M78 150c8-22 16-32 22-34 8-2 16 8 24 32 4 14-6 22-22 24-16 0-28-8-24-22z"
              fill="url(#leafG)"
            />
          ) : null}

          {s >= 3 ? (
            <path
              d={
                s >= 4
                  ? "M48 128c8-38 28-62 52-66 30-4 52 18 60 48 6 22-8 42-38 50-18 6-42 4-58-8-16-12-22-18-16-24z"
                  : "M62 132c8-28 22-46 38-48 22-4 40 14 46 36 4 16-8 30-28 36-14 4-32 2-44-8-10-8-16-12-12-16z"
              }
              fill={bloom ? "url(#bloomG)" : "url(#leafG)"}
            />
          ) : null}

          {s >= 5
            ? petals.map(([x, y, r], i) => (
                <circle
                  key={`${x}-${y}-${i}`}
                  cx={x}
                  cy={y}
                  r={r}
                  fill="var(--color-surface)"
                  opacity={0.55 + (i % 4) * 0.1}
                />
              ))
            : null}
        </g>
      </g>

      {s >= 6 && !compact ? (
        <g className="tree-petals" aria-hidden>
          {Array.from({ length: s >= 7 ? 8 : 5 }).map((_, i) => (
            <ellipse
              key={i}
              className="tree-petal"
              cx={48 + ((i * 17) % 110)}
              cy="28"
              rx="2.1"
              ry="3.2"
              fill="var(--color-blossom)"
              opacity="0.8"
              style={{ animationDelay: `${i * 0.85}s` }}
            />
          ))}
        </g>
      ) : null}
    </svg>
  );
}
