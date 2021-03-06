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
app.use(express.urlencoded({ extended:true })); //security parsing an encoded url


// Auth Routes
const createAuthRoutes = require('./lib/auth/create-auth-routes');

const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash 
            FROM users
            WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT into users (email, hash)
            VALUES ($1, $2)
            RETURNING id, email;
        `,
        [user.email, hash]
        ).then(result => result.rows[0]);
    }
});

//before ensure auth, but after other middleware... 
//the create-auth-route will be on top of this... 
//so api/auth/signup... or api/auth/signin

app.use('/api/auth', authRoutes);

//for every route make sure there is a token
const ensureAuth = require('./lib/auth/ensure-auth');

app.use('/api', ensureAuth);

//API ROUTES!!!
// *** TODOS ***
app.get('/api/todos', async (req, res) => {

    try {
        console.log(req.userId);
        const result = await client.query(`
            SELECT * FROM todos 
            WHERE user_id=$1;
        `, [req.userId]);

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
        INSERT INTO todos (task, complete, user_id)
        VALUES ($1, false, $2)
        returning *;
        `,
        [req.body.task, req.userId]);

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
        SET COMPLETE=$1
        WHERE ID = $2
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
        WHERE todos.id=$1
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



// before ensure auth, but after other middleware:
app.use('/api/auth', authRoutes);
app.get('*', (req, res) => {
    res.send('404 error... ಠ_ಠ  you done goofed! (ง •̀_•́)ง ');
});


// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});