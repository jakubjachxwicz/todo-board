const express = require('express');
const app = express();
const PORT = 5000;

const handlebars = require('express-handlebars');
const connection = require('./db');
const formatDate = require('./date-formatter');

app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    layoutsDir: `${__dirname}/views/layouts`,
    partialsDir: `${__dirname}/views/partials`,
    defaultLayout: 'index'
}));

// middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: true}));



app.get('/', (request, response) => {
    let hide = false;
    if (request.query.hide !== undefined) hide = (request.query.hide === 'true') | false;
    let sort = true;
    if (request.query.asc !== undefined) sort = (request.query.asc === 'true') | false;


    connection.getConnection((error, connection) => {
        if (error) throw error;

        let where = '';
        if (hide) where = 'WHERE completed = 0';

        let order = (sort ? 'DESC' : 'ASC');

        let sql = `SELECT * FROM tasks ${where} ORDER BY creation_date ${order}`;
        connection.query(sql, (error, q_result) => {
            connection.release();
            if (error) throw error;

            let result = [];
            q_result.forEach(value => {
                let element = value;
                // console.log(typeof element.creation_date);
                element.creation_date = formatDate(element.creation_date);
                if (element.completed)
                {
                    element.completion_date = formatDate(element.completion_date);
                }

                result.push(element);
            });

            response.render('list', {
                tasks: result, 
                style: '/list.css',
                checkbox: hide,
                radio: sort
            });
        });
    });
})


app.get('/task/:taskID', (request, response) => {
    const {taskID} = request.params;

    connection.getConnection((error, connection) => {
        if (error) throw error;
        
        let sql = 'SELECT * FROM tasks';
        connection.query(sql, (error, q_result) => {
            connection.release();
            if (error) throw error;

            const task = q_result.find((task) => task.id === Number(taskID));

            if (!task) response.redirect('/new');
            else
            {
                response.render('edit', {
                    put: true,
                    task: task,
                    style: '/edit.css'
                });
            }
        });
    });
})


app.post('/update', (request, response) => {
    const {title, content, color, completed, task_id} = request.body;
    // console.log(title);
    // console.log(content);
    // console.log(color);
    // console.log(completed);
    // console.log(task_id);

    if (title === '' || content === '') return response.render('error_msg', {
        layout: 'error',
        message: 'Błąd wysyłania formularza'
    });

    connection.getConnection((error, connection) => {
        if (error) throw error;
        
        // let sql = `UPDATE tasks SET title = ?, content = ?, color = ? `;
        let sql = 'SELECT completed FROM tasks WHERE id = ?';
        connection.query(sql, [task_id], (error, q_response) => {
            // connection.release();
            if (error) throw error;

            sql = 'UPDATE tasks SET title = ?, content = ?, color = ?';

            const q_completed = q_response[0].completed;
            if (q_completed && completed === undefined) sql += ', completed = 0, completion_date = null';
            if (!q_completed && completed == 'on') sql += ', completed = 1, completion_date = NOW()';
            
            sql += ' WHERE id = ?';

            connection.query(sql, [title, content, color, task_id], (error, q_response) => {
                connection.release();
                if (error) throw error;

                response.redirect('/');
            })
        });
    });
})


app.get('/new', (request, response) => {
    response.render('edit', {
        put: false,
        style: '/edit.css'
    });
})


app.post('/insert', (request, response) => {
    const {title, content, color, completed} = request.body;

    if (title === '' || content === '') return response.render('error_msg', {
        layout: 'error',
        message: 'Błąd wysyłania formularza'
    });

    

    connection.getConnection((error, connection) => {
        if (error) throw error;

        let sql = 'INSERT INTO tasks (title, content, color, creation_date, completed, completion_date) VALUES (?, ?, ?, NOW()';
        if (completed == 'on') sql += ', 1, NOW())';
        else sql += ', 0, null)';

        connection.query(sql, [title, content, color], (error, q_result) => {
            connection.release();
            if (error) throw error;

            response.redirect('/');
        });
    })
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})