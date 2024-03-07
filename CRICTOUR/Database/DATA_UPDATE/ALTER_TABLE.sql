ALTER TABLE POINT_TABLE
ADD CONSTRAINT FK_TOURNAMENT_ID
FOREIGN KEY (TOURNAMENT_ID)
REFERENCES TOURNAMENT(TOURNAMENT_ID)
ON DELETE CASCADE;

ALTER TABLE TEAM_PARTICIPATION
ADD CONSTRAINT FK_TOURNAMENT_ID
FOREIGN KEY (TOURNAMENT_ID)
REFERENCES TOURNAMENT(TOURNAMENT_ID)
ON DELETE CASCADE;

ALTER TABLE MATCH
ADD CONSTRAINT FK_TOURNAMENT_ID
FOREIGN KEY (TOURNAMENT_ID)
REFERENCES TOURNAMENT(TOURNAMENT_ID)
ON DELETE CASCADE;

ALTER TABLE SCORECARD
ADD CONSTRAINT FK_MATCH_ID
FOREIGN KEY (MATCH_ID)
REFERENCES MATCH(MATCH_ID)
ON DELETE CASCADE;

ALTER TABLE AWARD
ADD CONSTRAINT FK_TOURNAMENT_ID
FOREIGN KEY (TOURNAMENT_ID)
REFERENCES TOURNAMENT(TOURNAMENT_ID)
ON DELETE CASCADE;