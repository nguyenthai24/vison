const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const bodyParser = require('koa-bodyparser');
const router = require('./routes');
const http = require('http');
var views = require('koa-views');
const path = require('path');
const render = require('koa-ejs');
const serve = require('koa-static');
const mongoose = require('./config/db')
const session = require('koa-session')
const passport = require('koa-passport')
const flash = require('koa-better-flash');
app.use(serve(__dirname + '/public'));

require('./controllers/passport.controller')(passport)
require('dotenv').config({ path: './config/.env' })
render(app, {
    root: path.join(__dirname, 'views'),
    layout: 'layout',
    viewExt: 'ejs',
    cache: false,
    debug: false
  });

mongoose.connectDB()

// session
app.keys = ['secret']
app.use(session({}, app))


// session passport
app.use(passport.initialize())
app.use(passport.session())


app.use(json());
app.use(bodyParser());

app.use(flash());

 //ERROR HANLDE
app.use(async (ctx, next) => {
   
    try {
        await next();
        const status = ctx.status;
        if (status === 404) {
            ctx.throw(404);
        }
        console.log("REqest end")
    } catch(err) {
        console.error(err);
        ctx.status = err.status || 500;
        if (ctx.status === 200) {
            ctx.body = {status: false, message: err.message};
        } else if (ctx.status === 404) {
            ctx.body = {status: false, message: "URL NOT FOUND"};
        } else {
            ctx.body = err;
        }
    }
});


app.use(router)


var PORT = process.env.PORT || 3000
http.createServer(app.callback()).listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});

