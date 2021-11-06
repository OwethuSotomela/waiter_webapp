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

describe('getWaiter', async function() {
    it('Should return the name of the username that was passed', async function() {
        var usernameRows = await waitersApp.waiterFunction('OwSoto');
        var username = '';

        usernameRows.forEach(element => {
            username = element.username
        });
        assert.equal(username, 'OwSoto');
    });

    it('Should return the name of the username that was passed', async function(){
        var usernameRows = await waitersApp.waiterFunction('Wethu');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        })
        assert.equal(username, 'Wethu');
    });

    it('Should return the name of the username that was passed', async function(){
        var usernameRows = await waitersApp.waiterFunction('Zena123');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        });
        assert.equal(username, 'Zena123')
    });

    it('Should return the name of the username that was passed', async function(){
        var usernameRows = await waitersApp.waiterFunction('Makho123');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        });
        assert.equal(username, 'Makho123')
    });

    it('Should return the name of the username that was passed', async function(){
        var usernameRows = await waitersApp.waiterFunction('Pholisa123');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        });
        assert.equal(username, 'Pholisa123')
    });

    it('Should return the name of the username that was passed', async function(){
        var usernameRows = await waitersApp.waiterFunction('Sokie@admin');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        });
        assert.equal(username, 'Sokie@admin')
    });
});

describe('Get selected days', async function(){
    it('Should return user selected days', async function(){

        var allDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        var selectedDays = [];

        await waitersApp.getSelected({day:'Monday'}, 'OwSoto');
        await waitersApp.getSelected({day:'Tuesday'}, 'OwSoto');

        var getDaysSelected = await waitersApp.userDaysSelected('');

        getDaysSelected.forEach(element =>{
            selectedDays.push(element.daysChecked)
            console.log(element.daysChecked)
        })
        assert.equal(selectedDays.daysChecked, allDays.daysChecked)
        console.log(selectedDays.daysChecked)
        console.log(allDays.daysChecked)
    });
});


