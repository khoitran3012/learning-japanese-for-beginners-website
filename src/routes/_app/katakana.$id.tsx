import { createFileRoute, notFound } from "@tanstack/react-router";
import { StudyKana } from "@/components/study-kana";
import { KATAKANA } from "@/data/kana";

export const Route = createFileRoute("/_app/katakana/$id")({
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const idx = KATAKANA.findIndex((k) => k.id === id);
  if (idx < 0) throw notFound();
  return (
    <StudyKana
      kind="katakana"
      current={KATAKANA[idx]!}
      prev={KATAKANA[idx - 1]}
      next={KATAKANA[idx + 1]}
    />
  );
}
