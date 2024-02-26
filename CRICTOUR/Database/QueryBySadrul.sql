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

selecT*
from SCORECARD
where match_id=27;


-- scorecard(batting data) for a tournament
select s.*,p.first_name ||' '||p.last_name as player_name,t.team_name
from scorecard s
join person p on s.player_id = p.personid
join team t on s.team_id=t.team_id
where s.match_id=27 and s.run_scored is not null and s.team_id=72;


select* 
from PERSON;

-- Bowling data for match
select s.*,p.first_name ||' '||p.last_name as player_name,t.team_name
from scorecard s
join person p on s.player_id = p.personid
join team t on s.team_id=t.team_id
where s.match_id=27 and s.overs_bowled is not null and s.team_id=72
;

select* from admin;

select s.*,p.first_name ||' '||p.last_name as player_name,t.team_name
from scorecard s
join person p on s.player_id = p.personid
join team t on s.team_id=t.team_id
where s.match_id=21 and s.run_scored is not null and s.team_id=80
;

select m.team1_run,m.team2_run,m.team1_wicket, m.team2_wicket,m.match_date,tr.tournament_name,t.team_name as winner_name,v.venue_name, v.venue_id,v.location,p.first_name||' '||p.last_name as motm_name
from match m
join venue v on m.venue_id=v.venue_id
join person p on m.man_of_the_match=p.personid
join team t on t.team_id=m.winner
join tournament tr on m.tournament_id=tr.tournament_id
where match_id=21
;


select m.team1_run,m.team2_run,m.team1_wicket, m.team2_wicket,m.match_date,t.team_name as winner_name,tr.tournament_name,v.venue_name, v.venue_id,v.location,p.first_name||' '||p.last_name as motm_name
                from match m
                join venue v on m.venue_id=v.venue_id
                join person p on m.man_of_the_match=p.personid
                join team t on m.winner=t.team_id
                join tournament tr on m.tournament_id=tr.tournament_id
                where match_id=27;


-- counting total given extras
select sum(given_extras)
from scorecard
where team_id=72 and match_id=21 and overs_bowled is not null
group by team_id;

-- finding the best bowler of a team of a match
SELECT 
    PLAYER_ID,
	p.first_name||' '|| p.last_name as player_name,
    RUN_GIVEN,
    WICKET_TAKEN,
    OVERS_BOWLED,
    RUN_GIVEN / OVERS_BOWLED AS ECONOMY_RATE
FROM 
    SCORECARD s
	join person p on s.player_id=p.personid
WHERE 
    MATCH_ID = 21
    AND TEAM_ID = 72
    AND OVERS_BOWLED > 0
ORDER BY 
    ECONOMY_RATE ASC,
    WICKET_TAKEN DESC
;

-- the best batsman of a match for a particular team
SELECT 
    PLAYER_ID,
	p.first_name||' '||p.last_name as player_name,
    RUN_SCORED AS TOTAL_RUNS_SCORED,
    BALL_PLAYED AS TOTAL_BALLS_PLAYED,
    ROUND((RUN_SCORED * 1.0 /BALL_PLAYED)*100,2) AS STRIKE_RATE
FROM 
    SCORECARD s
	join person p on s.player_id=p.personid
WHERE 
    MATCH_ID = 21
    AND TEAM_ID = 72
    AND RUN_SCORED IS NOT NULL
ORDER BY 
    TOTAL_RUNS_SCORED DESC,
    STRIKE_RATE DESC
limit 1
;


select* from scorecard;

-- best batsman for both the team
SELECT 
    PLAYER_ID,
	player_name,
    RUN_SCORED,
    BALL_PLAYED,
    STRIKE_RATE
FROM (
    SELECT 
        PLAYER_ID,
	    P.FIRST_NAME||' '||P.LAST_NAME as player_name,
        RUN_SCORED,
        BALL_PLAYED,
        ROUND((RUN_SCORED * 1.0 / BALL_PLAYED) * 100, 2) AS STRIKE_RATE
    FROM 
        SCORECARD s
        JOIN PERSON P ON P.PERSONID=S.PLAYER_ID
    WHERE 
        MATCH_ID = 21
        AND TEAM_ID = 72
        AND RUN_SCORED IS NOT NULL
    ORDER BY 
        RUN_SCORED DESC,
        STRIKE_RATE DESC
    LIMIT 1
) AS TEAM1 
UNION
SELECT 
    PLAYER_ID,
	player_name,
    RUN_SCORED,
    BALL_PLAYED,
    STRIKE_RATE
FROM (
    SELECT 
        PLAYER_ID,
	    P.FIRST_NAME||' '||P.LAST_NAME as player_name,
        RUN_SCORED,
        BALL_PLAYED,
        ROUND((RUN_SCORED * 1.0 / BALL_PLAYED) * 100, 2) AS STRIKE_RATE
    FROM 
        SCORECARD s
        JOIN PERSON P ON P.PERSONID=S.PLAYER_ID
    WHERE 
        MATCH_ID = 21
        AND TEAM_ID = 80
        AND RUN_SCORED IS NOT NULL
    ORDER BY 
        RUN_SCORED DESC,
        STRIKE_RATE DESC
    LIMIT 1
) AS TEAM2;



-- similarly best bowler for the team of a particular match

SELECT 
  PLAYER_ID,
  PLAYER_NAME,
  RUN_GIVEN,
  WICKET_TAKEN,
  OVERS_BOWLED,
  ECONOMY_RATE
FROM
  (
	SELECT
        PLAYER_ID,
	    P.FIRST_NAME||' '||P.LAST_NAME AS player_name,
        RUN_GIVEN,
        WICKET_TAKEN,
        OVERS_BOWLED,
        ROUND((RUN_GIVEN*1.0 / OVERS_BOWLED),2) AS ECONOMY_RATE
    FROM 
      SCORECARD s
	  JOIN PERSON P ON P.PERSONID=S.PLAYER_ID
    WHERE 
      MATCH_ID = 21
      AND TEAM_ID = 72
      AND OVERS_BOWLED > 0
    ORDER BY 
     ECONOMY_RATE ASC,
     WICKET_TAKEN DESC
	LIMIT 1
  ) AS TEAM1
UNION
SELECT 
  PLAYER_ID,
  PLAYER_NAME,
  RUN_GIVEN,
  WICKET_TAKEN,
  OVERS_BOWLED,
  ECONOMY_RATE
FROM
  (
	SELECT
        PLAYER_ID,
	    P.FIRST_NAME||' '||P.LAST_NAME AS player_name,
        RUN_GIVEN,
        WICKET_TAKEN,
        OVERS_BOWLED,
        ROUND((RUN_GIVEN*1.0 / OVERS_BOWLED),2) AS ECONOMY_RATE
    FROM 
      SCORECARD s
	  JOIN PERSON P ON P.PERSONID=S.PLAYER_ID
    WHERE 
      MATCH_ID = 21
      AND TEAM_ID = 80
      AND OVERS_BOWLED > 0
    ORDER BY 
     ECONOMY_RATE ASC,
     WICKET_TAKEN DESC
	LIMIT 1
  ) AS TEAM2













