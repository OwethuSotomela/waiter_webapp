module.exports = function waiterApp(pool) {

    var message = "";

    async function waiterFunction(nameOfWaiter) {
        var alreadyExist = await pool.query("SELECT * FROM waiters WHERE username = $1", [nameOfWaiter]);
        if(alreadyExist.rows.length == 0){
            message = "Username not found";
        } else {
            return alreadyExist.rows;
        }
    }

    async function getWaiter(nameOfWaiter){
        var alreadyExist = await pool.query("SELECT * FROM waiters WHERE username = $1", [nameOfWaiter]);
        return alreadyExist.rows.length;
    }

    async function DaysSelected(objectOfDays) {
        // var alreadyExist = await pool.query("SELECT * FROM waiters WHERE username=$1", [nameOfWaiter]);
        // if(alreadyExist.rows.length == 0){
        //     await pool.query("INSERT INTO waiters (username) VALUES ($1)", [nameOfWaiter]);
        // }
    }

    async function getSelected(nameOfWaiter){
        // var selectedDays = await pool.query("SELECT * FROM daysWaiters WHERE daysAvailable = $1", [selected]);
        // return selectedDays.rows.length;

        // var alreadyExist = await pool.query("SELECT * FROM waiters WHERE username=$1", [nameOfWaiter]);
        // if(alreadyExist.rows.length == 0){
        //     await pool.query("INSERT INTO waiters (username) VALUES ($1)", [nameOfWaiter]);
        // }
    }

    return {
        waiterFunction,
        getWaiter,
        getSelected,
    }
}