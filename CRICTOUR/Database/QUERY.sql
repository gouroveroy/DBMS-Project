SELECT *
FROM PERSON
ORDER BY PERSONID;

SELECT * 
FROM UMPIRE;

CREATE TABLE ADMIN(
EMAIL VARCHAR(255),
PASSWORD VARCHAR(255)
);

INSERT INTO ADMIN (EMAIL, PASSWORD)
VALUES ('gouroveroy456@gmail.com', '12345');
INSERT INTO ADMIN (EMAIL, PASSWORD)
VALUES ('gouroveroy71@gmail.com', '12345');


SELECT *
FROM ADMIN;

SELECT * FROM UMPIRE;

SELECT * FROM PERSON p ;

SELECT * FROM VENUE v ;


SELECT
    (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
    P.NATIONALITY,
    EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM C.START_DATE_OF_CAREER) AS COACHING_TIME,
    P.IMAGE,
    P.PERSONID,
    (
        SELECT TEAM_NAME
        FROM TEAM T
        WHERE T.TEAM_ID = C.TEAM_ID
    ) AS TEAM_NAME
FROM COACH C
JOIN PERSON P ON C.PERSONID = P.PERSONID;



SELECT
                (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                P.NATIONALITY,
                EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM DATE_OF_BIRTH) AS AGE,
                P.IMAGE,
                P.PERSONID,
                C.NO_OF_MATCH_CONDUCTED
            FROM
                UMPIRE C
            JOIN
                PERSON P ON
                C.PERSONID = P.PERSONID;

SELECT * FROM POINT_TABLE;
SELECT * FROM TOURNAMENT;
UPDATE TOURNAMENT SET TOURNAMENT_ID = 3
WHERE TOURNAMENT_ID = 6;

SELECT * FROM USERS;
SELECT * FROM PLAYER;
SELECT * FROM PERSON;

