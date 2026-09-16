create table if not exists study_stats (
  user_id text primary key,
  display_name text not null default 'Học viên',
  xp integer not null default 0,
  quizzes integer not null default 0,
  correct integer not null default 0,
  total integer not null default 0,
  streak integer not null default 0,
  minutes integer not null default 0,
  daily_best integer not null default 0,
  updated_at timestamptz not null default now()
);

create index if not exists study_stats_xp_idx on study_stats (xp desc);
