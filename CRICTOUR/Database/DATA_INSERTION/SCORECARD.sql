-- -- Generate data for at least 20 match scores
-- INSERT INTO SCORECARD (PLAYER_ID, MATCH_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
-- SELECT
--     P.PLAYERID,
--     M.MATCH_ID,
--     T.TEAM_ID,
--     FLOOR(RANDOM() * 100) + 1 AS RUN_SCORED, -- Generate random run scored between 1 and 100
--     FLOOR(RANDOM() * 100) + 1 AS RUN_GIVEN, -- Generate random run given between 1 and 100
--     FLOOR(RANDOM() * 10) AS WICKET_TAKEN, -- Generate random wicket taken between 0 and 9
--     FLOOR(RANDOM() * 10) + 1 AS OVERS_BOWLED, -- Generate random overs bowled between 1 and 20
--     FLOOR(RANDOM() * 100) + 1 AS BALL_PLAYED, -- Generate random ball played between 1 and 100
--     FLOOR(RANDOM() * 10) AS GIVEN_EXTRAS, -- Generate random given extras between 0 and 9
--     FLOOR(RANDOM() * 5) AS MAIDEN_OVERS, -- Generate random maiden overs between 0 and 4
--     FLOOR(RANDOM() * 10) AS TOTAL_SIXES_HIT, -- Generate random total sixes hit between 0 and 9
--     FLOOR(RANDOM() * 20) AS TOTAL_FOURS_HIT, -- Generate random total fours hit between 0 and 19
--     FLOOR(RANDOM() * 50) + 15 AS BALL_FOR_HALF_CENTURY, -- Generate random balls for half century between 1 and 100
--     FLOOR(RANDOM() * 100) + 30 AS BALL_FOR_CENTURY -- Generate random balls for century between 1 and 200
-- FROM
--     PLAYER P
--     CROSS JOIN MATCH M
--     CROSS JOIN TEAM T
-- WHERE
--     -- M.YEAR = 2023 -- Filter matches in 2023 CWC AND 
--     (T.TEAM_NAME = 'BANGLADESH' OR T.TEAM_NAME = 'INDIA') -- Filter two teams
--     AND P.TEAM_ID = T.TEAM_ID -- Filter players from the two teams
-- -- Repeat the above INSERT statement to generate data for more matches and players if needed

INSERT INTO SCORECARD (SCORECARD_ID, PLAYER_ID, MATCH_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
SELECT
    ROW_NUMBER() OVER() AS SCORECARD_ID,
    PLAYERID,
    MATCH_ID,
    TEAM_ID,
    RUN_SCORED,
    RUN_GIVEN,
    WICKET_TAKEN,
    OVERS_BOWLED,
    BALL_PLAYED,
    GIVEN_EXTRAS,
    MAIDEN_OVERS,
    TOTAL_SIXES_HIT,
    TOTAL_FOURS_HIT,
    CASE
        WHEN RUN_SCORED >= 50 THEN FLOOR(RANDOM() * 50) + 15
        ELSE NULL
    END AS BALL_FOR_HALF_CENTURY,
    CASE
        WHEN RUN_SCORED >= 100 THEN FLOOR(RANDOM() * 100) + 30
        ELSE NULL
    END AS BALL_FOR_CENTURY
FROM (
    SELECT
        ROW_NUMBER() OVER() AS ROW_NUM,
        P.PLAYERID,
        M.MATCH_ID,
        T.TEAM_ID,
        FLOOR(RANDOM() * 150) + 1 AS RUN_SCORED,
        FLOOR(RANDOM() * 100) + 1 AS RUN_GIVEN,
        FLOOR(RANDOM() * 4) AS WICKET_TAKEN,
        FLOOR(RANDOM() * 10) + 1 AS OVERS_BOWLED,
        FLOOR(RANDOM() * 100) + 1 AS BALL_PLAYED,
        FLOOR(RANDOM() * 10) AS GIVEN_EXTRAS,
        FLOOR(RANDOM() * 5) AS MAIDEN_OVERS,
        FLOOR(RANDOM() * 6) AS TOTAL_SIXES_HIT,
        FLOOR(RANDOM() * 10) AS TOTAL_FOURS_HIT
    FROM
        PLAYER P
        CROSS JOIN MATCH M
        CROSS JOIN TEAM T
    WHERE
        (T.TEAM_NAME IN ('BANGLADESH', 'INDIA', 'PAKISTAN', 'AUSTRALIA', 'ENGLAND', 'SOUTH AFRICA', 'NEW ZEALAND', 'WEST INDIES', 'SRI LANKA', 'AFGHANISTAN', 'IRELAND', 'ZIMBABWE', 'SCOTLAND', 'NETHERLANDS'))
        AND P.TEAM_ID = T.TEAM_ID
) AS SUBQUERY
WHERE
    BALL_PLAYED <= RUN_SCORED + 10 AND
    TOTAL_SIXES_HIT * 6 + TOTAL_FOURS_HIT * 4 <= RUN_SCORED;

-- entering data for Nidahas Trophy
