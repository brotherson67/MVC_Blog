const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
// const router = require('./controllers/api');
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");

// variable instances
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({});

// Create sequelize session with jaws db
const SequelizeStore = require("connect-session-sequelize")(session.Store);
let sess;
if (process.env.JAWSDB_SC) {
  sess = {
    secret: process.env.JAWSDB_SC,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize }),
  };
} else {
  sess = {
    secret: "IDKWhatToEnter",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize }),
  };
}
app.use(session(sess));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);
app.use(express.static(path.join(__dirname, "public")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening on PORT " + PORT));
});
