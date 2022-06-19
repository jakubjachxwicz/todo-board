const express = require('express');
const app = express();
const PORT = 5000;

const handlebars = require('express-handlebars');
const connection = require('./db');

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
    let result, fields;
    connection.getConnection((error, connection) => {
        if (error) throw error;

        let sql = "SELECT * FROM tasks";
        connection.query(sql, (error, q_result, q_fields) => {
            connection.release();
            if (error) throw error;

            result = q_result;
            field = q_fields;
        })
    });
    
    
    response.render('list', {result: result, fields: fields});
})


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
})