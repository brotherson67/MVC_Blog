require('dotenv').config();
const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars')
// const routes = require('./controllers');
const sequelize = require('./config/connection');
const app = express();
const PORT = process.env.PORT || 3002;

const hbs = exphbs.create({ layoutsDir: path.join(__dirname, "views/layouts"), partialsDir: path.join(__dirname, "views/partials") });


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port number ${PORT}`))
});