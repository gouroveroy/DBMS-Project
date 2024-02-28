-- Create a temporary table to hold combinations of teams
CREATE TEMP TABLE Team_Combinations AS
SELECT t1.team_id AS team1_id, t2.team_id AS team2_id
FROM Team t1
CROSS JOIN Team t2
WHERE t1.team_id < t2.team_id;

-- Insert data for all combinations
INSERT INTO Team_Head_To_Head (team1_id, team2_id, win, lose, draw, abandoned, total_match_played)
SELECT 
    tc.team1_id,
    tc.team2_id,
    FLOOR(RANDOM() * 30+6)::int, -- Random wins between 0 to 10
    FLOOR(RANDOM() * 30+4)::int, -- Random losses between 0 to 10
    FLOOR(RANDOM() * 10)::int, -- Random draws between 0 to 10
    0, -- No abandoned matches initially
    0 -- Total matches as default value 0
FROM Team_Combinations tc;

UPDATE Team_Head_To_Head
SET total_match_played = win + lose + draw + abandoned;

