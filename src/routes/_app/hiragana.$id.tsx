import { createFileRoute, notFound } from "@tanstack/react-router";
import { StudyKana } from "@/components/study-kana";
import { HIRAGANA } from "@/data/kana";

export const Route = createFileRoute("/_app/hiragana/$id")({
  component: Page,
});

function Page() {
  const { id } = Route.useParams();
  const idx = HIRAGANA.findIndex((k) => k.id === id);
  if (idx < 0) throw notFound();
  return (
    <StudyKana
      kind="hiragana"
      current={HIRAGANA[idx]!}
      prev={HIRAGANA[idx - 1]}
      next={HIRAGANA[idx + 1]}
    />
  );
}
