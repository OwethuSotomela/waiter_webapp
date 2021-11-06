const assert = require("assert");
const Waiter_App = require("../waiter");
const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/travis_ci_test';

const pool = new Pool({
    connectionString: connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const waitersApp = Waiter_App(pool);

describe('getWaiter', async function() {
    it('should return the row whose username is entered', async function() {
        var usernameRows = await waitersApp.waiterFunction('OwSoto');
        var username = '';

        usernameRows.forEach(element => {
            username = element.username
        });
        assert.equal(username, 'OwSoto');
    });

    it('Should return the row whose username is entered', async function(){
        var usernameRows = await waitersApp.waiterFunction('Wethu');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        })
        assert.equal(username, 'Wethu');
    });

    it('Should return the row whose username is entered', async function(){
        var usernameRows = await waitersApp.waiterFunction('Zena123');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        });
        assert.equal(username, 'Zena123')
    });

    it('Should return the row whose username is entered', async function(){
        var usernameRows = await waitersApp.waiterFunction('Makho123');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        });
        assert.equal(username, 'Makho123')
    });

    it('Should return the row whose username is entered', async function(){
        var usernameRows = await waitersApp.waiterFunction('Pholisa123');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        });
        assert.equal(username, 'Pholisa123')
    });

    it('Should return the row whose username is entered', async function(){
        var usernameRows = await waitersApp.waiterFunction('Sokie@admin');
        var username = '';

        usernameRows.forEach(element =>{
            username = element.username
        });
        assert.equal(username, 'Sokie@admin')
    });
});

