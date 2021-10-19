module.exports = function waiterApp(pool) {

    var message = "";

    async function waiterFunction(nameOfWaiter) {
        var alreadyExist = await pool.query("SELECT * FROM waiters WHERE username = $1", [nameOfWaiter]);
        if (alreadyExist.rows.length == 0) {
            message = "Username not found";
        } else {
            return alreadyExist.rows;
        }
    }

    async function getWaiter(nameOfWaiter) {
        var alreadyExist = await pool.query("SELECT * FROM waiters WHERE username = $1", [nameOfWaiter]);
        return alreadyExist.rows.length;
    }

    async function getAllDaysSelected() {
        var results = await pool.query("SELECT * FROM daysSelected");
        return results.rows;
    }

    async function userDaysSelected(username) {
        var results = await pool.query("SELECT * FROM daysSelected WHERE username = $1", [username]);
        return results.rows;
    }

    async function getSelected(daysChecked, username) {

        for (const day in daysChecked) {
            if(daysChecked[day] != null) {
                var results = await pool.query("SELECT * FROM daysSelected WHERE dayCheckedUsername = $1", [daysChecked[day]+username]);
                if (results.rows.length == 0) {
                    await pool.query("insert into daysSelected (username, dayChecked, dayCheckedUsername) values ($1, $2, $3)", [username, daysChecked[day], daysChecked[day]+username]);
                    await addCounter(daysChecked[day]);
                } else {
                    await pool.query("DELETE FROM daysSelected WHERE (dayCheckedUsername=$1)", [daysChecked[day]+username]);
                    await subractCounter(daysChecked[day]);
                }
            }
        }
        await pool.query("UPDATE daysWaiters SET color = 'btn-success' WHERE counter = 3");
        await pool.query("UPDATE daysWaiters SET color = 'btn-danger' WHERE counter > 3");
    }

    async function addCounter(day) {
        await pool.query("UPDATE daysWaiters SET counter = counter + 1 WHERE (daysAvailable=$1)", [day]);
    }

    async function subractCounter(day) {
        await pool.query("UPDATE daysWaiters SET counter = counter - 1 WHERE (daysAvailable=$1)", [day]);
    }


    async function getAllDaysAvailable() {
        var results = await pool.query("SELECT * FROM daysWaiters");
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
        var newUserName = await pool.query("SELECT * FROM waiters WHERE username = $1", [newWaiter])
        await pool.query(`insert into waiters (username, names) values ($1, $2)`, [newWaiter, waiterName]);
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
    }
}