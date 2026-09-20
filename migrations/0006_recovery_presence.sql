-- Password recovery codes (hashed) and live presence for signed-in learners.
-- Recovery is app-owned: no email/magic-link — the learner stores a one-time code.

create table if not exists account_recovery (
  user_id text primary key,
  email text not null,
  code_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists account_recovery_email_idx on account_recovery (email);

create table if not exists user_presence (
  user_id text primary key,
  display_name text not null default 'Học viên',
  last_seen timestamptz not null default now()
);

create index if not exists user_presence_seen_idx on user_presence (last_seen desc);
