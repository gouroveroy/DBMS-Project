-- TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION DELETE_TOURNAMENT()
RETURNS TRIGGER AS $$
DECLARE
    ROWS_DELETED INTEGER;
BEGIN
    DELETE FROM SCORECARD WHERE MATCH_ID IN (SELECT MATCH_ID FROM MATCH WHERE TOURNAMENT_ID = OLD.TOURNAMENT_ID);
    GET DIAGNOSTICS ROWS_DELETED = ROW_COUNT;
    IF ROWS_DELETED = 0 THEN
        RAISE NOTICE 'No matching rows found in SCORECARD for TOURNAMENT_ID %', OLD.TOURNAMENT_ID;
    END IF;

    DELETE FROM MATCH WHERE TOURNAMENT_ID = OLD.TOURNAMENT_ID;
    GET DIAGNOSTICS ROWS_DELETED = ROW_COUNT;
    IF ROWS_DELETED = 0 THEN
        RAISE NOTICE 'No matching rows found in MATCH for TOURNAMENT_ID %', OLD.TOURNAMENT_ID;
    END IF;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;
