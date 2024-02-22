select m.*,pr.first_name ||' '||pr.last_name as motm_name, t1.team_name as winner_team_name, t2.team_name as team1_name, t3.team_name as team2_name,v.venue_name,v.location,t.host,t.tournament_name
from match m
join player p on m.man_of_the_match=p.playerid
join person pr on p.playerid=pr.personid
join team t1 on m.winner=t1.team_id
join team t2 on t2.team_id=m.team1_id
join team t3 on t3.team_id=m.team2_id
join venue v on m.venue_id=v.venue_id
join tournament t on  m.tournament_id=t.tournament_id
where m.tournament_id=4
order by m.match_date;

select* from person;

select* from scorecard;

select* from match;

select s.*,m.team1_id, m.team2_id
from scorecard s
join match m on s.match_id=m.match_id
where s.match_id=21 and s.team_id=72 and s.run_scored is not null
;

-- retreive data for the fastest half century
select  player_id,ball_for_half_century
from scorecard
where ball_for_half_century is not null and ball_for_half_century=
(
select min(ball_for_half_century)
	from scorecard
	where ball_for_half_century is not null
);

select team1_id, team2_id
from match
where match_id=21;


-- scorecard for a tournament
select s.*,p.first_name ||' '||p.last_name as player_name,t.team_name
from scorecard s
join person p on s.player_id = p.personid
join team t on s.team_id=t.team_id
where s.match_id=21 and s.run_scored is not null and s.team_id=80
;

select* 
from player;


















