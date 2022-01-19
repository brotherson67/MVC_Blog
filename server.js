const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const router = require('./controllers/api');
const exphbs = require('express-handlebars');
const path = require('path');


// variable instances
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// turn on routes
app.use(routes);
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

router.get('/', (req, res) => {
  res.render('Home', { layout: 'main' })
})

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on PORT ' + PORT));
});
