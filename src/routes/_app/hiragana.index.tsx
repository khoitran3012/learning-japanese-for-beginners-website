import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KanaChart } from "@/components/kana-chart";
import { Button } from "@/components/ui/button";
import { HIRAGANA } from "@/data/kana";

export const Route = createFileRoute("/_app/hiragana/")({ component: Page });

function Page() {
  const first = HIRAGANA[0]!;
  return (
    <div>
      <PageHeader
        kicker="五十音"
        title="Hiragana"
        description="Bảng chữ mềm, dùng cho ngữ pháp và từ thuần Nhật. Bấm một chữ để học nét, nghe và ví dụ."
        actions={
          <Button asChild>
            <Link to="/hiragana/$id" params={{ id: first.id }}>
              Bắt đầu học
            </Link>
          </Button>
        }
      />
      <KanaChart kind="hiragana" chars={HIRAGANA} />
    </div>
  );
}
