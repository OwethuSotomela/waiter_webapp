const assert = require("assert");
const Waiter_App = require("../waiter");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:codex123@localhost:5432/waiter';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const waitersApp = Waiter_App(pool);

describe('Waiter and owner logins', async function () {

    beforeEach(async function () {
        await pool.query("DELETE FROM daysselected;");
        await pool.query("DELETE FROM employerAndEmployees;");

        await pool.query("INSERT INTO employerAndEmployees (username, names) VALUES ($1, $2)", ['OwSoto', 'Owethu Sotomela']);
        await pool.query("INSERT INTO employerAndEmployees (username, names) VALUES ($1, $2)", ['Wethu', 'Ohworthy SotoKnife']);
        await pool.query("INSERT INTO employerAndEmployees (username, names) VALUES ($1, $2)", ['Zena123', 'Zena Tyiso']);
        await pool.query("INSERT INTO employerAndEmployees (username, names) VALUES ($1, $2)", ['Makho123', 'Makhosandile Makho']);
        await pool.query("INSERT INTO employerAndEmployees (username, names) VALUES ($1, $2)", ['Pholisa123', 'Pholisa Fatyela']);
        await pool.query("INSERT INTO employerAndEmployees (username, names) VALUES ($1, $2)", ['Sokie@admin', 'Sokie Sotomela']);
    });

    it('Should return the name of the username that was passed', async function () {
        var usernameRows = await waitersApp.waiterFunction('OwSoto');
        var username = '';

        usernameRows.forEach(element => {
            username = element.username
        });
        assert.equal(username, 'OwSoto');
    });

    it('Should return the name of the username that was passed', async function () {
        var usernameRows = await waitersApp.waiterFunction('Wethu');
        var username = '';

        usernameRows.forEach(element => {
            username = element.username
        })
        assert.equal(username, 'Wethu');
    });

    it('Should return the name of the username that was passed', async function () {
        var usernameRows = await waitersApp.waiterFunction('Zena123');
        var username = '';

        usernameRows.forEach(element => {
            username = element.username
        });
        assert.equal(username, 'Zena123')
    });

    it('Should return the name of the username that was passed', async function () {
        var usernameRows = await waitersApp.waiterFunction('Makho123');
        var username = '';

        usernameRows.forEach(element => {
            username = element.username
        });
        assert.equal(username, 'Makho123')
    });

    it('Should return the name of the username that was passed', async function () {
        var usernameRows = await waitersApp.waiterFunction('Pholisa123');
        var username = '';

        usernameRows.forEach(element => {
            username = element.username
        });
        assert.equal(username, 'Pholisa123')
    });

    it('Should return the name of the username that was passed', async function () {
        var usernameRows = await waitersApp.waiterFunction('Sokie@admin');
        var username = '';

        usernameRows.forEach(element => {
            username = element.username
        });
        assert.equal(username, 'Sokie@admin')
    });
});

describe('Getting waiter selected days', async function () {
    it('Should return user selected days', async function () {

        var allDays = ["Monday", "Tuesday", "Wednesday"]
        var selectedDays = [];

        await waitersApp.getSelected({ day: 'Monday' }, 'OwSoto');
        await waitersApp.getSelected({ day: 'Tuesday' }, 'OwSoto');
        await waitersApp.getSelected({ day: 'Wednesday' }, 'OwSoto');

        var getDaysSelected = await waitersApp.userDaysSelected('OwSoto');

        getDaysSelected.forEach(element => {
            selectedDays.push(element.daychecked)
        })

        assert.deepEqual(allDays, selectedDays)
    });

    it('Should return user selected days', async function () {

        var allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        var selectedDays = [];

        await waitersApp.getSelected({ day: 'Monday' }, 'OwSoto');
        await waitersApp.getSelected({ day: 'Tuesday' }, 'OwSoto');
        await waitersApp.getSelected({ day: 'Wednesday' }, 'OwSoto');
        await waitersApp.getSelected({ day: 'Thursday' }, 'OwSoto');
        await waitersApp.getSelected({ day: 'Friday' }, 'OwSoto');
        await waitersApp.getSelected({ day: 'Saturday' }, 'OwSoto');
        await waitersApp.getSelected({ day: 'Sunday' }, 'OwSoto');

        var getDaysSelected = await waitersApp.userDaysSelected('OwSoto');

        getDaysSelected.forEach(element => {
            selectedDays.push(element.daychecked)
        });

        assert.deepEqual(allDays, selectedDays)
    });
});

describe('Sign-up screen', async function(){
    it('Should allow waiters not on the database to register themselves', async function(){

        var newWaiter = await waitersApp.insertNewUser('Aphiwe', 'Aphiwe Zozo')
        var username = '';

        newWaiter.forEach(element => {
            getUserName = element.username
        })

        assert.equal(newWaiter, username, 'AP')
    });
});


