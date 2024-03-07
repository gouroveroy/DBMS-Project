const fs = require("fs").promises;
const express = require("express");
const cors = require("cors");
const pool = require("../db");
const path = require("path");

const port = 8000;
require("dotenv").config();
const app = express();

app.use(express.urlencoded());

// middleware
app.use(cors());
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "templates"));
app.use("/static", express.static("static"));

async function readEJSFile(filePath) {
    try {
        const content = await fs.readFile(filePath, "utf8");
        return content;
    } catch (err) {
        console.error(`Error reading file ${filePath}: ${err.message}`);
        throw err;
    }
}

async function run() {
    try {

        app.get("/", async (req, res) => {
            try {
                const sightContent = await readEJSFile("./templates/sight.ejs");
                res.render("sight", { content: sightContent });
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/login", async (req, res) => {
            try {
                const loginContent = await readEJSFile("./templates/login.ejs");
                res.render("login", { content: loginContent });
            } catch (err) {
                console.error(`Error reading login template: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.post("/login", async (req, res) => {
            const { email, password, selection } = req.body;
            console.log(selection);

            try {
                console.log("Received login request:", { email, password });

                if (selection == 'user') {
                    const result = await pool.query(`SELECT * FROM USERS WHERE EMAIL = $1 AND PASSWORD = $2`, [email, password]);
                    console.log(result);
                    if (result.rows.length !== 0) {
                        res.json({
                            success: true,
                            user: 'user',
                        });
                    } else {
                        res.json({ message: "error" });
                    }
                }

                else if (selection == 'admin') {
                    const result = await pool.query(`SELECT * FROM ADMIN WHERE EMAIL = $1 AND PASSWORD = $2`, [email, password]);
                    console.log(result);
                    if (result.rows.length !== 0) {
                        res.json({
                            success: true,
                            user: 'admin',
                        });
                    } else {
                        res.json({ message: "error" });
                    }
                }
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.post("/signup", async (req, res) => {
            const { email, password } = req.body;
            try {
                console.log("Received signup request:", { email, password });

                await pool.query(`
                    INSERT INTO USERS (EMAIL, PASSWORD)
                    VALUES ($1, $2)`,
                    [email, password]
                );

                // Optionally, you can send a success response back to the client
                res.status(201).json({ message: "Signup successful" });
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/error", (req, res) => {
            res.render("error");
        });

        app.get("/admin", async (req, res) => {
            try {
                const adminContent = await readEJSFile("./templates/admin.ejs");
                res.render("admin", { content: adminContent });
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/sight", async (req, res) => {
            try {
                const homeContent = await readEJSFile("./templates/sight.ejs");
                res.render("sight", { content: homeContent });
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });


        app.get("/umpire", async (req, res) => {
            try {
                const sql = `
                SELECT
                  C.PERSONID AS UMPIRE_ID,
                  (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                  P.NATIONALITY,
                  EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE,
                  P.IMAGE,
                  P.PERSONID,
                  C.NO_OF_MATCH_CONDUCTED
                FROM UMPIRE C
                JOIN PERSON P ON C.PERSONID = P.PERSONID;
              `;

                const result = await pool.query(sql);
                // res.render("umpire", { data: result.rows });
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get("/umpire/:umpire_id", async (req, res) => {
            try {
                const sql = `
                SELECT
                  C.PERSONID AS UMPIRE_ID,
                  (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                  P.NATIONALITY AS NATIONALITY,
                  EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE,
                  P.IMAGE,
                  C.NO_OF_MATCH_CONDUCTED AS NO_OF_MATCHES_CONDUCTED
                FROM UMPIRE C
                JOIN PERSON P ON C.PERSONID = P.PERSONID
                WHERE C.PERSONID = $1;
                `
                const result = await pool.query(sql, [req.params.umpire_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get("/pointTable", async (req, res) => {
            try {
                const sql = `
                SELECT T.TEAM_NAME AS NAME,
                P.MATCHES MATCHES,
                P.WON WON, P.LOST LOST, P.DRAW DRAW, P.POINTS POINTS, P.NRR NRR
                FROM POINT_TABLE P JOIN TEAM T
                ON (P.TEAM_ID = T.TEAM_ID);
                `
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get('/coach', async (req, res) => {
            try {
                // SQL query to retrieve information about all coaches
                const sql = `
                    SELECT
                        C.PERSONID AS COACH_ID,
                        (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                        P.NATIONALITY,
                        EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM C.START_DATE_OF_CAREER) AS COACHING_DURATION,
                        P.IMAGE,
                        P.PERSONID,
                        T.TEAM_NAME
                    FROM COACH C
                    JOIN PERSON P ON C.PERSONID = P.PERSONID
                    LEFT JOIN TEAM T ON C.TEAM_ID = T.TEAM_ID;
                `;

                // Execute the SQL query
                const result = await pool.query(sql);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        app.get('/coach/:coach_id', async (req, res) => {
            try {
                // SQL query to retrieve information about all coaches
                const sql = `
                    SELECT
                        C.PERSONID AS COACH_ID,
                        (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                        P.NATIONALITY,
                        EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE,
                        EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM C.START_DATE_OF_CAREER) AS COACHING_DURATION,
                        P.IMAGE,
                        T.TEAM_NAME AS TEAM
                    FROM COACH C
                    JOIN PERSON P ON C.PERSONID = P.PERSONID
                    LEFT JOIN TEAM T ON C.TEAM_ID = T.TEAM_ID
                    WHERE C.PERSONID = $1;
                `;
                const result = await pool.query(sql, [req.params.coach_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        //get all teams
        app.get("/teams", async (req, res) => {

            try {
                const sql = `
                SELECT* FROM TEAM;
                `;
                const result = await pool.query(sql);
                // console.log(result.rows);
                res.json(result.rows);
            }
            catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });


        //get a team
        // app.get("/teams/:team_id", async (req, res,) => {
        //     try {
        //         console.log("get team");
        //         console.log(req.params.team_id);
        //         const sql =`
        //         select t.*,p1.first_name||' '||p1.last_name as captain_name,p1.image as captain_image,pl.playerid,pl.type,p.first_name||' '||p.last_name as "player_name",p.image as player_image,p2.first_name||' '||p2.last_name as coach_name,p2.nationality,p2.image as coach_image
        //         from team t join player pl on pl.team_id=t.team_id
        //         join person p on pl.playerid=p.personid
        //         join person p1 on p1.personid=t.captain_id
        //         join person p2 on t.coach_id=p2.personid
        //          where t.team_id=$1;
        //         `;
        //         const result = await pool.query(sql,[req.params.team_id]);
        //         console.log(result.rows);
        //         res.json(result.rows);
        //     }
        //     catch (error) {
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: 'Internal Server Error' });
        //     }
        // });

        app.get("/teams/:team_id", async (req, res) => {
            try {
                console.log("get team");
                console.log(req.params.team_id);
                const sql = `
                    SELECT 
                        t.*,
                        p1.first_name || ' ' || p1.last_name AS captain_name,
                        encode(p1.image, 'base64') AS captain_image,
                        pl.playerid,
                        pl.type,
                        p.first_name || ' ' || p.last_name AS "player_name",
                        encode(p.image, 'base64') AS player_image,
                        p2.first_name || ' ' || p2.last_name AS coach_name,
                        p2.nationality,
                        encode(p2.image, 'base64') AS coach_image
                    FROM 
                        team t 
                        JOIN player pl ON pl.team_id = t.team_id
                        JOIN person p ON pl.playerid = p.personid
                        JOIN person p1 ON p1.personid = t.captain_id
                        JOIN person p2 ON t.coach_id = p2.personid
                    WHERE 
                        t.team_id = $1;
                `;
                const result = await pool.query(sql, [req.params.team_id]);
                console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        app.get("/player", async (req, res) => {
            try {
                const sql = `
                SELECT
                    P.PERSONID AS PLAYER_ID,
                    P.IMAGE,
                    (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                    T.TEAM_NAME AS TEAM,
                    PL.TYPE,
                    EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE
                FROM PLAYER PL
                JOIN PERSON P ON PL.PLAYERID = P.PERSONID
                LEFT JOIN TEAM T ON PL.TEAM_ID = T.TEAM_ID;
                `;
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        // RETREIVE player profile for a player
        app.get("/player/:player_id", async (req, res) => {
            try {
                const sql = `
                SELECT PP.*,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME) AS PLAYER_NAME,PL.TYPE, T.TEAM_NAME,P.DATE_OF_BIRTH,(CURRENT_DATE-P.DATE_OF_BIRTH)/365 AS AGE
                FROM PLAYER_PROFILE PP
                JOIN PERSON P ON PP.PLAYERID=P.PERSONID
                JOIN PLAYER PL ON PL.PLAYERID=P.PERSONID
                JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
                where PP.playerid=$1
                ;
                `;
                const result = await pool.query(sql, [req.params.player_id]);
                console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get("/venue", async (req, res) => {
            try {
                const sql = `
                SELECT * FROM VENUE;
                `;
                const result = await pool.query(sql);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.get("/venue/:venue_id", async (req, res) => {
            console.log(req.params.venue_id);
            try {
                const sql = `
                SELECT * FROM VENUE WHERE VENUE_ID = $1;
                `;
                const result = await pool.query(sql, [req.params.venue_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //get team details along with it's all players, it's coaches
        // app.get("/teams/:team_id/teamDetails",async(req,res)=>{
        //     try{
        //         const sql = `
        //         select t.*,p1.first_name||' '||p1.last_name as captain_name,pl.playerid,pl.type,p.first_name||' '||p.last_name as "player_name",p.image,p2.first_name||' '||p2.last_name as coach_name,p2.nationality,p2.image
        //         from team t join player pl on pl.team_id=t.team_id
        //         join person p on pl.playerid=p.personid
        //         join person p1 on p1.personid=t.captain_id
        //         join person p2 on t.coach_id=p2.personid
        //         where t.team_id=$1;
        //         `;
        //         const result = await pool.query(sql,[req.params.team_id]);
        //         console.log(result.rows);
        //     }
        //     catch(error){
        //         console.error(`PostgreSQL Error: ${error.message}`);
        //         res.status(500).json({ error: "Internal Server Error" });
        //     }
        // });

        app.post("/addTournament", async (req, res) => {
            const { tournamentId, tournamentName, host, winnerTeam, numberOfSixes, numberOfFours, numberOfHatTricks, startDate, endDate } = req.body.seriesInfo;
            try {
                console.log("Received tournament details:", { tournamentId, tournamentName, host, winnerTeam, numberOfSixes, numberOfFours, numberOfHatTricks, startDate, endDate });

                // Convert empty strings to null
                const normalizedData = {
                    tournamentId,
                    tournamentName,
                    host,
                    winnerTeam,
                    numberOfSixes: numberOfSixes === '' ? null : numberOfSixes,
                    numberOfFours: numberOfFours === '' ? null : numberOfFours,
                    numberOfHatTricks: numberOfHatTricks === '' ? null : numberOfHatTricks,
                    startDate,
                    endDate
                };

                await pool.query(`
                INSERT INTO TOURNAMENT (TOURNAMENT_ID, TOURNAMENT_NAME, HOST, WINNER_TEAM_ID, NO_OF_SIXES, NO_OF_FOURS, NO_OF_HAT_TRICKS, START_DATE, END_DATE)
                VALUES ($1, $2, $3, $4, $5, $6, $7, TO_DATE($8, 'YYYY-MM-DD'), TO_DATE($9, 'YYYY-MM-DD'))`,
                    [normalizedData.tournamentId, normalizedData.tournamentName, normalizedData.host, normalizedData.winnerTeam, normalizedData.numberOfSixes, normalizedData.numberOfFours, normalizedData.numberOfHatTricks, normalizedData.startDate, normalizedData.endDate]
                );

                // Optionally, you can send a success response back to the client
                res.status(201).json({ message: "Tournament added successfully" });
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.post('/deleteTournament', async (req, res) => {
            const { tournamentId } = req.body;
            try {
                console.log("Received request to delete tournament:", { tournamentId });

                // Capture PostgreSQL notices
                let notices = [];
                await pool.query(`
                    DELETE FROM TOURNAMENT
                    WHERE TOURNAMENT_ID = $1
                `, [tournamentId], (err, result) => {
                    if (err) {
                        console.error(`PostgreSQL Error: ${err.message}`);
                        res.status(500).send("Internal Server Error");
                        return;
                    }
                    notices = result.notices; // Capture PostgreSQL notices
                });

                if (notices.length > 0) {
                    // If there are notices, send them along with the response
                    res.status(200).json({ message: notices });
                } else {
                    // If no notices, send the success message only
                    res.status(200).json({ message: "Tournament deleted successfully" });
                }
            } catch (error) {
                console.error(`Server Error: ${error.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/tournaments", async (req, res) => {
            try {
                const sql = `
                SELECT * FROM TOURNAMENT;
                `;
                const result = await pool.query(sql);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        // retrieve tournament details

        app.get("/tournaments/:tournament_id", async (req, res) => {
            try {
                const sql = `
                select t.*, tm.team_name,tm.team_id
                from tournament t join team tm on t.winner_team_id=tm.team_id
                where t.tournament_id = $1;
                `;
                const result = await pool.query(sql, [req.params.tournament_id]);
                console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //retreive match data for a tournament
        app.get("/tournaments/:tournament_id/matches", async (req, res) => {
            try {
                const sql = `
                select m.*,pr.first_name ||' '||pr.last_name as motm_name, t1.team_name as winner_team_name, t2.team_name as team1_name, t3.team_name as team2_name,v.venue_name,v.location,t.tournament_name,t.host
                 from match m
                 join player p on m.man_of_the_match=p.playerid
                 join person pr on p.playerid=pr.personid
                 join team t1 on m.winner=t1.team_id
                 join team t2 on t2.team_id=m.team1_id
                 join team t3 on t3.team_id=m.team2_id
                 join venue v on m.venue_id=v.venue_id
                 join tournament t on m.tournament_id=t.tournament_id
                 where m.tournament_id=$1
                 order by m.match_date;
                `;
                const result = await pool.query(sql, [req.params.tournament_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //retreive both team_id for a match
        app.get("/matches/:match_id/teams", async (req, res) => {
            try {
                const sql = `
                select team1_id,team2_id from match where match_id=$1;
                `;
                const result = await pool.query(sql, [req.params.match_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        // retreive data of batting-scorecard for a match
        app.get("/matches/:match_id/scorecard/batting/:team_id", async (req, res) => {
            try {
                console.log(req.params.team_id);
                const sql = `
                select s.*,round((s.run_scored*1.0/s.ball_played)*100,2) as strikerate,p.first_name ||' '||p.last_name as player_name,t.team_name
                from scorecard s
                join person p on s.player_id = p.personid
                join team t on s.team_id=t.team_id
                where s.match_id=$1 and s.run_scored is not null and s.team_id=$2;
                `;
                const result = await pool.query(sql, [req.params.match_id, req.params.team_id]);
                const battingData = result.rows;

                const sql2 = `
                select m.team1_run,m.team2_run,m.team1_wicket, m.team2_wicket,m.match_date,t.team_name as winner_name,tr.tournament_name,v.venue_name, v.venue_id,tc.total_sold,v.location,p.first_name||' '||p.last_name as motm_name
                from match m
                join venue v on m.venue_id=v.venue_id
                join person p on m.man_of_the_match=p.personid
                join team t on m.winner=t.team_id
                join tournament tr on m.tournament_id=tr.tournament_id
                join ticket tc on m.match_id=tc.match_id
                where m.match_id=$1;
                `;
                const matchResult = await pool.query(sql2, [req.params.match_id]);
                const matchData = matchResult.rows;

                const combinedData = {
                    battingData,
                    matchData
                };
                // console.log(combinedData);
                res.json(combinedData);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //retreive bowling data for a match
        app.get("/matches/:match_id/scorecard/bowling/:team_id", async (req, res) => {
            try {
                const sql = `
                select s.*,round(s.run_given*1.0/s.overs_bowled,2)as economy,p.first_name ||' '||p.last_name as player_name,t.team_name
                from scorecard s
                join person p on s.player_id = p.personid
                join team t on s.team_id=t.team_id
                where s.match_id=$1 and s.overs_bowled is not null and s.team_id=$2;
                `;
                const result = await pool.query(sql, [req.params.match_id, req.params.team_id]);
                const bowlingData = result.rows;
                const sql2 = `
                select m.team1_run,m.team2_run,m.team1_wicket, m.team2_wicket,m.match_date,t.team_name as winner_name,tr.tournament_name,v.venue_name, v.venue_id,tc.total_sold,v.location,p.first_name||' '||p.last_name as motm_name
                from match m
                join venue v on m.venue_id=v.venue_id
                join person p on m.man_of_the_match=p.personid
                join team t on m.winner=t.team_id
                join tournament tr on m.tournament_id=tr.tournament_id
                join ticket tc on m.match_id=tc.match_id
                where m.match_id=$1;
                `;
                const matchResult = await pool.query(sql2, [req.params.match_id]);
                const matchData = matchResult.rows;

                const combinedData = {
                    bowlingData,
                    matchData
                };
                // console.log(combinedData);
                res.json(combinedData);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        // retreive the best batsman of both the team for a particular match
        app.get("/matches/:match_id/bestBatsman/:team1_id/:team2_id", async (req, res) => {
            try {
                const sql = `
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
                    MATCH_ID = $1
                    AND S.TEAM_ID = $2
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
                    MATCH_ID = $1
                    AND S.TEAM_ID = $3
                    AND RUN_SCORED IS NOT NULL
                ORDER BY 
                    RUN_SCORED DESC,
                    STRIKE_RATE DESC
                LIMIT 1
            ) AS TEAM2;
                `;
                const result = await pool.query(sql, [req.params.match_id, req.params.team1_id, req.params.team2_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        // retreive the best bowler of both the team for a particular match
        app.get("/matches/:match_id/bestBowler/:team1_id/:team2_id", async (req, res) => {
            try {
                const sql = `
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
                    MATCH_ID = $1
                    AND S.TEAM_ID = $2
                    AND OVERS_BOWLED > 0
                  ORDER BY 
                  WICKET_TAKEN DESC,
                  ECONOMY_RATE ASC
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
                    MATCH_ID = $1
                    AND S.TEAM_ID = $3
                    AND OVERS_BOWLED > 0
                  ORDER BY 
                  WICKET_TAKEN DESC,
                  ECONOMY_RATE ASC
                  LIMIT 1
                ) AS TEAM2;
                `;
                const result = await pool.query(sql, [req.params.match_id, req.params.team1_id, req.params.team2_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //retreive match umpire 
        app.get("/matches/:match_id/umpire", async (req, res) => {
            try {
                const sql = `
                SELECT MU.*,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME) AS UMPIRE_NAME
                FROM MATCH_UMPIRE MU
                JOIN PERSON P ON MU.UMPIRE_ID=P.PERSONID
                WHERE MU.MATCH_ID=$1;               
                `;
                const result = await pool.query(sql, [req.params.match_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //retreive data from team_head_to_head table for two team
        app.get("/teams/:team1_id/:team2_id/headToHead", async (req, res) => {
            try {
                const sql = `
                SELECT th.*, round((th.win*1.0/th.total_match_played)*100,0) as team1_win_pct,100-round((th.win*1.0/th.total_match_played)*100,0) as team2_win_pct
                FROM TEAM_HEAD_TO_HEAD th
                WHERE (TEAM1_ID=$1 AND TEAM2_ID=$2) OR (TEAM1_ID=$2 AND TEAM2_ID=$1);
                `;
                const result = await pool.query(sql, [req.params.team1_id, req.params.team2_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //retreive data for the top five batsman of the tournament
        app.get("/tournaments/:tournament_id/topBatsman", async (req, res) => {
            try {
                const sql = `
                SELECT S.PLAYER_ID,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME, SUM(COALESCE(S.RUN_SCORED, 0)) AS TOTAL_RUN,
                (SELECT COUNT(*) 
                   FROM SCORECARD 
                   WHERE PLAYER_ID=S.PLAYER_ID AND RUN_SCORED  IS NOT NULL
                ) AS PLAYED_MATCH
                FROM SCORECARD S
                JOIN PERSON P ON  S.PLAYER_ID=P.PERSONID
                JOIN PLAYER PL ON PL.PLAYERID=P.PERSONID
                JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
                WHERE TOURNAMENT_ID=$1
                GROUP BY S.PLAYER_ID,P.FIRST_NAME,P.LAST_NAME,T.TEAM_NAME
                ORDER BY TOTAL_RUN DESC
                LIMIT 5;
                `;
                const result = await pool.query(sql, [req.params.tournament_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });


        // Retreive data for top five bowler of the tournament
        app.get("/tournaments/:tournament_id/topBowler", async (req, res) => {
            try {
                const sql = `
                SELECT PLAYER_ID,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME, SUM( COALESCE(WICKET_TAKEN,0)) AS TOTAL_WICKET,
                 (SELECT COUNT(*)
                   FROM SCORECARD 
                   WHERE PLAYER_ID=S.PLAYER_ID AND (OVERS_BOWLED IS NOT NULL OR RUN_SCORED IS NOT NULL)
                 ) AS PLAYED_MATCH
                 FROM SCORECARD s
                 JOIN PERSON P ON S.PLAYER_ID=P.PERSONID
                 JOIN PLAYER PL ON PL.PLAYERID=P.PERSONID
                 JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
                 WHERE TOURNAMENT_ID=$1
                 GROUP BY PLAYER_ID,P.FIRST_NAME,P.LAST_NAME,T.TEAM_NAME
                 ORDER BY TOTAL_WICKET DESC
                 LIMIT 5
                 ;
                `;
                const result = await pool.query(sql, [req.params.tournament_id]);
                // console.log(result.rows);
                res.json(result.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //Retreiving data for top five all-rounder of the tournament

        app.get("/tournaments/:tournament_id/topAllRounder", async (req, res) => {
            try {
                const sql = `
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
                    WHERE TOURNAMENT_ID=$1
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
                `;
                const result = await pool.query(sql, [req.params.tournament_id]);
                // console.log(result.rows);
                res.json(result.rows);
            }
            catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        // Retreive data for top 10 batsman with the highest strike rate
        app.get("/tournaments/:tournament_id/topStrikeRate", async (req, res) => {
            try {
                const sql = `
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
                     WHERE RUN_SCORED IS NOT NULL AND S.TOURNAMENT_ID=$1
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
                 LIMIT 5
                 ;
                `;
                const result = await pool.query(sql, [req.params.tournament_id]);
                // console.log(result.rows);
                res.json(result.rows);
            }
            catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //Retreive player  for most boundary in a tournament
        app.get("/tournaments/:tournament_id/mostBoundary", async (req, res) => {
            try {
                const mostSix = `
                SELECT S.PLAYER_ID,CONCAT(PR.FIRST_NAME,' ',PR.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME, SUM(TOTAL_SIXES_HIT) AS TOTAL_SIX
                FROM SCORECARD S
                JOIN PERSON PR ON S.PLAYER_ID=PR.PERSONID
                JOIN PLAYER P ON S.PLAYER_ID = P.PLAYERID
                JOIN TEAM T ON T.TEAM_ID=P.TEAM_ID
                WHERE S.TOTAL_SIXES_HIT IS NOT NULL AND S.TOURNAMENT_ID=$1
                GROUP BY S.PLAYER_ID,PR.FIRST_NAME,PR.LAST_NAME,T.TEAM_NAME
                ORDER BY TOTAL_SIX DESC
                LIMIT 10
                ;
                `;
                const mostSixResult = await pool.query(mostSix, [req.params.tournament_id]);
                const sixData = mostSixResult.rows;
                const mostFour = `
                SELECT S.PLAYER_ID,CONCAT(PR.FIRST_NAME,' ',PR.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME, SUM(TOTAL_FOURS_HIT) AS TOTAL_FOUR
                FROM SCORECARD S
                JOIN PERSON PR ON S.PLAYER_ID=PR.PERSONID
                JOIN PLAYER P ON S.PLAYER_ID = P.PLAYERID
                JOIN TEAM T ON T.TEAM_ID=P.TEAM_ID
                WHERE S.TOTAL_SIXES_HIT IS NOT NULL AND S.TOURNAMENT_ID=$1
                GROUP BY S.PLAYER_ID,PR.FIRST_NAME,PR.LAST_NAME,T.TEAM_NAME
                ORDER BY TOTAL_FOUR DESC
                LIMIT 10
                ;
                `;
                const mostFourResult = await pool.query(mostFour, [req.params.tournament_id]);
                const fourData = mostFourResult.rows;
                const combinedData = {
                    sixData,
                    fourData
                };
                // console.log(combinedData);
                res.json(combinedData);
            }
            catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //Retreive data for the best bowler by their economy rate
        app.get("/tournaments/:tournament_id/bestEconomyRate", async (req, res) => {
            try {
                const sql = `
                SELECT PLAYER_ID,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME,SUM(COALESCE(WICKET_TAKEN,0)) AS TOTAL_WICKET, ROUND(SUM( COALESCE(RUN_GIVEN*1.0,0))/SUM(COALESCE(OVERS_BOWLED,0)),2) AS ECONOMY_RATE,
                 (SELECT COUNT(*)
                   FROM SCORECARD 
                   WHERE PLAYER_ID=S.PLAYER_ID AND (OVERS_BOWLED IS NOT NULL OR RUN_SCORED IS NOT NULL)
                 ) as PLAYED_MATCH
                FROM SCORECARD s
                JOIN PERSON P ON S.PLAYER_ID=P.PERSONID
                JOIN PLAYER PL ON PL.PLAYERID=P.PERSONID
                JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
                WHERE TOURNAMENT_ID=$1 AND OVERS_BOWLED IS NOT NULL
                GROUP BY PLAYER_ID,P.FIRST_NAME,P.LAST_NAME,T.TEAM_NAME
                ORDER BY ECONOMY_RATE ASC,TOTAL_WICKET DESC
                LIMIT 5
                ;
                `;
                const result = await pool.query(sql, [req.params.tournament_id]);
                console.log(result.rows);
                res.json(result.rows);
            }
            catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        //retreiving the best eleven of a tournament
        app.get("/tournaments/:tournament_id/bestEleven", async (req, res) => {
            try {
                const bestBatsman = `
                SELECT S.PLAYER_ID,CONCAT(P.FIRST_NAME,' ',P.LAST_NAME) AS PLAYER_NAME,T.TEAM_NAME, SUM(COALESCE(S.RUN_SCORED, 0)) AS TOTAL_RUN,
                   (SELECT COUNT(*) 
                      FROM SCORECARD 
                      WHERE PLAYER_ID=S.PLAYER_ID AND (RUN_SCORED  IS NOT NULL OR OVERS_BOWLED IS NOT NULL)
                   ) AS PLAYED_MATCH
                 FROM SCORECARD S
                 JOIN PERSON P ON  S.PLAYER_ID=P.PERSONID
                 JOIN PLAYER PL ON PL.PLAYERID=P.PERSONID
                 JOIN TEAM T ON T.TEAM_ID=PL.TEAM_ID
                 WHERE TOURNAMENT_ID=$1
                 GROUP BY S.PLAYER_ID,P.FIRST_NAME,P.LAST_NAME,T.TEAM_NAME
                 ORDER BY TOTAL_RUN DESC
                 LIMIT 7;
                `;
                const result1 = await pool.query(bestBatsman, [req.params.tournament_id]);
                const bestBatsmanData = result1.rows;
                const bestBowler = `
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
                     WHERE TOURNAMENT_ID = $1 AND OVERS_BOWLED IS NOT NULL
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
                     WHERE TOURNAMENT_ID = $1 AND OVERS_BOWLED IS NOT NULL
                     GROUP BY PLAYER_ID, P.FIRST_NAME, P.LAST_NAME, T.TEAM_NAME
                     ORDER BY ECONOMY_RATE ASC, TOTAL_WICKET DESC
                     LIMIT 1
                 ) AS TopPlayersByEconomyRate;

                `;
                const result2 = await pool.query(bestBowler, [req.params.tournament_id]);
                const bestBowlerData = result2.rows;
                const bestElevenData = {
                    bestBatsmanData,
                    bestBowlerData
                };
                console.log(bestElevenData);
                res.json(bestElevenData);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
        );
        app.post("/playerByTournament", async (req, res) => {
            try {
                const { tournamentId } = req.body;
                // console.log(tournamentId);
                const sql = `
                    SELECT
                        P.PERSONID AS PLAYER_ID,
                        P.IMAGE,
                        (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
                        T.TEAM_NAME AS TEAM,
                        PL.TYPE,
                        EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM P.DATE_OF_BIRTH) AS AGE
                    FROM PLAYER PL
                    JOIN PERSON P ON PL.PLAYERID = P.PERSONID
                    LEFT JOIN TEAM T ON PL.TEAM_ID = T.TEAM_ID
                    JOIN TEAM_PARTICIPATION TP ON T.TEAM_ID = TP.TEAM_ID AND TP.TOURNAMENT_ID = $1;
                `;
                const players = await pool.query(sql, [tournamentId]);
                // console.log(players.rows);
                res.json(players.rows);
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });

        app.post('/dream11', async (req, res) => {
            try {
                const { selectedPlayers, tournamentIdd } = req.body;
                console.log(selectedPlayers);
                await pool.query('CALL INSERT_SELECTED_PLAYERS_TO_DREAM11($1)', [selectedPlayers]);

                // Call the procedure to calculate total points for DREAM11
                const result = await pool.query('SELECT CALCULATE_TOTAL_DREAM11_POINTS();');
                const totalPoints = result.rows[0].calculate_total_dream11_points;

                // Call the function to compare teams in the tournament
                const teamsByTournament = await pool.query(`SELECT * FROM COMPARE_TEAMS_IN_TOURNAMENT($1);`, [tournamentIdd]);
                console.log(teamsByTournament.rows);
                // Send response with total points and teams data
                await pool.query('DELETE FROM DREAM11;');
                res.status(200).json({
                    totalPoints: totalPoints,
                    teamsByTournament: teamsByTournament.rows
                });
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });

        //Retreive data for the performance of a player in a tournament
        app.get("/tournament/:tournament_id/playerPerformance/:player_id", async (req, res) => {
            try {
                const sql = `
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
                  ),2) AS AVERAGE,
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
                  SUM(GIVEN_EXTRAS) AS TOTAL_EXTRA,SUM(MAIDEN_OVERS) AS TOTAL_MAIDEN,
                  (
                    SELECT ROUND(SUM(RUN_GIVEN*1.0)/SUM(OVERS_BOWLED),2) 
                    FROM SCORECARD 
                    WHERE S.PLAYER_ID=PLAYER_ID AND OVERS_BOWLED IS NOT NULL
                  ) AS ECONOMY
                FROM SCORECARD S
                JOIN PERSON PR ON S.PLAYER_ID=PR.PERSONID
                JOIN PLAYER P ON P.PLAYERID=S.PLAYER_ID
                JOIN TEAM T ON T.TEAM_ID=P.TEAM_ID
                JOIN TOURNAMENT TR ON TR.TOURNAMENT_ID=S.TOURNAMENT_ID
                JOIN MATCH M ON M.MATCH_ID=S.MATCH_ID
                WHERE S.PLAYER_ID=$2 AND S.TOURNAMENT_ID=$1
                GROUP BY S.PLAYER_ID,PR.FIRST_NAME, PR.LAST_NAME,T.TEAM_NAME,TR.TOURNAMENT_NAME
                ORDER BY S.PLAYER_ID
                ;
                `;
                const result = await pool.query(sql, [req.params.tournament_id, req.params.player_id]);
                // console.log(result.rows);
                res.json(result.rows);
            }
            catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: "Internal Server Error" });
            }
        });


    } finally {
        // console.log("Shutting down server");
        // pool.end();
    }
}

// running the function
// run().catch((err) => console.error(err));
run().catch((err) => console.error(err));
// listening to the port
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});
