// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client.js');
// Initiate database connection
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // server files from /public folder
app.use(express.json()); // enable reading incoming json data
// app.use(auth());
// API Routes

// *** TODOS ***
app.get('/api/todos', async (req, res) => {

    try {
        const result = await client.query(`
            SELECT * FROM todos
        `);

        res.json(result.rows);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }

});

app.post('/api/todos', async (req, res) => {

    try {
        //user input is in req.body.task

        const result = await client.query(`
        INSERT INTO todos (task, complete)
        VALUES ($1, false)
        returning *;
        `,
        [req.body.task]);

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.put('/api/todos/:id', async (req, res) => {
    const id = req.params.id;
    const todo = req.body;

    try {
        const result = await client.query(`
        UPDATE todos
        SET COMPLETE=${req.body.complete}
        WHERE ID = ${req.params.id}
        returning *;
            
        `, [req.body.complete, req.params.id]);

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.delete('/api/todos/:id', async (req, res) => {
    // get the id that was passed in the route:

    try {
        const result = await client.query(`
        DELETE FROM todos 
        WHERE ID=${req.params.id}
        RETURNING *;
         
        `, [req.params.id]);

        res.json(result.rows[0]);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err.message || err
        });
    }
});

app.get('*', (req, res) => {
    res.send('404 error... ಠ_ಠ  you done goofed! (ง •̀_•́)ง ');
});


// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});