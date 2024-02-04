const fs = require("fs").promises;
const express = require("express");
const cors = require("cors");
const pool = require("../db");
const bcrypt = require("bcrypt");
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
            const { email, password } = req.body;

            try {
                console.log("Received login request:", { email, password });

                const result = await pool.query(
                    `SELECT * 
                    FROM ADMIN
                    WHERE EMAIL = $1 AND PASSWORD = $2`,
                    [email, password]
                );

                if (result.rows.length !== 0) {
                    res.json({flag: true});
                } else {
                    res.json({flag: false});
                }
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
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

        app.get("/signup", async (req, res) => {
            try {
                const signupContent = await readEJSFile("./templates/signup.ejs");
                res.render("signup", { content: signupContent });
            } catch (err) {
                console.error(`PostgreSQL Error: ${err.message}`);
                res.status(500).send("Internal Server Error");
            }
        });

        app.get("/umpire", async (req, res) => {
            try {
                const sql = `
                SELECT
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
                res.render("umpire", { data: result.rows });
                // res.json(result.rows);
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
                console.log(result.rows);
        
                // Check if any coach information is found
                // if (result.rows.length !== 0) {
                    res.render("coach", { data: result.rows });
                // } else {
                    // res.status(404).json({ error: 'No coaches found' });
                // }
            } catch (error) {
                console.error(`PostgreSQL Error: ${error.message}`);
                res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    } finally {
        // You can add cleanup logic here if needed
    }
}

// running the function
run().catch((err) => console.error(err));

// listening to the port
app.listen(port, () => {
    console.log(`test server running on ${port}`);
});
