import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { HIRAGANA, KATAKANA } from "@/data/kana";

export const Route = createFileRoute("/_app/alphabet")({ component: Page });

function Page() {
  return (
    <div>
      <PageHeader
        kicker="文字"
        title="Bảng chữ cái"
        description="Ba lớp chữ bạn sẽ gặp: hiragana, katakana và kanji. Romaji chỉ là cầu tạm."
      />
      <div className="grid gap-4 md:grid-cols-2">
        <Link to="/hiragana">
          <Card className="h-full transition-colors hover:border-accent">
            <CardContent>
              <p className="text-kana text-5xl">あ</p>
              <h2 className="mt-3 font-display text-2xl">Hiragana</h2>
              <p className="mt-1 text-sm text-muted">{HIRAGANA.length} ký tự · ngữ pháp và từ thuần Nhật</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/katakana">
          <Card className="h-full transition-colors hover:border-accent">
            <CardContent>
              <p className="text-kana text-5xl">ア</p>
              <h2 className="mt-3 font-display text-2xl">Katakana</h2>
              <p className="mt-1 text-sm text-muted">{KATAKANA.length} ký tự · từ mượn và tên riêng</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/romaji">
          <Card className="h-full transition-colors hover:border-accent">
            <CardContent>
              <p className="text-kana text-5xl">A</p>
              <h2 className="mt-3 font-display text-2xl">Romaji</h2>
              <p className="mt-1 text-sm text-muted">Luyện chuyển đổi chữ Nhật ↔ Latin</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/radicals">
          <Card className="h-full transition-colors hover:border-accent">
            <CardContent>
              <p className="text-kana text-5xl">氵</p>
              <h2 className="mt-3 font-display text-2xl">Bộ thủ</h2>
              <p className="mt-1 text-sm text-muted">Phần chữ lặp trong kanji — học biến thể trước khi viết chữ</p>
            </CardContent>
          </Card>
        </Link>
        <Link to="/kanji">
          <Card className="h-full transition-colors hover:border-accent">
            <CardContent>
              <p className="text-kana text-5xl">日</p>
              <h2 className="mt-3 font-display text-2xl">Kanji</h2>
              <p className="mt-1 text-sm text-muted">Chữ Hán Nhật Bản, bắt đầu từ N5</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
