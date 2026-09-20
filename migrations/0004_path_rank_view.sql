create or replace view path_rank_by_stage as
select
  p.user_id,
  coalesce(max(s.display_name), 'Học viên') as display_name,
  p.stage,
  count(*)::int as completed
from path_progress p
left join study_stats s on s.user_id = p.user_id
group by p.user_id, p.stage;
