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

    async function getAllDaysSelected() {
        var results = await pool.query("SELECT * FROM daysSelected");
        return results.rows;
    }

    async function userDaysSelected(username) {
        var results = await pool.query("SELECT * FROM daysSelected WHERE username = $1", [username]);
        return results.rows;
    }

    async function getSelected(nameOfWaiter){

        var daysWaiters = await pool.query("SELECT * FROM daysWaiters WHERE (daysAvailable = $1 OR daysAvailable = $2  OR daysAvailable = $3  OR daysAvailable = $4 OR daysAvailable = $5  OR daysAvailable =$6  OR daysAvailable =$7)",[
                nameOfWaiter.Monday,
                nameOfWaiter.Tuesday,
                nameOfWaiter.Wednesday,
                nameOfWaiter.Thursday,
                nameOfWaiter.Friday,
                nameOfWaiter.Saturday,
                nameOfWaiter.Sunday,
        ]);
        if (daysWaiters.rows.length > 0) {
            await pool.query("UPDATE daysWaiters SET counter = counter + 1 WHERE (daysAvailable = $1 OR daysAvailable = $2  OR daysAvailable = $3  OR daysAvailable = $4 OR daysAvailable = $5 OR daysAvailable = $6  OR daysAvailable = $7)",[
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
        if(prevent.length == 0) {
            await pool.query(`insert into daysSelected (username, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday) values ($1,$2,$3,$4,$5,$6,$7,$8)`,[
                nameOfWaiter.username,
                nameOfWaiter.Monday,
                nameOfWaiter.Tuesday,
                nameOfWaiter.Wednesday,
                nameOfWaiter.Thursday,
                nameOfWaiter.Friday,
                nameOfWaiter.Saturday,
                nameOfWaiter.Sunday,
            ]);
        } else {
        }
    }

    async function getAllDaysAvailable() {
        var results = await pool.query("SELECT * FROM daysWaiters");
        return results.rows;
    }

    async function emptyDB(){
        await pool.query("DELETE FROM daysSelected")
    }
    
    return {
        waiterFunction,
        getWaiter,
        getSelected,
        getAllDaysSelected,
        userDaysSelected,
        emptyDB,
        getAllDaysAvailable
    }
}