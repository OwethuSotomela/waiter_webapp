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
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(flash());


app.engine('handlebars', exphbs({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost:5432/waiter';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

var waiterCallBack = waiter(pool);

app.get('/', function(req, res){
    res.render('index');
})

app.post('/waiter', async function(req, res, next){
    try {
        var waiter = req.body.username;
        var result = await waiterCallBack.waiterFunction(waiter);
        var waiterLength = await waiterCallBack.getWaiter(waiter);
        if(waiter == "" || waiterLength == 0){
            req.flash('alert', 'Only authorised personnel')
            res.redirect('/')
        }
        res.render('waiter', {
            results: result,
        }); 
    } catch (error) {
        next(error);
    }
});

app.post('/waiters/:username', async function(req, res, next){
    try {
            var Days = {username:req.params.username, Monday: req.body.Monday, Tuesday: req.body.Tuesday, Wednesday: req.body.Wednesday, Thursday: req.body.Thursday, Friday: req.body.Friday, Saturday: req.body.Saturday, Sunday: req.body.Sunday}
            await waiterCallBack.getSelected(Days)
            var workDays = await waiterCallBack.userDaysSelected(req.params.username)
            var results = await waiterCallBack.waiterFunction(req.params.username)
            console.log(results)
            console.log(workDays)
            console.log(Days)
            res.render('waiter', { 
            results: await waiterCallBack.waiterFunction(req.params.username),
            workDays: await waiterCallBack.userDaysSelected(req.params.username)
        })
    } catch (error) {
        next(error);
    }
})

app.get('/days', function(req, res){
    res.render('/')
})

const PORT = process.env.PORT || 1616;
app.listen(PORT, function(){
    console.log("App started at port:", PORT)
})