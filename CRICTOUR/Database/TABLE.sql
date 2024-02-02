--DONE
CREATE TABLE PERSON (
    PERSONID SERIAL PRIMARY KEY,
    FIRST_NAME VARCHAR(255),
    LAST_NAME VARCHAR(255),
    NATIONALITY VARCHAR(100),
    DATE_OF_BIRTH DATE,
    IMAGE BYTEA
);

--DONE
CREATE TABLE UMPIRE (
    PERSONID SERIAL PRIMARY KEY,
    NO_OF_MATCH_CONDUCTED INTEGER,
    FOREIGN KEY (PERSONID) REFERENCES PERSON(PERSONID)
);

--DONE
CREATE TABLE TEAM (
    TEAM_ID SERIAL PRIMARY KEY,
    TEAM_NAME VARCHAR(255),
    CAPTAIN_ID INTEGER,
    COACH_ID INTEGER
);

--DROP TABLE TEAM;
--DROP TABLE PERSON;
--DROP TABLE UMPIRE;
--DROP TABLE COACH;
--DROP TABLE TOURNAMENT;

--DONE
CREATE TABLE PLAYER (
    PLAYERID SERIAL PRIMARY KEY,
    TEAM_ID INTEGER,
    TYPE VARCHAR(50),
    FOREIGN KEY (PLAYERID) REFERENCES PERSON(PERSONID),
    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID)
);

--DONE
CREATE TABLE BOWLER (
    PLAYERID SERIAL PRIMARY KEY,
    BOWLING_STYLE VARCHAR(50),
    FOREIGN KEY (PLAYERID) REFERENCES PLAYER(PLAYERID)
);

--DONE
CREATE TABLE BATSMAN (
    PLAYERID SERIAL PRIMARY KEY,
    BATTING_STYLE VARCHAR(50),
    FOREIGN KEY (PLAYERID) REFERENCES PLAYER(PLAYERID)
);

--DONE
CREATE TABLE COACH (
    PERSONID SERIAL PRIMARY KEY,
    START_DATE_OF_CAREER DATE,
    TEAM_ID INTEGER,
    FOREIGN KEY (PERSONID) REFERENCES PERSON(PERSONID),
    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID)
);

--CREATE TABLE FIELDING_STAT (
--    STATID SERIAL PRIMARY KEY,
--    PLAYERID INTEGER,
--    TOTAL_CATCH INTEGER,
--    RUN_OUT INTEGER,
--    TEAM_ID INTEGER,
--    FOREIGN KEY(TEAM_ID) REFERENCES TEAM(TEAM_ID)
--    FOREIGN KEY (STATID) REFERENCES PLAYER_STATS(STATID)
--    FOREIGN KEY(PLAYERID) REFERENCES PLAYER(PLAYERID)
--);
--
--CREATE TABLE BATTING_STAT (
--    STATID SERIAL PRIMARY KEY,
--    PLAYERID INTEGER 
--    HUNDREDS INTEGER,
--    FIFTIES INTEGER,
--    TOTAL_RUN INTEGER,
--    NOT_OUT INTEGER,
--    AVG INTEGER,
--    STR_RATE INTEGER,
--    FOREIGN KEY (STATID) REFERENCES PLAYER_STATS(STATID)
--    FOREIGN KEY(PLAYERID) REFERENCES PLAYER(PLAYERID)
--
--);
--
--CREATE TABLE BOWLING_STAT (
--    STATID SERIAL PRIMARY KEY,
--    PLAYERID INTEGER,
--    WICKETS INTEGER,
--    FIVE_WICKETS INTEGER,
--    NO_OF_OVERS INTEGER,
--    BOWLING_AVG INTEGER,
--    BOWLING_STRIKE_RATE INTEGER,
--    NO_OF_HATRICKS INTEGER,
--    PLAYERID INTEGER 
--    FOREIGN KEY (STATID) REFERENCES PLAYER_STATS(STATID)
--    FOREIGN KEY (PLAYERID) REFERENCES PLAYER(PLAYERID);
--
--);

--DONE
CREATE TABLE VENUE (
    VENUE_ID SERIAL PRIMARY KEY,
    VENUE_NAME VARCHAR(255),
    CAPACITY INTEGER,
    LOCATION VARCHAR(255)
);

--DONE
CREATE TABLE TOURNAMENT (
    TOURNAMENT_ID SERIAL PRIMARY KEY,
    TOURNAMENT_NAME VARCHAR(255),
    HOST VARCHAR(255),
    WINNER_TEAM_ID INTEGER,
    NO_OF_SIXES INTEGER,
    NO_OF_FOURS INTEGER,
    NO_OF_HAT_TRICKS INTEGER,
    START_DATE DATE,
    END_DATE DATE,
    FOREIGN KEY (WINNER_TEAM_ID) REFERENCES TEAM(TEAM_ID)
);

--DONE
CREATE TABLE POINT_TABLE (
    TEAM_ID INTEGER,
    TOURNAMENT_ID INTEGER,
    MATCHES INTEGER,
    WON INTEGER,
    LOST INTEGER,
    DRAW INTEGER,
    POINTS INTEGER,
    NRR INTEGER,
    PRIMARY KEY (TEAM_ID, TOURNAMENT_ID),
    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID),
    FOREIGN KEY (TOURNAMENT_ID) REFERENCES TOURNAMENT(TOURNAMENT_ID)
);

