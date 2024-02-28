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
select s.*,round((s.run_scored*1.0/s.ball_played)*100,2) as strikerate,p.first_name ||' '||p.last_name as player_name,t.team_name
from scorecard s
join person p on s.player_id = p.personid
join team t on s.team_id=t.team_id
where s.match_id=21 and s.run_scored is not null and s.team_id=72;


select* 
from PERSON;

-- Bowling data for match
select s.*,round(s.run_given*1.0/s.overs_bowled,2)as economy,p.first_name ||' '||p.last_name as player_name,t.team_name
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


select m.team1_run,m.team2_run,m.team1_wicket, m.team2_wicket,m.match_date,t.team_name as winner_name,tr.tournament_name,v.venue_name, v.venue_id,tc.total_sold as total_spectators,v.location,p.first_name||' '||p.last_name as motm_name
                from match m
                join venue v on m.venue_id=v.venue_id
                join person p on m.man_of_the_match=p.personid
                join team t on m.winner=t.team_id
                join tournament tr on m.tournament_id=tr.tournament_id
				join ticket tc on m.match_id=tc.match_id
                where m.match_id=27;


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
	TOTAL_SIXES_HIT,
	TOTAL_FOURS_HIT,
	TEAM_NAME,
    STRIKE_RATE
FROM (
    SELECT 
        PLAYER_ID,
	    P.FIRST_NAME||' '||P.LAST_NAME as player_name,
        RUN_SCORED,
        BALL_PLAYED,
	    TOTAL_SIXES_HIT,
	    TOTAL_FOURS_HIT,
        T.TEAM_NAME AS TEAM_NAME,
        ROUND((RUN_SCORED * 1.0 / BALL_PLAYED) * 100, 2) AS STRIKE_RATE
    FROM 
        SCORECARD s
        JOIN PERSON P ON P.PERSONID=S.PLAYER_ID
	    JOIN PLAYER PL ON S.PLAYER_ID=PL.PLAYERID
	    JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
    WHERE 
        MATCH_ID = 21
        AND S.TEAM_ID = 72
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
	TOTAL_SIXES_HIT,
	TOTAL_FOURS_HIT,
	TEAM_NAME,
    STRIKE_RATE
FROM (
    SELECT 
        PLAYER_ID,
	    P.FIRST_NAME||' '||P.LAST_NAME as player_name,
        RUN_SCORED,
        BALL_PLAYED,
	    TOTAL_SIXES_HIT,
	    TOTAL_FOURS_HIT,
	    T.TEAM_NAME AS TEAM_NAME,
        ROUND((RUN_SCORED * 1.0 / BALL_PLAYED) * 100, 2) AS STRIKE_RATE
    FROM 
        SCORECARD s
        JOIN PERSON P ON P.PERSONID=S.PLAYER_ID
	    JOIN PLAYER PL ON S.PLAYER_ID=PL.PLAYERID
	    JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
    WHERE 
        MATCH_ID = 21
        AND S.TEAM_ID = 80
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
  ECONOMY_RATE,
  TEAM_NAME
FROM
  (
	SELECT
        PLAYER_ID,
	    P.FIRST_NAME||' '||P.LAST_NAME AS player_name,
        RUN_GIVEN,
        WICKET_TAKEN,
        OVERS_BOWLED,
	    T.TEAM_NAME AS TEAM_NAME,
        ROUND((RUN_GIVEN*1.0 / OVERS_BOWLED),2) AS ECONOMY_RATE
    FROM 
      SCORECARD s
	  JOIN PERSON P ON P.PERSONID=S.PLAYER_ID
	  JOIN PLAYER PL ON S.PLAYER_ID=PL.PLAYERID
	  JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
    WHERE 
      MATCH_ID = 21
      AND S.TEAM_ID = 72
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
  ECONOMY_RATE,
  TEAM_NAME
FROM
  (
	SELECT
        PLAYER_ID,
	    P.FIRST_NAME||' '||P.LAST_NAME AS player_name,
        RUN_GIVEN,
        WICKET_TAKEN,
        OVERS_BOWLED,
	    T.TEAM_NAME AS TEAM_NAME,
        ROUND((RUN_GIVEN*1.0 / OVERS_BOWLED),2) AS ECONOMY_RATE
    FROM 
      SCORECARD s
	  JOIN PERSON P ON P.PERSONID=S.PLAYER_ID
	  JOIN PLAYER PL ON S.PLAYER_ID=PL.PLAYERID
	  JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
    WHERE 
      MATCH_ID = 21
      AND S.TEAM_ID = 80
      AND OVERS_BOWLED > 0
    ORDER BY 
     ECONOMY_RATE ASC,
     WICKET_TAKEN DESC
	LIMIT 1
  ) AS TEAM2
  
  
--   finding two umpire for a match
SELECT MU.*,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME)
FROM MATCH_UMPIRE MU
JOIN PERSON P ON MU.UMPIRE_ID=P.PERSONID
WHERE MU.MATCH_ID=21
;

SELECT* 
FROM scorecard
where match_id=25;

update scorecard
set ball_played=null
where scorecard_id=95
;

update scorecard
set run_scored=null
where scorecard_id=95
;

SELECT th.*, round((th.win*1.0/th.total_match_played)*100,0) as team1_win_pct,100-round((th.win*1.0/th.total_match_played)*100,0) as team2_win_pct
FROM TEAM_HEAD_TO_HEAD th
where (team1_id=71 and team2_id=72) or(team1_id=72 and team2_id=71)
;

-- Query to retreive the awards candidate
SELECT PLAYER_ID, (SUM(RUN_SCORED)) AS TOTAL_RUN
FROM SCORECARD
GROUP BY PLAYER_ID
ORDER BY PLAYER_ID
;

WITH T AS(
SELECT PLAYER_ID, (SUM(RUN_SCORED)) AS TOTAL_RUN
FROM SCORECARD
GROUP BY PLAYER_ID
ORDER BY PLAYER_ID
)
SELECT MAX(T.TOTAL_RUN)
FROM T;

-- Most run scorer
WITH PlayerTotalRuns AS (
    SELECT PLAYER_ID, SUM(COALESCE(RUN_SCORED, 0)) AS TOTAL_RUN,SUM( COALESCE(BALL_PLAYED,0)) AS TOTAL_BALL_PLAYED,SUM( COALESCE(TOTAL_SIXES_HIT,0)) AS TOTAL_SIX,SUM( COALESCE(TOTAL_FOURS_HIT,0)) AS TOTAL_FOUR
    FROM SCORECARD
    GROUP BY PLAYER_ID
)
SELECT PLAYER_ID, TOTAL_RUN,TOTAL_BALL_PLAYED,TOTAL_SIX,TOTAL_FOUR
FROM PlayerTotalRuns
WHERE TOTAL_RUN = (SELECT MAX(TOTAL_RUN) FROM PlayerTotalRuns)
;

-- TOP FIVE MOST RUN SCORER
SELECT S.PLAYER_ID,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME, SUM(COALESCE(S.RUN_SCORED, 0)) AS TOTAL_RUN,
  (SELECT COUNT(*) 
     FROM SCORECARD 
     WHERE PLAYER_ID=S.PLAYER_ID AND RUN_SCORED  IS NOT NULL
  ) AS PLAYED_MATCH
FROM SCORECARD S
JOIN PERSON P ON  S.PLAYER_ID=P.PERSONID
JOIN PLAYER PL ON PL.PLAYERID=P.PERSONID
JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
WHERE TOURNAMENT_ID=4
GROUP BY S.PLAYER_ID,P.FIRST_NAME,P.LAST_NAME,T.TEAM_NAME
ORDER BY TOTAL_RUN DESC
LIMIT 5;

-- TOP WICKET TAKER
WITH PlyerTotalWicket AS(
SELECT PLAYER_ID, SUM( COALESCE(WICKET_TAKEN,0)) AS TOTAL_WICKET
FROM SCORECARD
GROUP BY PLAYER_ID
)
SELECT PLAYER_ID, TOTAL_WICKET
FROM PlyerTotalWicket
WHERE TOTAL_WICKET=(SELECT MAX(TOTAL_WICKET) FROM PlyerTotalWicket )

-- TOP FIVE WICKET TAKER
SELECT PLAYER_ID, SUM( COALESCE(WICKET_TAKEN,0)) AS TOTAL_WICKET
FROM SCORECARD
GROUP BY PLAYER_ID
ORDER BY TOTAL_WICKET DESC
LIMIT 5
;

SELECT *
FROM SCORECARD
WHERE TEAM_ID=80 AND PLAYER_ID=80107

UPDATE SCORECARD
SET OVERS_BOWLED=4
WHERE SCORECARD_ID=51
;

UPDATE SCORECARD
SET WICKET_TAKEN=3
WHERE SCORECARD_ID=51
;

UPDATE SCORECARD
SET MAIDEN_OVERS=0
WHERE SCORECARD_ID=51
;

-- Retreiving data for top five all-rounder
WITH PlayerPerformance AS (
    SELECT
        p.PLAYERID,
        SUM(sc.RUN_SCORED) AS total_runs_scored,
        SUM(sc.RUN_GIVEN) AS total_runs_given,
        SUM(sc.WICKET_TAKEN) AS total_wickets_taken,
        SUM(sc.OVERS_BOWLED) AS total_overs_bowled
    FROM
        PLAYER p
    LEFT JOIN
        SCORECARD sc ON p.PLAYERID = sc.PLAYER_ID
    GROUP BY
        p.PLAYERID
),
AllRounders AS (
    SELECT
        pp.PLAYERID,
        pp.total_runs_scored,
        pp.total_runs_given,
        pp.total_wickets_taken,
        pp.total_overs_bowled
    FROM
        PlayerPerformance pp
    WHERE
        EXISTS (
            SELECT 1
            FROM SCORECARD sc
            WHERE sc.PLAYER_ID = pp.PLAYERID
            AND sc.RUN_SCORED IS NOT NULL
            AND sc.OVERS_BOWLED IS NOT NULL
        )
)

SELECT
    a.PLAYERID,
    (a.total_runs_scored + a.total_wickets_taken) AS allrounder_score,
    a.total_runs_scored AS total_runs_scored,
    a.total_wickets_taken AS total_wickets_taken
FROM
    AllRounders a
ORDER BY
    allrounder_score DESC
LIMIT 5;




-- Retreiving data for both top wicket taker and top scorer
WITH TopRuns AS (
    SELECT PLAYER_ID, SUM(COALESCE(RUN_SCORED, 0)) AS TOTAL_RUN,
           ROW_NUMBER() OVER (ORDER BY SUM(COALESCE(RUN_SCORED, 0)) DESC) AS rn_run
    FROM SCORECARD
    GROUP BY PLAYER_ID
	ORDER BY TOTAL_RUN ASC
), TopWickets AS (
    SELECT PLAYER_ID, SUM(COALESCE(WICKET_TAKEN, 0)) AS TOTAL_WICKET,
           ROW_NUMBER() OVER (ORDER BY SUM(COALESCE(WICKET_TAKEN, 0)) DESC) AS rn_wicket
    FROM SCORECARD
    GROUP BY PLAYER_ID
    ORDER BY TOTAL_WICKET DESC
)
SELECT TR.PLAYER_ID, TR.TOTAL_RUN, TW.TOTAL_WICKET
FROM TopRuns TR
FULL JOIN TopWickets TW ON TR.PLAYER_ID = TW.PLAYER_ID
WHERE TR.rn_run <= 5 OR TW.rn_wicket <= 5;



 