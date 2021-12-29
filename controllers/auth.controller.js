const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/User');


exports.register = async (ctx) => {
    const {
        name,
        email,
        password,
        password1
    } = ctx.request.body;
    
    if (!email || !name || !password || !password1) {
        return ctx.throw(200, 'Input required');
    }
    if (password != password1) {
        return ctx.throw(200, 'Password not match');
    }
    let result = await User.findOne({ email });
    if (result) {
        return ctx.throw(200, ' Email already exists ');
    }
    
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    let newUser = new User({
        name,
        email,
        password: hash
    });
    let user = await newUser.save();
    ctx.body = {
        "status": true,
        "message": "register user successfully",
        "data": user
    };
}