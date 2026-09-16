create table if not exists path_progress (
  user_id text not null,
  lesson_id text not null,
  stage text not null,
  completed_at timestamptz not null default now(),
  primary key (user_id, lesson_id)
);

create index if not exists path_progress_stage_idx on path_progress (stage, user_id);
