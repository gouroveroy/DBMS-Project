-- -- GENERATE DATA FOR AT LEAST 20 MATCH SCORES
-- INSERT INTO SCORECARD (PLAYER_ID, MATCH_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
-- SELECT
--     P.PLAYERID,
--     M.MATCH_ID,
--     T.TEAM_ID,
--     FLOOR(RANDOM() * 100) + 1 AS RUN_SCORED, -- GENERATE RANDOM RUN SCORED BETWEEN 1 AND 100
--     FLOOR(RANDOM() * 100) + 1 AS RUN_GIVEN, -- GENERATE RANDOM RUN GIVEN BETWEEN 1 AND 100
--     FLOOR(RANDOM() * 10) AS WICKET_TAKEN, -- GENERATE RANDOM WICKET TAKEN BETWEEN 0 AND 9
--     FLOOR(RANDOM() * 10) + 1 AS OVERS_BOWLED, -- GENERATE RANDOM OVERS BOWLED BETWEEN 1 AND 20
--     FLOOR(RANDOM() * 100) + 1 AS BALL_PLAYED, -- GENERATE RANDOM BALL PLAYED BETWEEN 1 AND 100
--     FLOOR(RANDOM() * 10) AS GIVEN_EXTRAS, -- GENERATE RANDOM GIVEN EXTRAS BETWEEN 0 AND 9
--     FLOOR(RANDOM() * 5) AS MAIDEN_OVERS, -- GENERATE RANDOM MAIDEN OVERS BETWEEN 0 AND 4
--     FLOOR(RANDOM() * 10) AS TOTAL_SIXES_HIT, -- GENERATE RANDOM TOTAL SIXES HIT BETWEEN 0 AND 9
--     FLOOR(RANDOM() * 20) AS TOTAL_FOURS_HIT, -- GENERATE RANDOM TOTAL FOURS HIT BETWEEN 0 AND 19
--     FLOOR(RANDOM() * 50) + 15 AS BALL_FOR_HALF_CENTURY, -- GENERATE RANDOM BALLS FOR HALF CENTURY BETWEEN 1 AND 100
--     FLOOR(RANDOM() * 100) + 30 AS BALL_FOR_CENTURY -- GENERATE RANDOM BALLS FOR CENTURY BETWEEN 1 AND 200
-- FROM
--     PLAYER P
--     CROSS JOIN MATCH M
--     CROSS JOIN TEAM T
-- WHERE
--     -- M.YEAR = 2023 -- FILTER MATCHES IN 2023 CWC AND 
--     (T.TEAM_NAME = 'BANGLADESH' OR T.TEAM_NAME = 'INDIA') -- FILTER TWO TEAMS
--     AND P.TEAM_ID = T.TEAM_ID -- FILTER PLAYERS FROM THE TWO TEAMS
-- -- REPEAT THE ABOVE INSERT STATEMENT TO GENERATE DATA FOR MORE MATCHES AND PLAYERS IF NEEDED

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

-- ENTERING DATA NIDHAS TROPHY BY GOUROVE
-- SCORECARD INSERTION
-- MATCH-21
INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (1, 21, 72101, 72, NULL, NULL, NULL, NULL, 4, NULL, NULL, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (2, 21, 72102, 72, 90, NULL, NULL, NULL, 49, NULL, NULL, 6, 6, 30, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (3, 21, 72103, 72, 1, 14, 0, 2, 3, 0, 0, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (4, 21, 72104, 72, 37, NULL, NULL, NULL, 35, NULL, NULL, 3, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (5, 21, 72105, 72, 23, NULL, NULL, NULL, 23, NULL, NULL, 1, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (6, 21, 72106, 72, 13, NULL, NULL, NULL, 6, NULL, NULL, 2, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (7, 21, 72107, 72, NULL, 35, 1, 3, 0, 2, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (8, 21, 72108, 72, NULL, 28, 2, 4, 0, 1, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (9, 21, 72109, 72, NULL, 42, 0, 3, 0, 2, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (10, 21, 72110, 72, NULL, 37, 2, 4, 0, 1, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (11, 21, 72111, 72, NULL, 15, 0, 2, 0, 0, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (12, 21, 80101, 80, 19, 16, 1, 3, 12, 0, 0, 1, 2, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (13, 21, 80102, 80, 11, NULL, NULL, NULL, 6, NULL, NULL, 2, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (14, 21, 80103, 80, 66, NULL, NULL, NULL, 37, NULL, NULL, 6, 4, 30, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (15, 21, 80104, 80, 14, NULL, NULL, NULL, 11, NULL, NULL, 1, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (16, 21, 80105, 80, 17, NULL, NULL, NULL, 18, NULL, NULL, 0, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (17, 21, 80106, 80, 15, NULL, NULL, NULL, 18, NULL, NULL, 1, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (18, 21, 80107, 80, 22, 25, 0, 3, 10, 0, 0, 2, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (19, 21, 80108, 80, NULL, 33, 2, 4, 0, 1, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (20, 21, 80109, 80, NULL, 38, 1, 3, 0, 2, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (21, 21, 80110, 80, NULL, 37, 0, 4, 0, 1, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (22, 21, 80111, 80, NULL, 25, 2, 3, 0, 0, 0, NULL, NULL, NULL, NULL);

-- MATCH-22
INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (23, 22, 71101, 71, 15, NULL, NULL, NULL, 16, NULL, NULL, 2, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (24, 22, 71102, 71, 14, 8, 0, 1, 12, 1, 0, 1, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (25, 22, 71103, 71, 34, NULL, NULL, NULL, 30, NULL, NULL, 3, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (26, 22, 71104, 71, 18, NULL, NULL, NULL, 14, NULL, NULL, 2, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (27, 22, 71105, 71, 1, 11, 0, 1, 8, 0, 0, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (28, 22, 71106, 71, 30, NULL, NULL, NULL, 26, NULL, NULL, 3, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (29, 22, 71107, 71, 3, 21, 0, 4, 4, 0, 0, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (30, 22, 71108, 71, 8, 28, 1, 3, 9, 0, 0, 1, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (31, 22, 71109, 71, 0, 24, 2, 4, 1, 1, 0, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (32, 22, 71110, 71, 1, 31, 1, 4, 2, 0, 0, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (33, 22, 71111, 71, NULL, 15, 0, 2, NULL, 0, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (34, 22, 72101, 72, 17, NULL, NULL, NULL, 13, NULL, NULL, 3, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (35, 22, 72102, 72, 55, NULL, NULL, NULL, 43, NULL, NULL, 5, 2, 30, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (36, 22, 72103, 72, 7, NULL, NULL, NULL, 8, NULL, NULL, 1, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (37, 22, 72104, 72, 28, NULL, NULL, NULL, 27, NULL, NULL, 1, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (38, 22, 72105, 72, 27, NULL, NULL, NULL, 19, NULL, NULL, 3, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (39, 22, 72106, 72, 2, NULL, NULL, NULL, 2, NULL, NULL, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (40, 22, 72107, 72, NULL, 38, 3, 4, NULL, 4, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (41, 22, 72108, 72, NULL, 23, 0, 4, NULL, 2, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (42, 22, 72109, 72, NULL, 25, 1, 4, NULL, 2, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (43, 22, 72110, 72, NULL, 19, 1, 4, NULL, 0, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (44, 22, 72111, 72, NULL, 32, 2, 4, NULL, 5, 0, NULL, NULL, NULL, NULL);

-- MATCH-23
INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (45, 23, 80101, 80, 26, 22, 0, 2, 19, 0, 0, 3, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (46, 23, 80102, 80, 57, NULL, NULL, NULL, 30, NULL, NULL, 2, 5, 26, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (47, 23, 80103, 80, 74, NULL, NULL, NULL, 48, NULL, NULL, 8, 2, 35, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (48, 23, 80104, 80, 0, 12, 0, 1, 2, 0, 0, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (49, 23, 80105, 80, 2, NULL, NULL, NULL, 4, NULL, NULL, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (50, 23, 80106, 80, 32, NULL, NULL, NULL, 15, NULL, NULL, 4, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (51, 23, 80107, 80, 0, 36, 36, 1, 4, 1, 4, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (52, 23, 80108, 80, 6, 25, 0, 25, 2, 0, 0, 0, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (53, 23, 80109, 80, NULL, 44, 1, 4, NULL, 0, 1, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (54, 23, 80110, 80, NULL, 36, 1, 3, NULL, 0, 1, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (55, 23, 80111, 80, NULL, 37, 0, 4, NULL, 0, 1, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (56, 23, 71101, 71, 47, NULL, NULL, NULL, 29, NULL, NULL, 6, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (57, 23, 71102, 71, 43, NULL, NULL, NULL, 19, NULL, NULL, 2, 5, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (58, 23, 71103, 71, 24, 11, 0, 1, 22, 0, 2, 2, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (59, 23, 71104, 71, 72, NULL, NULL, NULL, 35, NULL, NULL, 5, 4, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (60, 23, 71105, 71, 20, 15, 2, 2, 11, 0, 0, 1, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (61, 23, 71106, 71, 0, NULL, NULL, NULL, 2, NULL, NULL, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (62, 23, 71107, 71, 0, 31, 0, 4, 1, 0, 0, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (63, 23, 71108, 71, NULL, 40, 1, 3, NULL, 0, 2, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (64, 23, 71109, 71, NULL, 48, 3, 3, NULL, 0, 2, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (65, 23, 71110, 71, NULL, 45, 0, 3, NULL, 0, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (66, 23, 71111, 71, NULL, 20, 0, 3, NULL, 0, 0, NULL, NULL, NULL, NULL);

-- MATCH 24
INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (67, 24, 80101, 80, 17, NULL, NULL, NULL, 8, NULL, NULL, 0, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (68, 24, 80102, 80, 55, NULL, NULL, NULL, 38, NULL, NULL, 3, 3, 35, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (69, 24, 80103, 80, 3, NULL, NULL, NULL, 4, NULL, NULL, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (70, 24, 80104, 80, 22, NULL, NULL, NULL, 24, NULL, NULL, 1, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (71, 24, 80105, 80, 15, NULL, NULL, NULL, 6, NULL, NULL, 0, 2, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (72, 24, 80106, 80, 1, 19, 0, 2, 3, 0, 0, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (73, 24, 80107, 80, 19, 19, 2, 4, 16, 2, 0, 1, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (74, 24, 80108, 80, 5, 33, 0, 3, 11, 1, 0, 0, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (75, 24, 80109, 80, 5, 30, 1, 3, 4, 0, 0, 1, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (76, 24, 80110, 80, NULL, 34, 1, 4, NULL, 1, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (77, 24, 80111, 80, NULL, 17, 0, 2, NULL, 0, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (78, 24, 72101, 72, 8, NULL, NULL, NULL, 10, NULL, NULL, 1, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (79, 24, 72102, 72, 11, NULL, NULL, NULL, 7, NULL, NULL, 1, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (80, 24, 72103, 72, 18, NULL, NULL, NULL, 17, NULL, NULL, 1, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (81, 24, 72104, 72, 27, 6, 0, 1, 15, 1, 0, 2, 2, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (82, 24, 72105, 72, 42, NULL, NULL, NULL, 31, NULL, NULL, 3, 1, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (83, 24, 72106, 72, 39, NULL, NULL, NULL, 25, NULL, NULL, 5, 0, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (84, 24, 72107, 72, NULL, 33, 1, 3, NULL, 1, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (85, 24, 72108, 72, NULL, 21, 2, 4, NULL, 0, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (86, 24, 72109, 72, NULL, 27, 4, 4, NULL, 1, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (87, 24, 72110, 72, NULL, 34, 1, 4, NULL, 3, 0, NULL, NULL, NULL, NULL);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (88, 24, 72111, 72, NULL, 30, 1, 3, NULL, 1, 0, NULL, NULL, NULL, NULL);

-- ENTERING DATA FOR NIDAHAS TROPHY BY SADRUL
-- ENTERING DATA FOR MATCH_ID 25 BD VS IND
INSERT INTO SCORECARD (SCORECARD_ID, PLAYER_ID, MATCH_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES 
     (89,71101,25,71,27,NULL,NULL,NULL,19,NULL,NULL,1,4,NULL,NULL),
     (90,71102,25,71,7,27,0,4,8,4,0,0,1,NULL,NULL),
     (91,71103,25,71,1,NULL,NULL,NULL,3,NULL,NULL,0,0,NULL,NULL),
     (92,71104,25,71,72,NULL,NULL,NULL,55,NULL,NULL,1,8,38,NULL),
     (93,71105,25,71,27,NULL,NULL,NULL,23,NULL,NULL,1,2,NULL,NULL),
     (94,71106,25,71,7,37,0,4,6,5,0,0,1,NULL,NULL),
     (95,71107,25,71,0,NULL,NULL,NULL,0,NULL,NULL,0,0,NULL,NULL),
     (96,71109,25,71,NULL,31,1,4,NULL,5,0,NULL,NULL,NULL,NULL),
     (97,71110,25,71,NULL,27,2,4,NULL,10,0,NULL,NULL,NULL,NULL),
     (98,71111,25,71,NULL,43,0,4,NULL,10,0,NULL,NULL,NULL,NULL),
     (99,72101,25,72,89,NULL,NULL,NULL,61,NULL,NULL,5,5,40,NULL),
     (100,72102,25,72,35,NULL,NULL,NULL,27,NULL,NULL,1,5,NULL,NULL),
     (101,72103,25,72,47,NULL,NULL,NULL,30,NULL,NULL,2,5,NULL,NULL),
     (102,72104,25,72,2,NULL,NULL,NULL,2,NULL,NULL,0,0,NULL,NULL),
     (103,72107,25,72,NULL,50,1,4,NULL,5,0,NULL,NULL,NULL,NULL),
     (104,72108,25,72,NULL,22,3,4,NULL,4,0,NULL,NULL,NULL,NULL),
     (105,72109,25,72,NULL,37,1,4,NULL,6,0,NULL,NULL,NULL,NULL),
     (106,72110,25,72,NULL,21,1,4,NULL,5,0,NULL,NULL,NULL,NULL),
     (107,72111,25,72,NULL,28,0,4,NULL,0,0,NULL,NULL,NULL,NULL),
    --  END OF MATCH NO 25 BD VS IND
    -- START OF MATH NO 26 
     (108,71101,26,71,50,NULL,NULL,NULL,42,NULL,NULL,2,4,42,NULL),
     (109,71102,26,71,0,9,2,4,3,NULL,2,0,0,NULL,NULL),
     (110,71103,26,71,13,NULL,NULL,NULL,8,NULL,NULL,0,3,NULL,NULL),
     (111,71104,26,71,28,NULL,NULL,NULL,25,NULL,NULL,0,2,NULL,NULL),
     (112,71105,26,71,10,NULL,NULL,NULL,11,NULL,NULL,0,0,NULL,NULL),
     (113,71106,26,71,43,NULL,NULL,NULL,18,NULL,NULL,2,3,NULL,NULL),
     (114,71107,26,71,7,NULL,NULL,NULL,9,NULL,NULL,0,0,NULL,NULL),
     (115,71108,26,71,0,NULL,NULL,NULL,1,NULL,NULL,0,0,NULL,NULL),
     (116,71109,26,71,NULL,30,1,4,NULL,5,0,NULL,NULL,NULL,NULL),
     (117,71110,26,71,NULL,27,1,4,NULL,5,0,NULL,NULL,NULL,NULL),
     (118,71111,26,71,NULL,28,2,4,NULL,0,0,NULL,NULL,NULL,NULL),
     (119,80101,26,80,4,NULL,NULL,NULL,7,NULL,NULL,0,0,NULL,NULL),
     (120,80102,26,80,11,NULL,NULL,NULL,14,NULL,NULL,0,2,NULL,NULL),
     (121,80103,26,80,61,NULL,NULL,NULL,40,NULL,NULL,1,7,30,NULL),
     (122,80104,26,80,5,NULL,NULL,NULL,5,NULL,NULL,0,1,NULL,NULL),
     (123,80105,26,80,58,NULL,NULL,NULL,37,NULL,NULL,3,3,33,NULL),
     (124,80106,26,80,7,NULL,NULL,NULL,3,NULL,NULL,0,1,NULL,NULL),
     (125,80107,26,80,NULL,21,1,4,NULL,7,0,NULL,NULL,NULL,NULL),
     (126,80108,26,80,NULL,29,0,4,NULL,2,1,NULL,NULL,NULL,NULL),
     (127,80109,26,80,NULL,41,1,4,NULL,5,0,NULL,NULL,NULL,NULL),
     (128,80110,26,80,NULL,39,1,4,NULL,5,0,NULL,NULL,NULL,NULL),
     (129,80111,26,80,NULL,16,2,4,NULL,0,0,NULL,NULL,NULL,NULL),
    --  END OF MATCH NO 26
    -- START OF MATCH NO 27
     (130,71101,27,71,72,NULL,NULL,NULL,55,NULL,NULL,1,8,38,NULL),
     (131,71102,27,71,7,37,0,4,6,5,0,0,1,NULL,NULL),
     (132,71103,27,71,77,NULL,NULL,NULL,50,NULL,NULL,4,7,35,NULL),
     (133,71104,27,71,19,NULL,NULL,NULL,12,NULL,NULL,2,0,NULL,NULL),
     (134,71105,27,71,21,NULL,NULL,NULL,16,NULL,NULL,1,2,NULL,NULL),
     (135,71106,27,71,7,15,2,4,6,5,0,0,1,NULL,NULL),
     (136,71109,27,71,NULL,31,1,4,NULL,5,0,NULL,NULL,NULL,NULL),
     (137,71110,27,71,NULL,27,2,4,NULL,10,0,NULL,NULL,NULL,NULL),
     (138,71111,27,71,NULL,43,0,4,NULL,10,0,NULL,NULL,NULL,NULL),
     (139,72101,27,78,10,NULL,NULL,NULL,7,NULL,NULL,0,1,NULL,NULL),
     (140,72102,27,78,56,NULL,NULL,NULL,42,NULL,NULL,0,4,38,NULL),
     (141,72103,27,78,0,NULL,NULL,NULL,3,NULL,NULL,0,0,NULL,NULL),
     (142,72104,27,78,24,NULL,NULL,NULL,14,NULL,NULL,2,0,NULL,NULL),
     (143,72105,27,78,28,NULL,NULL,NULL,27,NULL,NULL,3,0,NULL,NULL),
     (144,72106,27,78,17,NULL,NULL,NULL,19,NULL,NULL,3,0,NULL,NULL),
     (145,72107,27,78,28,48,0,4,8,1,0,2,3,NULL,NULL),
     (146,72108,27,78,NULL,45,0,4,NULL,1,0,NULL,NULL,NULL,NULL),
     (147,72109,27,78,NULL,33,2,4,NULL,2,0,NULL,NULL,NULL,NULL),
     (148,72110,27,78,NULL,20,1,4,NULL,0,0,NULL,NULL,NULL,NULL),
     (149,72111,27,78,NULL,18,3,4,NULL,0,0,NULL,NULL,NULL,NULL);
    --  END OF MATCH NO 27
    -- START OF MATCH 24
	
UPDATE SCORECARD
SET TEAM_ID=72
WHERE MATCH_ID=27 AND TEAM_ID=78;

UPDATE SCORECARD
SET WICKET_TAKEN=1
WHERE SCORECARD_ID=145 AND SCORECARD_ID=146;

UPDATE SCORECARD
SET BALL_PLAYED=NULL
WHERE SCORECARD_ID=95
;

UPDATE SCORECARD
SET RUN_SCORED=NULL
WHERE SCORECARD_ID=95
;

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

ALTER TABLE SCORECARD
ADD COLUMN TOURNAMENT_ID INTEGER;

UPDATE SCORECARD
SET TOURNAMENT_ID=4;

UPDATE SCORECARD
SET WICKET_TAKEN=3
WHERE SCORECARD_ID=58
;





