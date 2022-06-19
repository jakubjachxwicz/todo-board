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



app.get('/', (request, response) => {
    let result = [], fields = [];
    connection.getConnection((error, connection) => {
        if (error) throw error;

        let sql = "SELECT * FROM tasks";
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
                style: './list.css'
            });
        });
    });
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})