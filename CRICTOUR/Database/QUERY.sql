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












