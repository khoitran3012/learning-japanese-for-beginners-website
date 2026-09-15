import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LESSONS } from "@/data/lessons";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";

export const Route = createFileRoute("/_app/path/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const lesson = LESSONS.find((l) => l.id === id);
  if (!lesson) throw notFound();
  const complete = useProgress((s) => s.completeLesson);
  const done = useProgress((s) => s.completedLessonIds.has(id));
  const showRomaji = useSettings((s) => s.showRomaji);
  const next = LESSONS.filter((l) => l.order > lesson.order).sort((a, b) => a.order - b.order)[0];

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader kicker={lesson.stage} title={lesson.title} description={lesson.summary} />
      <Badge className="mb-4">{lesson.level === "0" ? "Nhập môn" : lesson.level}</Badge>
      <div className="space-y-4">
        {lesson.sections.map((s) => (
          <Card key={s.heading}>
            <CardContent>
              <h2 className="font-medium">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              {s.jp ? (
                <p className="mt-3 font-jp text-2xl">
                  {s.jp}
                  {showRomaji && s.romaji ? <span className="ml-3 text-base text-accent">{s.romaji}</span> : null}
                </p>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        <Button variant={done ? "secondary" : "success"} onClick={() => void complete(lesson.id)}>
          {done ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
        </Button>
        {next ? (
          <Button asChild>
            <Link to="/path/$id" params={{ id: next.id }}>Bài tiếp</Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
