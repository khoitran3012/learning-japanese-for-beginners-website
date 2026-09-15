import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { KanaChart } from "@/components/kana-chart";
import { Button } from "@/components/ui/button";
import { KATAKANA } from "@/data/kana";

export const Route = createFileRoute("/_app/katakana/")({ component: Page });

function Page() {
  const first = KATAKANA[0]!;
  return (
    <div>
      <PageHeader
        kicker="カタカナ"
        title="Katakana"
        description="Cùng hệ âm với hiragana, nét thẳng — dùng cho từ mượn, tên nước ngoài và nhấn mạnh."
        actions={
          <Button asChild>
            <Link to="/katakana/$id" params={{ id: first.id }}>
              Bắt đầu học
            </Link>
          </Button>
        }
      />
      <KanaChart kind="katakana" chars={KATAKANA} />
    </div>
  );
}
