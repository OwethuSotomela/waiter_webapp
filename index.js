const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const { redirect } = require('statuses');
const { Pool } = require("pg");
const waiter = require("./waiter");
const routes = require('./routesFile');

const app = express();

app.use(express.static('public'))
app.use(session({
    secret: "Add a secret string here",
    resave: true,
    saveUninitialized: false,
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(flash());

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/waiter';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

var waiterCallBack = waiter(pool);
const waiterRoutes = routes(waiterCallBack);

app.get('/', waiterRoutes.home)

app.post('/login', waiterRoutes.login);

app.post('/waiters/:username', waiterRoutes.waiterDays)

app.post('/back/:username', waiterRoutes.back)

app.get('/signup', waiterRoutes.signup)

app.get('/home', waiterRoutes.redirect)

app.get('/days', waiterRoutes.gettingDays)

app.post('/days', waiterRoutes.allDays)

app.get('/days/:dayOfTheWeek', waiterRoutes.coloredDays)

app.post('/clear', waiterRoutes.deletes)

app.post('/daysavailable/:daysavailable', waiterRoutes.availableDays)

app.get('/back', waiterRoutes.redirectBack)

app.post('/register', waiterRoutes.register)

const PORT = process.env.PORT || 1616;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});

