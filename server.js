const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const session = require("express-session");
const helpers = require("./utils/test");
const path = require("path");
const routes = require("./controllers");

const PORT = process.env.PORT || 3001;
const app = express();

// Create sequelize session
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
    secret: "somerandomstring",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({ db: sequelize }),
  };
}
app.use(session(sess));

// Set server engine to handlebars
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Server middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

// Start server with sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
