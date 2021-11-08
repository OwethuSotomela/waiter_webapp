module.exports = function (waiterCallBack) {

    function home(req, res) {
        res.render('index');
    }

    async function login(req, res, next) {
        try {
            var loggedIn = req.body.username;
            var result = await waiterCallBack.waiterFunction(loggedIn);
            var loggedInLength = await waiterCallBack.getWaiter(loggedIn);
            if (loggedIn == "" || result == 0 || loggedInLength == 0) {
                req.flash('alert', 'Sign-up as a new waiter to get a username')
                res.redirect('/signup')
            }
            if (loggedIn === "Sokie@admin") {
                res.render('days', {
                    workDays: await waiterCallBack.getAllDaysAvailable()
                })
            }
            res.render('waiter', {
                results: result,
                workDays: await waiterCallBack.userDaysSelected(loggedIn),
                Aweek: await waiterCallBack.DaysToPiickAt(loggedIn)
            });
        } catch (error) {
            next(error);
        }
    };

    async function waiterDays(req, res, next) {
        try {
            var Days = { Monday: req.body.Monday, Tuesday: req.body.Tuesday, Wednesday: req.body.Wednesday, Thursday: req.body.Thursday, Friday: req.body.Friday, Saturday: req.body.Saturday, Sunday: req.body.Sunday }

            console.log(Days)

            await waiterCallBack.getSelected(Days, req.params.username)
            var workDays = await waiterCallBack.userDaysSelected(req.params.username)
            var results = await waiterCallBack.waiterFunction(req.params.username)

            res.render('waiter', {
                results,
                workDays,
                Aweek: await waiterCallBack.DaysToPiickAt(req.params.username)
            })
        } catch (error) {
            next(error);
        }
    };

    async function back(req, res) {
        res.redirect('/waiters/:username')
    };

    async function signup(req, res) {
        res.render('signup')
    };

    async function redirect(req, res) {
        res.redirect('/')
    };

    async function gettingDays(req, res) {
        res.render('days', {
            workDays: await waiterCallBack.getAllDaysAvailable()
        })
    };

    async function allDays(req, res) {
        res.render('days', {
        })
    };

    async function coloredDays(req, res) {
        res.render('days', {
            workDays: await waiterCallBack.getAllDaysAvailable()
        })
    };

    async function deletes(req, res) {
        await waiterCallBack.addColor()
        res.render('days', {
            workDays: await waiterCallBack.getAllDaysAvailable()
        })
    };

    async function availableDays(req, res) {
        res.render('daysavailable', {
            workDays: await waiterCallBack.getAllWaitersByDay(req.params.daysavailable)
        })
    };

    async function redirectBack(req, res) {
        res.redirect('days')
    };

    async function register(req, res, next) {
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
    };

    return {
        home,
        login,
        waiterDays,
        back,
        signup,
        redirect,
        gettingDays,
        allDays,
        coloredDays,
        deletes,
        availableDays,
        redirectBack,
        register
    }
};