SELECT
                    P.IMAGE,
                    (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                    T.TEAM_NAME AS TEAM,
                    PL.TYPE,
                    EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE
                FROM PLAYER PL
                JOIN PERSON P ON PL.PLAYERID = P.PERSONID
                LEFT JOIN TEAM T ON PL.TEAM_ID = T.TEAM_ID;

INSERT INTO PLAYER (PLAYERID)
SELECT P.PERSONID
FROM PERSON P;

INSERT INTO Bowler (playerId)
SELECT playerId
FROM Player
WHERE type = 'Bowler';

-- Insert batsmen data into Batsman table
INSERT INTO Batsman (playerId, Batting_Style)
SELECT playerId, 'Batsman' FROM Player WHERE type = 'Batsman';

SELECT * FROM POINT_TABLE;

SELECT T.TEAM_NAME AS NAME,
P.MATCHES MATCHES,
                P.WON WON, P.LOST LOST, P.DRAW DRAW, P.POINTS POINTS, P.NRR NRR
                FROM POINT_TABLE P JOIN TEAM T
                ON (P.TEAM_ID = T.TEAM_ID);


SELECT * FROM PERSON;
SELECT * FROM BATSMAN;
SELECT * FROM BOWLER;
SELECT * FROM MATCH;
SELECT * FROM SCORECARD;

DELETE FROM MATCH;
DELETE FROM SCORECARD;

SELECT S.*
FROM SCORECARD S
JOIN MATCH M
ON S.MATCH_ID = M.MATCH_ID
AND S.MATCH_ID = 1;

-- DELETING ALA DATA FROM SCORECARD TABLE
DELETE FROM SCORECARD;


-- MATCHES INSERTION
INSERT INTO MATCH (MATCH_ID, TOURNAMENT_ID, MAN_OF_THE_MATCH, WINNER, TEAM1_ID, TEAM2_ID, VENUE_ID, TEAM1_RUN, TEAM2_RUN, TEAM1_WICKET, TEAM2_WICKET, MATCH_DATE)
VALUES (21, 4, 80104, 80, 72, 80, 1, 174, 175, 5, 5, TO_DATE('2018-03-06'));

INSERT INTO MATCH (MATCH_ID, TOURNAMENT_ID, MAN_OF_THE_MATCH, WINNER, TEAM1_ID, TEAM2_ID, VENUE_ID, TEAM1_RUN, TEAM2_RUN, TEAM1_WICKET, TEAM2_WICKET, MATCH_DATE)
VALUES (22, 4, 72111, 72, 71, 72, 2, 139, 140, 8, 4, TO_DATE('2018-03-08'));

-- SCORECARD INSERTION
-- MATCH-1
INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (1, 21, 72101, 72, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (2, 21, 72102, 72, 90, 0, 0, 0, 49, 0, 0, 6, 6, 30, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (3, 21, 72103, 72, 1, 14, 0, 2, 3, 0, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (4, 21, 72104, 72, 37, 0, 0, 0, 35, 0, 0, 3, 1, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (5, 21, 72105, 72, 23, 0, 0, 0, 23, 0, 0, 1, 1, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (6, 21, 72106, 72, 13, 0, 0, 0, 6, 0, 0, 2, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (7, 21, 72107, 72, 0, 35, 1, 3, 0, 2, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (8, 21, 72108, 72, 0, 28, 2, 4, 0, 1, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (9, 21, 72109, 72, 0, 42, 0, 3, 0, 2, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (10, 21, 72110, 72, 0, 37, 2, 4, 0, 1, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (11, 21, 72111, 72, 0, 15, 0, 2, 0, 0, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (12, 21, 80101, 80, 19, 16, 1, 3, 12, 0, 0, 1, 2, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (13, 21, 80102, 80, 11, 0, 0, 0, 6, 0, 0, 2, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (14, 21, 80103, 80, 66, 0, 0, 0, 37, 0, 0, 6, 4, 30, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (15, 21, 80104, 80, 14, 0, 0, 0, 11, 0, 0, 1, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (16, 21, 80105, 80, 17, 0, 0, 0, 18, 0, 0, 0, 1, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (17, 21, 80106, 80, 15, 0, 0, 0, 18, 0, 0, 1, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (18, 21, 80107, 80, 22, 25, 0, 3, 10, 0, 0, 2, 1, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (19, 21, 80108, 80, 0, 33, 2, 4, 0, 1, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (20, 21, 80109, 80, 0, 38, 1, 3, 0, 2, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (21, 21, 80110, 80, 0, 37, 0, 4, 0, 1, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_SIXES_HIT, TOTAL_FOURS_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (22, 21, 80111, 80, 0, 25, 2, 3, 0, 0, 0, 0, 0, 0, 0);

-- MATCHO-2
INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (23, 22, 71101, 71, 15, 0, 0, 0, 16, 0, 0, 2, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (24, 22, 71102, 71, 14, 8, 0, 1, 12, 1, 0, 1, 1, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (25, 22, 71103, 71, 34, 0, 0, 0, 30, 0, 0, 3, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (26, 22, 71104, 71, 18, 0, 0, 0, 14, 0, 0, 2, 1, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (27, 22, 71105, 71, 1, 11, 0, 1, 8, 0, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (28, 22, 71106, 71, 30, 0, 0, 0, 26, 0, 0, 3, 1, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (29, 22, 71107, 71, 3, 21, 0, 4, 4, 0, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (30, 22, 71108, 71, 8, 28, 1, 3, 9, 0, 0, 1, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (31, 22, 71109, 71, 0, 24, 2, 4, 1, 1, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (32, 22, 71110, 71, 1, 31, 1, 4, 2, 0, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (33, 22, 71111, 71, 0, 15, 0, 2, 0, 0, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (34, 22, 72101, 72, 17, 0, 0, 0, 13, 0, 0, 3, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (35, 22, 72102, 72, 55, 0, 0, 0, 43, 0, 0, 5, 2, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (36, 22, 72103, 72, 7, 0, 0, 0, 8, 0, 0, 1, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (37, 22, 72104, 72, 28, 0, 0, 0, 27, 0, 0, 1, 1, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (38, 22, 72105, 72, 27, 0, 0, 0, 19, 0, 0, 3, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (39, 22, 72106, 72, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (40, 22, 72107, 72, 0, 38, 3, 4, 0, 4, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (41, 22, 72108, 72, 0, 23, 0, 4, 0, 2, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (42, 22, 72109, 72, 0, 25, 1, 4, 0, 2, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (43, 22, 72110, 72, 0, 19, 1, 4, 0, 0, 0, 0, 0, 0, 0);

INSERT INTO SCORECARD (SCORECARD_ID, MATCH_ID, PLAYER_ID, TEAM_ID, RUN_SCORED, RUN_GIVEN, WICKET_TAKEN, OVERS_BOWLED, BALL_PLAYED, GIVEN_EXTRAS, MAIDEN_OVERS, TOTAL_FOURS_HIT, TOTAL_SIXES_HIT, BALL_FOR_HALF_CENTURY, BALL_FOR_CENTURY)
VALUES (44, 22, 72111, 72, 0, 32, 2, 4, 0, 5, 0, 0, 0, 0, 0);


































