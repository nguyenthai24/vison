const Router = require('@koa/router');
const router = new Router();
const controller = require('../../controllers/auth.controller.js')
const passport = require('koa-passport')
router.get('/login', async (ctx) => {
    await ctx.render('login')
})


router.get('/register', async (ctx) => {
    await ctx.render('register')
})
router.post('/register', controller.register)


//login with passport-local
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/user/login',
 
    })
);

module.exports = router.routes();






