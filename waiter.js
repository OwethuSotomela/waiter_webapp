module.exports = function waiterApp(pool) {

    var message = "";

    async function waiterFunction(loggedIn) {
        var alreadyExist = await pool.query("SELECT * FROM employerAndEmployees WHERE username = $1", [loggedIn]);
        if (alreadyExist.rows.length == 0) {
            message = "Username not found";
            return 0
        } else {
            return alreadyExist.rows;
        }
    }

    async function getWaiter(loggedIn) {
        var alreadyExist = await pool.query("SELECT * FROM employerAndEmployees WHERE username = $1", [loggedIn]);
        if (loggedIn === "Sokie@admin") {
            return alreadyExist.rows.length;
        }
    }

    async function getAllDaysSelected() {
        var results = await pool.query("SELECT * FROM daysSelected");
        // console.log(results.rows)
        return results.rows;
    }

    async function userDaysSelected(username) {
        var results = await pool.query("SELECT * FROM daysSelected WHERE username = $1", [username]);
        // console.log(results.rows);
        return results.rows;
    }

    async function DaysToPiickAt(username){
        var results = await pool.query("SELECT * FROM daysSelected WHERE username = $1", [username]);
        var days = [{checked:"", day: "Monday"},{checked:"", day: "Tuesday"},{checked:"", day: "Wednesday"},{checked:"", day: "Thursday"},{checked:"", day: "Friday"},{checked:"", day: "Saturday"},{checked:"", day: "Sunday"}]
        if(results.rows.length !== 0){
            var resultsLoop = results.rows
            for (let index = 0; index < days.length; index++) {
                const day = days[index].day;
                resultsLoop.forEach(element => {
                    if(element.daychecked == day){
                        days[index].checked = "checked";
                    }
                });
            }    
        // console.log(days)
        } return days
    }

    async function getSelected(daysChecked, username) {

        for (const day in daysChecked) {
            var results = await pool.query("SELECT * FROM daysSelected WHERE dayCheckedUsername = $1", [daysChecked[day] + username]);
            var results2 = await pool.query("SELECT * FROM daysSelected WHERE dayCheckedUsername = $1", [day+ username]);
            if (daysChecked[day] != undefined) {
                if (results.rows.length == 0) {
                    await pool.query("insert into daysSelected (username, dayChecked, dayCheckedUsername) values ($1, $2, $3)", [username, daysChecked[day], daysChecked[day] + username]);
                    await addCounter(daysChecked[day]);
                } else {
                }
            } else {
                    await pool.query("DELETE FROM daysSelected WHERE (dayCheckedUsername=$1)", [day + username]);
                    await subractCounter(day);
            }
        }
        await pool.query("UPDATE daysWaiters SET color = 'btn-success' WHERE counter = 3");
        await pool.query("UPDATE daysWaiters SET color = 'btn-danger' WHERE counter > 3");
    }

    async function addCounter(day) {
        await pool.query("UPDATE daysWaiters SET counter = counter + 1 WHERE (daysAvailable=$1)", [day]);
    }

    async function subractCounter(day) {
        await pool.query("UPDATE daysWaiters SET counter = counter - 1 WHERE (daysAvailable=$1 AND NOT counter=0)", [day]);
    }

    async function getAllDaysAvailable() {
        var results = await pool.query("SELECT * FROM daysWaiters");
        // console.log(results);
        return results.rows;
    }

    async function getAllWaitersByDay(day) {
        var results = await pool.query("SELECT * FROM daysSelected WHERE (dayChecked=$1)", [day]);
        return results.rows;
    }

    async function clearDB() {
        await pool.query("DELETE FROM dayswaiters")
    }

    async function addColor() {
        await pool.query("DELETE FROM daysSelected")
        await pool.query("UPDATE daysWaiters SET color = 'btn-warning', counter=0 WHERE counter > 0")
    }

    async function insertNewUser(newWaiter, waiterName) {
        var newUserName = await pool.query("SELECT * FROM employerAndEmployees WHERE username = $1", [newWaiter])
        await pool.query(`insert into employerAndEmployees (username, names) values ($1, $2)`, [newWaiter, waiterName]);
        return newUserName.rows;
    }

    return {
        waiterFunction,
        getWaiter,
        getSelected,
        getAllDaysSelected,
        userDaysSelected,
        getAllDaysAvailable,
        getAllWaitersByDay,
        clearDB,
        addColor,
        insertNewUser,
        DaysToPiickAt
    }
}



// it("Should insert Banana basket to the database", async function () {

//     var allBaskets = ["Banana", "Apple", "Orange"]
//     var fruitBasket = [];

//     await basket.createFruitBasket("Banana", 1, 3)
//     var getFruitName = await basket.getFruit("")

//     getFruitName.forEach(element => {
//         fruitBasket.push(element.fruit_name)
//     });

//     assert.equal(allBaskets.length, fruitBasket.length)
// })