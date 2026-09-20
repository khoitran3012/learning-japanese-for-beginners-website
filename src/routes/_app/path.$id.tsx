import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DynamicLink } from "@/components/dynamic-link";
import { SpeakButton } from "@/components/speak-button";
import { LESSONS } from "@/data/lessons";
import { useProgress } from "@/lib/akari/progress";
import { useSettings } from "@/lib/akari/settings";
import { lessonPracticeLinks } from "@/lib/akari/lesson-links";

export const Route = createFileRoute("/_app/path/$id")({ component: Page });

function Page() {
  const { id } = Route.useParams();
  const lesson = LESSONS.find((l) => l.id === id);
  if (!lesson) throw notFound();
  const complete = useProgress((s) => s.completeLesson);
  const done = useProgress((s) => s.completedLessonIds.has(id));
  const showRomaji = useSettings((s) => s.showRomaji);
  const next = LESSONS.filter((l) => l.order > lesson.order).sort((a, b) => a.order - b.order)[0];
  const practices = lessonPracticeLinks(lesson);
  const primary = practices[0];

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader kicker={lesson.stage} title={lesson.title} description={lesson.summary} />
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge>{lesson.level === "0" ? "Nhập môn" : lesson.level}</Badge>
        {done ? <Badge variant="success">Đã hoàn thành</Badge> : null}
      </div>

      {primary ? (
        <Card className="mb-4 border-primary/25 bg-bg-elevated">
          <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.14em] text-subtle">Chuyển tới bài học</p>
              <p className="mt-1 font-medium">{primary.label}</p>
              <p className="text-sm text-muted">Mở phần luyện tương ứng với bài này.</p>
            </div>
            <Button asChild className="shrink-0">
              <DynamicLink to={primary.to}>
                Vào bài học
                <ArrowRight />
              </DynamicLink>
            </Button>
          </CardContent>
        </Card>
      ) : null}

      <div className="space-y-4">
        {lesson.sections.map((s) => (
          <Card key={s.heading}>
            <CardContent>
              <h2 className="font-medium">{s.heading}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              {s.jp ? (
                <div className="mt-3 flex items-start justify-between gap-3">
                  <p className="font-jp text-2xl text-fg">
                    {s.jp}
                    {showRomaji && s.romaji ? <span className="ml-3 text-base text-fg">{s.romaji}</span> : null}
                  </p>
                  <SpeakButton text={s.jp} label="Nghe" />
                </div>
              ) : null}
            </CardContent>
          </Card>
        ))}
      </div>

      {practices.length > 1 ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {practices.map((p) => (
            <Button key={p.to} asChild variant="secondary" size="sm">
              <DynamicLink to={p.to}>
                <BookOpen />
                {p.label}
              </DynamicLink>
            </Button>
          ))}
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-2">
        {primary ? (
          <Button asChild>
            <DynamicLink to={primary.to}>
              Vào bài học
              <ArrowRight />
            </DynamicLink>
          </Button>
        ) : null}
        <Button variant={done ? "secondary" : "success"} onClick={() => void complete(lesson.id)}>
          {done ? "Đã hoàn thành" : "Đánh dấu hoàn thành"}
        </Button>
        {next ? (
          <Button asChild variant="secondary">
            <Link to="/path/$id" params={{ id: next.id }}>
              Bài tiếp
            </Link>
          </Button>
        ) : null}
      </div>
    </div>
  );
}
