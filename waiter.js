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

    async function getSelected(nameOfWaiter) {
        var daysWaiters = await pool.query("SELECT * FROM daysWaiters WHERE (daysAvailable = $1 OR daysAvailable = $2  OR daysAvailable = $3  OR daysAvailable = $4 OR daysAvailable = $5  OR daysAvailable = $6  OR daysAvailable = $7)", [
            nameOfWaiter.Monday,
            nameOfWaiter.Tuesday,
            nameOfWaiter.Wednesday,
            nameOfWaiter.Thursday,
            nameOfWaiter.Friday,
            nameOfWaiter.Saturday,
            nameOfWaiter.Sunday,
        ]);

        if (daysWaiters.rows.length > 0) {
            await pool.query("UPDATE daysWaiters SET counter = counter + 1 WHERE (daysAvailable = $1 OR daysAvailable = $2  OR daysAvailable = $3  OR daysAvailable = $4 OR daysAvailable = $5 OR daysAvailable = $6  OR daysAvailable = $7)", [
                nameOfWaiter.Monday,
                nameOfWaiter.Tuesday,
                nameOfWaiter.Wednesday,
                nameOfWaiter.Thursday,
                nameOfWaiter.Friday,
                nameOfWaiter.Saturday,
                nameOfWaiter.Sunday,
            ]);
        }
        var prevent = await userDaysSelected(nameOfWaiter.username)
        if (prevent.length == 0) {
            await pool.query(`insert into daysSelected (username, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) values ($1,$2,$3,$4,$5,$6,$7,$8)`, [
                nameOfWaiter.username,
                nameOfWaiter.Monday,
                nameOfWaiter.Tuesday,
                nameOfWaiter.Wednesday,
                nameOfWaiter.Thursday,
                nameOfWaiter.Friday,
                nameOfWaiter.Saturday,
                nameOfWaiter.Sunday,
            ]);
        }
         else {
            await pool.query("UPDATE daysSelected SET Monday = $1,Tuesday = $2, Wednesday = $3, Thursday = $4, Friday = $5, Saturday = $6,Sunday = $7 WHERE (username = $8)", [
                nameOfWaiter.Monday,
                nameOfWaiter.Tuesday,
                nameOfWaiter.Wednesday,
                nameOfWaiter.Thursday,
                nameOfWaiter.Friday,
                nameOfWaiter.Saturday,
                nameOfWaiter.Sunday,
                nameOfWaiter.username
            ]);
        }

        await pool.query("UPDATE daysWaiters SET color = 'btn-success' WHERE counter = 3");
        await pool.query("UPDATE daysWaiters SET color = 'btn-danger' WHERE counter > 3");
    }

    async function getAllDaysAvailable() {
        var results = await pool.query("SELECT * FROM daysWaiters");
        return results.rows;
    }

    async function getAllWaitersByDay(day) {
        var results = await pool.query("SELECT * FROM daysSelected WHERE (Monday= $1 OR Tuesday= $1 OR Wednesday= $1 OR Thursday= $1 OR Friday= $1 OR Saturday= $1 OR Sunday= $1)", [day]);
        return results.rows;
    }

    // async function emptyDB() {
    //     await pool.query("DELETE FROM daysSelected")
    // }

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
        // emptyDB,
        getAllDaysAvailable,
        getAllWaitersByDay,
        clearDB,
        addColor,
        insertNewUser,
    }
}