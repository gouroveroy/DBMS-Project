const { promisify } = require('util');
const { Client } = require('pg');
const fs = require("fs").promises;
const path = require("path");
const express = require('express');
const dbConfig = require("../db");
const queryAsync = promisify(dbConfig.query).bind(dbConfig);
const client = new Client(dbConfig);

const app = express();
const port = 8000;

app.use(express.json());

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "templates"));

app.use("/static", express.static("static"));
app.use(express.urlencoded());

async function readEJSFile(filePath) {
    try {
        const content = await fs.readFile(filePath, "utf8");
        return content;
    } catch (err) {
        console.error(`Error reading file ${filePath}: ${err.message}`);
        throw err;
    }
}

// Render the EJS content when the root URL is accessed
app.get("/", async (req, res) => {
    try {
        const sightContent = await readEJSFile("./templates/sight.ejs");
        res.render("sight", { content: sightContent });
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

app.get("/login", async (req, res) => {
    try {
        const loginContent = await readEJSFile("./templates/login.ejs");
        res.render("login", { content: loginContent });
    } catch (err) {
        console.error(`PostgreSQL Error: ${err.message}`);
        res.status(500).send("Internal Server Error");
    }
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const result = await dbConfig.query(
            `SELECT * 
            FROM ADMIN
            WHERE email = $1 AND password = $2`,
            [email, password]
        );

        if (result.rows.length !== 0) {
            res.redirect("/admin");
        } else {
            res.redirect("/error");
        }
    } catch (err) {
        console.error(`PostgreSQL Error: ${err.message}`);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/update', async (req, res) => {
    try {
        const updateContent = await readEJSFile("./templates/update.ejs");
        res.render("update", { content: updateContent });
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

app.get('/umpire', async (req, res) => {
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
        JOIN PERSON P ON C.PERSONID = P.PERSONID
      `;

        const { rows } = await dbConfig.query(sql);

        res.json({ data: rows });
    } catch (error) {
        console.error(`PostgreSQL Error: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// app.get('/umpire', async (req, res) => {
//     try {
//         const sql = `
//             SELECT
//                 (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
//                 P.NATIONALITY,
//                 EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM DATE_OF_BIRTH) AS AGE,
//                 P.IMAGE,
//                 P.PERSONID,
//                 C.NO_OF_MATCH_CONDUCTED
//             FROM
//                 UMPIRE C
//             JOIN
//                 PERSON P ON
//                 C.PERSONID = P.PERSONID
//         `;

//         const rows = await queryAsync(sql);
//         res.render('umpire', { data: rows });
//     } catch (error) {
//         console.error(`PostgreSQL Error: ${error.message}`);
//         res.status(500).send("Internal Server Error");
//     }
// });

app.get('/coach', async (req, res) => {
    try {
        const sql = `
        SELECT
        (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
        P.NATIONALITY,
        EXTRACT(YEAR FROM CURRENT_DATE) - EXTRACT(YEAR FROM START_DATE_OF_CAREER) AS COACHING_TIME,
        P.IMAGE,
        P.PERSONID,
        (
            SELECT TEAM_NAME
            FROM TEAM T
            WHERE T.TEAM_ID = C.TEAM_ID
        ) AS TEAM_NAME
    FROM COACH C
    JOIN PERSON P ON C.PERSONID = P.PERSONID;    
        `;

        const rows = await queryAsync(sql);
        res.render('coach', { data: rows });
    } catch (error) {
        console.error(`PostgreSQL Error: ${error.message}`);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
