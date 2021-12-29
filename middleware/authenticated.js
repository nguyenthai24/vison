

exports.checkAuthenticated = (ctx, next) => {
    if (ctx.isAuthenticated()) {
        return next();
    }
    return ctx.redirect('/user/login');
}
