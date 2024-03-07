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
     WHERE PLAYER_ID=S.PLAYER_ID AND (RUN_SCORED  IS NOT NULL OR OVERS_BOWLED IS NOT NULL)
  ) AS PLAYED_MATCH
FROM SCORECARD S
JOIN PERSON P ON  S.PLAYER_ID=P.PERSONID
JOIN PLAYER PL ON PL.PLAYERID=P.PERSONID
JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
WHERE TOURNAMENT_ID=4
GROUP BY S.PLAYER_ID,P.FIRST_NAME,P.LAST_NAME,T.TEAM_NAME
ORDER BY TOTAL_RUN DESC
LIMIT 7;

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
SELECT PLAYER_ID,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME, SUM( COALESCE(WICKET_TAKEN,0)) AS TOTAL_WICKET,
 (SELECT COUNT(*)
   FROM SCORECARD 
   WHERE PLAYER_ID=S.PLAYER_ID AND (OVERS_BOWLED IS NOT NULL OR RUN_SCORED IS NOT NULL)
 ) AS PLAYED_MATCH
FROM SCORECARD s
JOIN PERSON P ON S.PLAYER_ID=P.PERSONID
JOIN PLAYER PL ON PL.PLAYERID=P.PERSONID
JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
WHERE TOURNAMENT_ID=4
GROUP BY PLAYER_ID,P.FIRST_NAME,P.LAST_NAME,T.TEAM_NAME
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
	    CONCAT(PR.FIRST_NAME,' ',PR.LAST_NAME) AS PLAYER_NAME,
	    T.TEAM_NAME,
        SUM(COALESCE(sc.RUN_SCORED,0)) AS total_runs_scored,
        SUM(COALESCE(sc.RUN_GIVEN,0)) AS total_runs_given,
        SUM(COALESCE(sc.WICKET_TAKEN,0)) AS total_wickets_taken,
        SUM(COALESCE(sc.OVERS_BOWLED,0)) AS total_overs_bowled
    FROM
        PLAYER p
    LEFT JOIN
        SCORECARD sc ON p.PLAYERID = sc.PLAYER_ID
	JOIN 
	    PERSON PR ON PR.PERSONID=P.PLAYERID
	JOIN 
	    TEAM T ON T.TEAM_ID = P.TEAM_ID
	WHERE TOURNAMENT_ID=4
    GROUP BY
        p.PLAYERID,PR.FIRST_NAME,PR.LAST_NAME,T.TEAM_NAME
),
AllRounders AS (
    SELECT
        pp.PLAYERID,
	    PP.PLAYER_NAME,
	    PP.TEAM_NAME,
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
	A.PLAYER_NAME,
	A.TEAM_NAME,
    (a.total_runs_scored + a.total_wickets_taken) AS allrounder_score,
    a.total_runs_scored AS total_runs_scored,
    a.total_wickets_taken AS total_wickets_taken
FROM
    AllRounders a
ORDER BY
    allrounder_score DESC
LIMIT 5;


-- Retreiving data for top five batsman with the most strikerate
SELECT PLAYER_ID, RUN_SCORED, ROUND((RUN_SCORED*1.0/BALL_PLAYED)*100,2) AS STRIKE_RATE
FROM SCORECARD S
WHERE TOURNAMENT_ID=4
;

WITH T AS
(
SELECT 
	S.PLAYER_ID,
	CONCAT(PR.FIRST_NAME,' ',PR.LAST_NAME) AS PLAYER_NAME,
	T.TEAM_NAME,
	SUM(S.RUN_SCORED) AS  TOTAL_RUN,
	SUM(S.BALL_PLAYED) AS TOTAL_BALL_PLAYED
FROM 
	SCORECARD S
	JOIN PERSON PR ON PR.PERSONID = S.PLAYER_ID
	JOIN PLAYER P ON PR.PERSONID=P.PLAYERID
	JOIN TEAM T ON T.TEAM_ID=P.TEAM_ID
    WHERE RUN_SCORED IS NOT NULL AND S.TOURNAMENT_ID=4
	GROUP BY PLAYER_ID,PR.FIRST_NAME,PR.LAST_NAME,T.TEAM_NAME
    ORDER BY S.PLAYER_ID
)
SELECT 
   T.PLAYER_ID,
   T.PLAYER_NAME,
   T.TEAM_NAME,
   ROUND((T.TOTAL_RUN*1.0/T.TOTAL_BALL_PLAYED)*100,2) AS STRIKE_RATE
FROM T 
   ORDER BY STRIKE_RATE DESC
LIMIT 10
;

-- Retreiving data for most sixes
SELECT S.PLAYER_ID,CONCAT(PR.FIRST_NAME,' ',PR.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME, SUM(TOTAL_SIXES_HIT) AS TOTAL_SIX
FROM SCORECARD S
JOIN PERSON PR ON S.PLAYER_ID=PR.PERSONID
JOIN PLAYER P ON S.PLAYER_ID = P.PLAYERID
JOIN TEAM T ON T.TEAM_ID=P.TEAM_ID
WHERE S.TOTAL_SIXES_HIT IS NOT NULL AND S.TOURNAMENT_ID=4
GROUP BY S.PLAYER_ID,PR.FIRST_NAME,PR.LAST_NAME,T.TEAM_NAME
ORDER BY TOTAL_SIX DESC
LIMIT 10
;


SELECT S.PLAYER_ID,CONCAT(PR.FIRST_NAME,' ',PR.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME, SUM(TOTAL_FOURS_HIT) AS TOTAL_FOUR
FROM SCORECARD S
JOIN PERSON PR ON S.PLAYER_ID=PR.PERSONID
JOIN PLAYER P ON S.PLAYER_ID = P.PLAYERID
JOIN TEAM T ON T.TEAM_ID=P.TEAM_ID
WHERE S.TOTAL_SIXES_HIT IS NOT NULL AND S.TOURNAMENT_ID=4
GROUP BY S.PLAYER_ID,PR.FIRST_NAME,PR.LAST_NAME,T.TEAM_NAME
ORDER BY TOTAL_FOUR DESC
LIMIT 10
;

-- Union of most wicket taker with the best economy rate
SELECT PLAYER_ID, PLAYER_NAME, TEAM_NAME, TOTAL_WICKET,ECONOMY_RATE, PLAYED_MATCH
FROM (
    SELECT PLAYER_ID, CONCAT(P.FIRST_NAME, ' ', P.LAST_NAME) AS PLAYER_NAME, T.TEAM_NAME, 
           SUM(COALESCE(WICKET_TAKEN, 0)) AS TOTAL_WICKET,
	       ROUND(SUM(COALESCE(RUN_GIVEN * 1.0, 0)) / SUM(COALESCE(OVERS_BOWLED, 0)), 2) AS ECONOMY_RATE,
           (
               SELECT COUNT(*)
               FROM SCORECARD 
               WHERE PLAYER_ID = S.PLAYER_ID AND (OVERS_BOWLED IS NOT NULL OR RUN_SCORED IS NOT NULL)
           ) AS PLAYED_MATCH
    FROM SCORECARD s
    JOIN PERSON P ON S.PLAYER_ID = P.PERSONID
    JOIN PLAYER PL ON PL.PLAYERID = P.PERSONID
    JOIN TEAM T ON T.TEAM_ID = PL.TEAM_ID
    WHERE TOURNAMENT_ID = 4 AND OVERS_BOWLED IS NOT NULL
    GROUP BY PLAYER_ID, P.FIRST_NAME, P.LAST_NAME, T.TEAM_NAME
    ORDER BY TOTAL_WICKET DESC
    LIMIT 3
) AS TopPlayersByWickets

UNION

SELECT PLAYER_ID, PLAYER_NAME, TEAM_NAME, TOTAL_WICKET, ECONOMY_RATE, PLAYED_MATCH
FROM (
    SELECT PLAYER_ID, CONCAT(P.FIRST_NAME, ' ', P.LAST_NAME) AS PLAYER_NAME, T.TEAM_NAME, 
           SUM(COALESCE(WICKET_TAKEN, 0)) AS TOTAL_WICKET, 
           ROUND(SUM(COALESCE(RUN_GIVEN * 1.0, 0)) / SUM(COALESCE(OVERS_BOWLED, 0)), 2) AS ECONOMY_RATE,
           (
               SELECT COUNT(*)
               FROM SCORECARD 
               WHERE PLAYER_ID = S.PLAYER_ID AND (OVERS_BOWLED IS NOT NULL OR RUN_SCORED IS NOT NULL)
           ) AS PLAYED_MATCH
    FROM SCORECARD s
    JOIN PERSON P ON S.PLAYER_ID = P.PERSONID
    JOIN PLAYER PL ON PL.PLAYERID = P.PERSONID
    JOIN TEAM T ON T.TEAM_ID = PL.TEAM_ID
    WHERE TOURNAMENT_ID = 4 AND OVERS_BOWLED IS NOT NULL
    GROUP BY PLAYER_ID, P.FIRST_NAME, P.LAST_NAME, T.TEAM_NAME
    ORDER BY ECONOMY_RATE ASC, TOTAL_WICKET DESC
    LIMIT 1
) AS TopPlayersByEconomyRate;


-- Retreive a player details
SELECT PP.*,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME) AS PLAYER_NAME,PL.TYPE, T.TEAM_NAME,P.DATE_OF_BIRTH,(CURRENT_DATE-P.DATE_OF_BIRTH)/365 AS AGE
FROM PLAYER_PROFILE PP
JOIN PERSON P ON PP.PLAYERID=P.PERSONID
JOIN PLAYER PL ON PL.PLAYERID=P.PERSONID
JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
where PP.playerid=71101
;

SELECT* 
FROM PERSON;

SELECT S.PLAYER_ID,CONCAT(PR.FIRST_NAME,' ',PR.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME,TR.TOURNAMENT_NAME,SUM(RUN_SCORED) AS TOTAL_RUN,
  (
	  SELECT COUNT(*)
	  FROM SCORECARD
	  WHERE S.PLAYER_ID=PLAYER_ID
  ) AS MATCH_PLAYED,
  ROUND((
	  SELECT SUM(RUN_SCORED*1.0)/COUNT(*)
	  FROM SCORECARD
	  WHERE S.PLAYER_ID =PLAYER_ID AND RUN_SCORED IS NOT NULL
  ),0) AS AVERAGE,
  SUM(TOTAL_FOURS_HIT) AS TOTAL_FOUR, SUM(TOTAL_SIXES_HIT) AS TOTAL_SIX,
  (
	  SELECT COUNT(*)
	  FROM SCORECARD 
	  WHERE S.PLAYER_ID=PLAYER_ID AND BALL_FOR_HALF_CENTURY IS NOT NULL
  ) AS HALF_CENTURY,
  (
	  SELECT COUNT(*)
	  FROM SCORECARD 
	  WHERE S.PLAYER_ID=PLAYER_ID AND BALL_FOR_CENTURY IS NOT NULL
  ) AS CENTURY,
  SUM(OVERS_BOWLED) AS TOTAL_OVER_BOWLED,SUM(RUN_GIVEN) AS TOTAL_RUN_GIVEN, SUM(WICKET_TAKEN) AS TOTAL_WICKET,
  SUM(GIVEN_EXTRAS) AS TOTAL_EXTRA,SUM(MAIDEN_OVERS) AS TOTAL_MAIDEN
FROM SCORECARD S
JOIN PERSON PR ON S.PLAYER_ID=PR.PERSONID
JOIN PLAYER P ON P.PLAYERID=S.PLAYER_ID
JOIN TEAM T ON T.TEAM_ID=P.TEAM_ID
JOIN TOURNAMENT TR ON TR.TOURNAMENT_ID=S.TOURNAMENT_ID
JOIN MATCH M ON M.MATCH_ID=S.MATCH_ID
WHERE S.PLAYER_ID=71101 AND S.TOURNAMENT_ID=4
GROUP BY S.PLAYER_ID,PR.FIRST_NAME, PR.LAST_NAME,T.TEAM_NAME,TR.TOURNAMENT_NAME
ORDER BY S.PLAYER_ID
;

SELECT* 
FROM SCORECARD
;


























