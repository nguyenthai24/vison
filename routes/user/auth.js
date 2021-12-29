const Router = require('@koa/router');
const router = new Router();
const passport = require('koa-passport')

//login with passport-google
router.get('/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    )
);

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login'
    })
);


//login with passport-facebook
router.get('/facebook',
    passport.authenticate('facebook', {scope: 'public_profile,email'})
);

router.get('/facebook/callback',
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (ctx) {
        // Successful authentication, redirect home.
        ctx.redirect('/dashboard');
    }
);

// logout
router.get('/logout', (ctx) => {
    ctx.logout();
    ctx.redirect('/user/login');
})

module.exports = router.routes();