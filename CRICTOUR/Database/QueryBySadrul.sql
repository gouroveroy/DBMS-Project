select m.*,pr.first_name ||' '||pr.last_name as motm_name, t1.team_name as winner_team_name, t2.team_name as team1_name, t3.team_name as team2_name,v.venue_name
from match m
join player p on m.man_of_the_match=p.playerid
join person pr on p.playerid=pr.personid
join team t1 on m.winner=t1.team_id
join team t2 on t2.team_id=m.team1_id
join team t3 on t3.team_id=m.team2_id
join venue v on m.venue_id=v.venue_id
where tournament_id=4;

select* from person;