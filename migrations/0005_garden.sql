create table if not exists garden_state (
  user_id text primary key,
  words_learned integer not null default 0,
  daily_bonus integer not null default 0,
  last_daily_date text,
  last_study_date text,
  sound_on boolean not null default false,
  placements jsonb not null default '[]'::jsonb,
  seen_unlocks jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists garden_events (
  id bigserial primary key,
  user_id text not null,
  kind text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists garden_events_user_idx on garden_events (user_id, created_at desc);
