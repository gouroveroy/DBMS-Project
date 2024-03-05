-- TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION DELETE_TOURNAMENT()
RETURNS TRIGGER AS $$
DECLARE
    ROWS_DELETED INTEGER;
BEGIN
    DELETE FROM SCORECARD WHERE MATCH_ID IN (SELECT MATCH_ID FROM MATCH WHERE TOURNAMENT_ID = OLD.TOURNAMENT_ID);
    GET DIAGNOSTICS ROWS_DELETED = ROW_COUNT;
    IF ROWS_DELETED = 0 THEN
        RAISE NOTICE 'NO MATCHING ROWS FOUND IN SCORECARD FOR TOURNAMENT_ID %', OLD.TOURNAMENT_ID;
    END IF;

    DELETE FROM MATCH WHERE TOURNAMENT_ID = OLD.TOURNAMENT_ID;
    GET DIAGNOSTICS ROWS_DELETED = ROW_COUNT;
    IF ROWS_DELETED = 0 THEN
        RAISE NOTICE 'NO MATCHING ROWS FOUND IN MATCH FOR TOURNAMENT_ID %', OLD.TOURNAMENT_ID;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE PLPGSQL;


CREATE OR REPLACE FUNCTION UPDATE_UMPIRE_MATCHES()
RETURNS TRIGGER AS $$
DECLARE
    MATCH_COUNT INTEGER;
BEGIN
    -- COUNT THE NUMBER OF MATCHES CONDUCTED BY THE UMPIRE
    SELECT COUNT(*)
    INTO MATCH_COUNT
    FROM MATCH_UMPIRE
    WHERE UMPIRE_ID = NEW.UMPIRE_ID;

    -- UPDATE THE NO_OF_MATCH_CONDUCTED COLUMN IN THE UMPIRE TABLE
    UPDATE UMPIRE
    SET NO_OF_MATCH_CONDUCTED = MATCH_COUNT
    WHERE PERSONID = NEW.UMPIRE_ID;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION DELETE_RELATED_SCORECARDS()
RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM SCORECARD WHERE MATCH_ID = OLD.MATCH_ID;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
