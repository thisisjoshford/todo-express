const client = require('../lib/client');
// import our seed data:
const todos = require('./todos');

run();

async function run() {

    try {
        await client.connect();

        await client.query(`
                    INSERT INTO users (email, hash)
                    VALUES ($1, $2)
       `,
        ['mysweeetemail@gmail.com', 'supersecrettokenmofo']);

        await Promise.all(
            todos.map(todo => {
                return client.query(`
                    INSERT INTO todos (task, complete)
                    VALUES ($1, $2);
                `,
                [todo.task, todo.complete, todo.user_id]);
            })
        );

        console.log('seed data load complete');
    }
    catch (err) {
        console.log(err);
    }
    finally {
        client.end();
    }
    
}
