import { BookmarkPlus, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/lib/akari/progress";
import type { DictionaryEntry, SrsItem } from "@/lib/akari/types";

export function DictActions({
  entry,
  itemType = "vocab",
}: {
  entry: DictionaryEntry;
  itemType?: SrsItem["itemType"];
}) {
  const studyId = entry.vocabId ?? entry.id;
  const studyType = entry.vocabId ? "vocab" : itemType;
  const fav = useProgress((s) => s.favorites.has(entry.id));
  const mine = useProgress((s) => s.myWords.has(entry.id));
  const toggleFav = useProgress((s) => s.toggleFav);
  const addStudy = useProgress((s) => s.addToStudy);
  const remember = useProgress((s) => s.remember);
  const forgot = useProgress((s) => s.forgot);
  const known = (useProgress((s) => s.srs[studyId])?.correct ?? 0) > 0;

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant={fav ? "default" : "secondary"}
        onClick={async () => {
          const on = await toggleFav(entry.id, itemType);
          toast(on ? "Đã thêm yêu thích" : "Đã bỏ yêu thích");
        }}
      >
        <Star /> {fav ? "Đã thích" : "Yêu thích"}
      </Button>
      <Button
        variant={mine ? "default" : "secondary"}
        onClick={async () => {
          await addStudy(entry.id, itemType);
          toast(mine ? "Đã có trong từ của tôi" : "Đã thêm vào danh sách học");
        }}
      >
        <BookmarkPlus /> {mine ? "Trong từ của tôi" : "Thêm vào học"}
      </Button>
      <Button
        variant="secondary"
        onClick={async () => {
          await forgot(studyId, studyType);
          toast("Đánh dấu cần ôn");
        }}
      >
        Cần ôn
      </Button>
      <Button
        variant={known ? "success" : "default"}
        onClick={async () => {
          await remember(studyId, studyType);
          toast("Đã nhớ — sẽ ôn sau");
        }}
      >
        {known ? "Nhớ rồi" : "Đã nhớ"}
      </Button>
    </div>
  );
}
