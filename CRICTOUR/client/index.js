const { Client } = require('pg');

// Replace these values with your actual PostgreSQL connection details
const dbConfig = {
    user: 'postgres',
    host: 'localhost',
    database: 'CRICTOUR',
    password: 'password',
    port: 5432,
    ssl: true,
};

const client = new Client(dbConfig);

client.connect()
    .then(() => {
        console.log('Connected to PostgreSQL');
        // Your database operations here
    })
    .catch((error) => {
        console.error(`PostgreSQL Connection Error: ${error.message}`);
    })
    .finally(() => {
        client.end();
    });