--DONE
CREATE TABLE TEAM_PARTICIPATION (
    TEAM_ID INTEGER,
    TOURNAMENT_ID INTEGER,
    PRIMARY KEY (TEAM_ID, TOURNAMENT_ID),
    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID),
    FOREIGN KEY (TOURNAMENT_ID) REFERENCES TOURNAMENT (TOURNAMENT_ID)
);

--DONE
CREATE TABLE MATCH (
    MATCH_ID SERIAL PRIMARY KEY,
    TOURNAMENT_ID INTEGER,
    MAN_OF_THE_MATCH INTEGER,
    WINNER INTEGER,
    TEAM1_ID INTEGER,
    TEAM2_ID INTEGER,
    VENUE_ID INTEGER,
    TEAM1_RUN INTEGER,
    TEAM2_RUN INTEGER,
    TEAM1_WICKET INTEGER,
    TEAM2_WICKET INTEGER,
    MATCH_DATE DATE,
    FOREIGN KEY (VENUE_ID) REFERENCES VENUE(VENUE_ID),
    FOREIGN KEY (TOURNAMENT_ID) REFERENCES TOURNAMENT(TOURNAMENT_ID),
    FOREIGN KEY (WINNER) REFERENCES TEAM(TEAM_ID)
);

--DONE
CREATE TABLE MATCH_UMPIRE (
    MATCH_ID INTEGER,
    UMPIRE_ID INTEGER,
    PRIMARY KEY (MATCH_ID, UMPIRE_ID),
    FOREIGN KEY (MATCH_ID) REFERENCES MATCH(MATCH_ID),
    FOREIGN KEY (UMPIRE_ID) REFERENCES UMPIRE(PERSONID)
);

--CREATE TABLE PLAYS (
--    MATCH_ID INTEGER,
--    TEAM_ID INTEGER,
--    SCHEDULE DATE,
--    PRIMARY KEY (MATCH_ID, TEAM_ID),
--    FOREIGN KEY (MATCH_ID) REFERENCES MATCH(MATCH_ID),
--    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID)
--);

--DONE
CREATE TABLE SCORECARD (
    SCORECARD_ID SERIAL PRIMARY KEY,
    PLAYER_ID INTEGER,
    MATCH_ID INTEGER , 
    TEAM_ID INTEGER,
    RUN_SCORED INTEGER,
    RUN_GIVEN INTEGER,
    WICKET_TAKEN INTEGER,
    OVERS_BOWLED INTEGER,
    BALL_PLAYED INTEGER,
    GIVEN_EXTRAS INTEGER,
    MAIDEN_OVERS INTEGER,
    TOTAL_SIXES_HIT INTEGER,
    TOTAL_FOURS_HIT INTEGER,
    BALL_FOR_HALF_CENTURY INTEGER,
    BALL_FOR_CENTURY INTEGER,
    FOREIGN KEY (MATCH_ID) REFERENCES MATCH(MATCH_ID),
    FOREIGN KEY (PLAYER_ID) REFERENCES PLAYER(PLAYERID),
    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID)
);

--DONE
CREATE TABLE PLAYER_PERFORMANCE (
    MATCH_ID INTEGER PRIMARY KEY,
    PLAYER_ID INTEGER,
    RUNS_SCORED INTEGER,
    BALLS_PLAYED INTEGER,
    OVERS_BOWLED INTEGER,
    WICKETS_TAKEN INTEGER,
    RUNS_CONCEDED INTEGER,
    FOREIGN KEY (MATCH_ID) REFERENCES MATCH(MATCH_ID),
    FOREIGN KEY (PLAYER_ID) REFERENCES PLAYER(PLAYERID)
);

--DONE
CREATE TABLE AWARD (
    AWARD_ID SERIAL PRIMARY KEY,
    AWARD_NAME VARCHAR(255),
    TOURNAMENT_ID INTEGER,
    PLAYER_ID INTEGER,
    FOREIGN KEY (TOURNAMENT_ID) REFERENCES TOURNAMENT(TOURNAMENT_ID),
    FOREIGN KEY (PLAYER_ID) REFERENCES PLAYER(PLAYERID)
);

--DONE
CREATE TABLE TICKET (
    MATCH_ID INTEGER,
    VENUE_ID INTEGER,
    TOTAL_SOLD INTEGER,
    PRIMARY KEY(MATCH_ID, VENUE_ID),
    FOREIGN KEY (MATCH_ID) REFERENCES MATCH(MATCH_ID),
    FOREIGN KEY (VENUE_ID) REFERENCES VENUE(VENUE_ID)
);

--DONE
CREATE TABLE SPONSER (
    SPONSER_ID SERIAL PRIMARY KEY,
    TEAM_ID INTEGER,
    COMPANY_NAME VARCHAR(255),
    SPONSER_TYPE VARCHAR(255),
    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID)
);

--DONE
CREATE TABLE JERSEY (
    TEAM_ID INTEGER PRIMARY KEY,
    COLOR VARCHAR(255),
    IMAGE BYTEA,
    FOREIGN KEY (TEAM_ID) REFERENCES TEAM(TEAM_ID)
);

--DONE
CREATE TABLE HIGHLIGHT(
    MATCH_ID INTEGER PRIMARY KEY,
    VIDEO_URL VARCHAR(255),
    FOREIGN KEY (MATCH_ID) REFERENCES MATCH(MATCH_ID)
);

--DONE
CREATE TABLE NEWS (
    NEWS_ID SERIAL PRIMARY KEY,
    MATCH_ID INTEGER,
    NEWS_URL VARCHAR(500),
    FOREIGN KEY (MATCH_ID) REFERENCES MATCH(MATCH_ID)
);
