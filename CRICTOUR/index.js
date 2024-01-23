const express = require("express");
const path = require("path");
const oracledb = require("oracledb");
const { connect } = require("http2");
const fs = require("fs").promises;

const app = express();
const port = 8000;

// Set EJS as the view engine
app.set("view engine", "ejs");

// Set the correct views directory
app.set("views", path.join(__dirname, "templates"));

app.use("/static", express.static("static"));
app.use(express.urlencoded());

const dbConfig = {
    user: "hr",
    password: "hr",
    connectString: "localhost/ORCL",
};

// Read the EJS file content
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
        res.status(500).send("Internal Server Error");
    }
});

app.get("/signup", async (req, res) => {
    try {
        const signupContent = await readEJSFile("./templates/signup.ejs");
        res.render("signup", { content: signupContent });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.get("/login", async (req, res) => {
    try {
        const loginContent = await readEJSFile("./templates/login.ejs");
        res.render("login", { content: loginContent });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const connection = await oracledb.getConnection(dbConfig);

        const result = await connection.execute(
            `SELECT * 
            FROM ADMIN
            WHERE email = :email AND password = :password`,
            [email, password]
        );

        if (result.rows.length !== 0) {
            res.redirect("/admin");
        } else {
            res.redirect("/error");
        }

        await connection.close();
    } catch (err) {
        console.error(`OracleDB Error: ${err.message}`);
        res.status(500).send("Internal Server Error");
    }
});

app.get('/update', async (req, res) => {
    try {
        const updateContent = await readEJSFile("./templates/update.ejs");
        res.render("update", { content: updateContent });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/update", async (req, res) => {
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // let img_url = "";
    // if (req.files.img_url) {
    //     img_url = req.files.img_url[0].path;
    // }
    // // Checking for empty fields
    // if (name === "" || email === "" || password === "") {
    //     res.redirect("/error");
    // } else {
    //     try {
    //         await run(email, password);
    //         res.redirect("/admin");
    //     } catch (error) {
    //         res.status(500).send("Internal Server Error");
    //     }
    // }
});

app.get("/addplayer", async (req, res) => {
    try {
        const addContent = await readEJSFile('./templates/addplayer.ejs');
        res.render("addplayer", { content: addContent });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

app.post("/addplayer", async (req, res) => {
    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // let img_url = "";
    // if (req.files.img_url) {
    //     img_url = req.files.img_url[0].path;
    // }
    // // Checking for empty fields
    // if (name === "" || email === "" || password === "") {
    //     res.redirect("/error");
    // } else {
    //     try {
    //         await run(email, password);
    //         res.redirect("/admin");
    //     } catch (error) {
    //         res.status(500).send("Internal Server Error");
    //     }
    // }
});

app.get("/error", (req, res) => {
    res.render("error"); // Assuming you have an "error.ejs" template
});

app.get("/admin", async (req, res) => {
    try {
        const adminContent = await readEJSFile("./templates/admin.ejs");
        res.render("admin", { content: adminContent });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

app.get("/sight", async (req, res) => {
    try {
        const homeContent = await readEJSFile("./templates/sight.ejs");
        res.render("sight", { content: homeContent });
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

// app.get('/umpire', async (req, res) => {
//     try {
//         const connection = await oracledb.getConnection(dbConfig);
//         const result = await connection.execute('SELECT * FROM UMPIRE');
//         console.log(result.rows);
//         res.json(result.rows[0]);  // Send only the rows to the client
//     } catch (error) {
//         console.error(`OracleDB Error: ${error.message}`);  // Change 'err' to 'error'
//         res.status(500).json({ error: 'Internal Server Error' });  // Sending an error response
//     }
// });

app.get('/umpire', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const sql = `
        SELECT
        (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
        P.NATIONALITY,
        EXTRACT(YEAR FROM SYSDATE) - EXTRACT(YEAR FROM DATE_OF_BIRTH) AS AGE,
        P.IMAGE,
        P.PERSONID,
        C.NO_OF_MATCH_CONDUCTED
    FROM
        UMPIRE C
    JOIN
        PERSON P ON
        C.PERSONID = P.PERSONID
        `;
        connection.execute(sql, function (err, rows) {
            if (err) {
                // req.flash('error', err);
            } else {
                res.render('umpire', { data: rows });
            }
        });
    } catch (error) {
        console.error(`OracleDB Connection Error: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/coach', async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const sql = `
        SELECT
	    (P.FIRST_NAME || ' ' || P.LAST_NAME) AS FULL_NAME,
	    P.NATIONALITY,
	    EXTRACT(YEAR FROM SYSDATE) - EXTRACT(YEAR FROM START_DATE_OF_CAREER) AS COACHING_TIME,
	    P.IMAGE,
	    P.PERSONID,
	    (
	    SELECT
		TEAM_NAME
	FROM
		TEAM T
	WHERE
		T.TEAM_ID = C.TEAM_ID
	    )
FROM
	COACH C
JOIN
    PERSON P ON
	C.PERSONID = P.PERSONID
        `;
        connection.execute(sql, function (err, rows) {
            if (err) {
                // req.flash('error', err);
            } else {
                res.render('coach', { data: rows });
            }
        });
    } catch (error) {
        console.error(`OracleDB Connection Error: ${error.message}`);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// OracleDB connection and query
// async function run(email, password) {
//     try {
//         const connection = await oracledb.getConnection(dbConfig);

//         // Your database insertion logic here using email and password

//         // Example query:
//         const result = await connection.execute(
//             `INSERT INTO ADMIN (email, password)
//              VALUES (:email, :password)`,
//             [email, password]
//         );

//         console.log(result.rowsAffected + " row(s) inserted");
//         await connection.commit();

//         await connection.close();
//     } catch (err) {
//         console.error(`OracleDB Error: ${err.message}`);
//     }
// }

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
