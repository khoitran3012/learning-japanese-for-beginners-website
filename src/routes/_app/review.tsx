import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/empty-state";
import { FlashcardDeck, type FlashCard } from "@/components/flashcard-deck";
import { useProgress } from "@/lib/akari/progress";
import { isDue } from "@/lib/akari/srs";
import { useSettings } from "@/lib/akari/settings";
import { resolveStudyItem } from "@/lib/dictionary/catalog";
import { shuffle } from "@/lib/utils";

export const Route = createFileRoute("/_app/review")({ component: Page });

function Page() {
  const srs = useProgress((s) => s.srs);
  const ready = useProgress((s) => s.ready);
  const showRomaji = useSettings((s) => s.showRomaji);
  const due = useMemo(() => Object.values(srs).filter(isDue), [srs]);

  const cards: FlashCard[] = useMemo(() => {
    return shuffle(due).map((item) => {
      const r = resolveStudyItem(item.id);
      return {
        id: item.id,
        front: r?.title ?? item.id,
        back: r?.sub ?? "",
        speak: r?.speak,
        type: item.itemType,
      };
    });
  }, [due, showRomaji]);

  return (
    <div>
      <PageHeader
        kicker="復習"
        title="Ôn tập"
        description="Phiên ôn các mục đến hạn theo spaced repetition. Lật thẻ, rồi chọn Quên / Khó / Nhớ / Dễ."
      />
      {!ready ? (
        <p className="text-sm text-muted">Đang tải tiến độ…</p>
      ) : (
        <FlashcardDeck
          cards={cards}
          sessionKey={`review-${ready ? "1" : "0"}-${showRomaji ? "ro" : "ja"}`}
          empty={
            <EmptyState
              title="Không có mục đến hạn"
              description="Học thêm chữ hoặc từ, rồi quay lại đây. Thẻ từ sẽ đưa thẻ mới vào hàng ôn."
              action={
                <Button asChild>
                  <Link to="/flashcards">Mở flashcard</Link>
                </Button>
              }
            />
          }
        />
      )}
    </div>
  );
}
