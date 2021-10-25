const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const { redirect } = require('statuses');
const { Pool } = require("pg");
const waiter = require("./waiter");

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

app.get('/', function (req, res) {
    res.render('index');
})

app.post('/login', async function (req, res, next) {
    try {
        var loggedIn = req.body.username;
        var result = await waiterCallBack.waiterFunction(loggedIn);
        var loggedInLength = await waiterCallBack.getWaiter(loggedIn);
        if (loggedIn == "" || result == 0 || loggedInLength == 0) {
            req.flash('alert', 'Sign-up as a new waiter to get a username')
            res.redirect('/signup')
        }
        if (loggedIn === "Sokie@admin") {
            console.log(await waiterCallBack.getAllDaysAvailable())
            res.render('days', {
                workDays: await waiterCallBack.getAllDaysAvailable()
            })
        }
        res.render('waiter', {
            results: result,
            workDays: await waiterCallBack.userDaysSelected(loggedIn)
        });
    } catch (error) {
        next(error);
    }
});

app.post('/waiters/:username', async function (req, res, next) {
    try {
        var Days = { Monday: req.body.Monday, Tuesday: req.body.Tuesday, Wednesday: req.body.Wednesday, Thursday: req.body.Thursday, Friday: req.body.Friday, Saturday: req.body.Saturday, Sunday: req.body.Sunday }
        await waiterCallBack.getSelected(Days, req.params.username)
        var workDays = await waiterCallBack.userDaysSelected(req.params.username)
        var results = await waiterCallBack.waiterFunction(req.params.username)
        res.render('waiter', {
            results,
            workDays
        })
    } catch (error) {
        next(error);
    }
});

app.post('/back/:username', function (req, res) {
    res.redirect('/waiters/:username')
});

app.get('/signup', function (req, res) {
    res.render('signup')
})

app.get('/home', function (req, res) {
    res.redirect('/')
});

app.get('/days', async function (req, res) {
    res.render('days', {
        workDays: await waiterCallBack.getAllDaysAvailable()
    })
});

app.post('/days', function (req, res) {
    res.render('days', {
    })
})

app.get('/days/:dayOfTheWeek', async function (req, res) {
    res.render('days', {
        workDays: await waiterCallBack.getAllDaysAvailable()
    })
});

app.post('/clear', async function (req, res) {
    await waiterCallBack.addColor()
    res.render('days', {
        workDays: await waiterCallBack.getAllDaysAvailable()
    })
});

app.post('/daysavailable/:daysavailable', async function (req, res) {
    res.render('daysavailable', {
        workDays: await waiterCallBack.getAllWaitersByDay(req.params.daysavailable)
    })
});

app.get('/back', function (req, res) {
    res.redirect('days')
});

app.post('/register', async function (req, res, next) {
    try {
        var newWaiter = req.body.newuser;
        var newName = req.body.fullname;
        if (newWaiter !== '' && newName !== '') {
            await waiterCallBack.insertNewUser(newWaiter, newName)
            req.flash('success', 'You are successfully added to the system of waiters')
            res.redirect('/')
        }
    } catch (error) {
        next(error);
    }
});

const PORT = process.env.PORT || 1616;
app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});

