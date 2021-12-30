const Router = require('@koa/router');
const router = new Router();
const admin = require('./admin')
const user = require('./user')
const auth = require('./user/auth')
const middleware = require('../middleware/authenticated')
const controller = require('../controllers/admin.controller')
const axios = require('axios');
router.get('/home', async (ctx) => { 
    await ctx.render('layout')
})
router.get('/img' , controller.showImg)

// render dashboard
router.get('/dashboard',middleware.checkAuthenticated, controller.findAll)
router.post('/dashboard', middleware.checkAuthenticated, controller.pagination)
router.use('/user', user)
router.use('/admin', admin)
router.use('/auth', auth)



module.exports = router.routes();