const Game = require("../models/Game");

module.exports = {
    //Home
    home: (ctx) => {
        console.log(123);
    },
    checkGame: () => {
        const result = Game;
    },
    //Create
    create: async (ctx) => {
        let { name, content, desc, form_select } = ctx.request.body;
        let position = parseInt(form_select);
        if (!name || !content || !desc) {
            ctx.flash("error", "filed not empty");
            return ctx.redirect("/admin/add-game");
        }
        const imgSmall =
            typeof ctx.files.imgSmall !== "undefined"
                ? ctx.files.imgSmall[0].path.split("public")[1]
                : "";
        const imgBig =
            typeof ctx.files.imgBig !== "undefined"
                ? ctx.files.imgBig[0].path.split("public")[1]
                : "";

        if (position === 0) {
            let newGame = new Game({
                name,
                content,
                desc,
                userId: ctx.state.user._id || "",
                imgSmall: imgSmall,
                imgBig: imgBig,
                featured: false,
                position: null,
            });

            let game = await newGame.save();

            if (game) {
                ctx.flash("success", "add game successfully");
                return ctx.redirect("/dashboard");
            }
        } else {
            const checkGame = await Game.findOne({ position: position });
            if (checkGame) {
                await Game.findOneAndUpdate({ position: position }, {
                    featured: false,
                    position: null,
                });
                let newGame = new Game({
                    name,
                    content,
                    desc,
                    userId: ctx.state.user._id || "",
                    imgSmall: imgSmall,
                    imgBig: imgBig,
                    featured: true,
                    position: position,
                });
                let game = await newGame.save();
                if (game) {
                    ctx.flash("success", "add game successfully");
                    return ctx.redirect("/dashboard");
                }
            } else {
                let newGame = new Game({
                    name,
                    content,
                    desc,
                    userId: ctx.state.user._id || "",
                    imgSmall: imgSmall,
                    imgBig: imgBig,
                    featured: true,
                    position: position,
                });
                let game = await newGame.save();
                if (game) {
                    ctx.flash("success", "add game successfully");
                    return ctx.redirect("/dashboard");
                }
            }
        }
    },
    //Read
    findAll: async (ctx) => {
        let message = ctx.flash("success")[0];
        try {
            let games = await Game.find({})
                .populate({ path: "userId", select: "email" })
                .limit(2)
                .sort({
                    createAt: "asc",
                });

            if (games) {
                return await ctx.render("dashboard", {
                    data: games,
                    success: message,
                });
            }
        } catch (error) {
            console.log(error.message);
        }
    },

    //pagination
    pagination: async (ctx) => {
        // const page = (typeof page ==='undefined' || ctx.body.page > 0) ? ctx.body.page : 1;
        let page;
        if (typeof page != "undefined" || ctx.request.body.page > 0) {
            page = ctx.request.body.page;
        } else {
            page = 1;
        }
        const page_size = 2;
        const skip = (page - 1) * page_size;
        try {
            let totalPage = await Game.count({ type: "jungle" });
            let game = await Game.find({}).limit(page_size).skip(skip);

            if (game.length > 0) {
                return (ctx.body = {
                    status: true,
                    game: game,
                    totalPage: totalPage,
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    //Update
    update: async (ctx) => {
        const { name, content, desc, id, imgSmall1, imgBig1 } = ctx.request.body;
        // if (!name || !content || !desc) {
        //     return ctx.throw(200, ' fields not empty');
        // }
        const imgSmall =
            typeof ctx.files.imgSmall !== "undefined"
                ? ctx.files.imgSmall[0].path.split("public")[1]
                : imgSmall1;
        const imgBig =
            typeof ctx.files.imgBig !== "undefined"
                ? ctx.files.imgBig[0].path.split("public")[1]
                : imgBig1;

        let game = await Game.findByIdAndUpdate(
            { _id: id },
            {
                name,
                content,
                desc,
                imgSmall: imgSmall,
                imgBig: imgBig,
            }
        );
        if (game) {
            return ctx.redirect("/dashboard");
        }
    },

    //Delete
    delete: async (ctx) => {
        const id = ctx.params.id;
        let result = await Game.findByIdAndRemove({ _id: id });
        if (result) {
            return (ctx.body = {
                mess: "delete game success",
                data: result,
            });
        }
    },

    //find by id
    find: async (ctx) => {
        const id = ctx.params.id;
        try {
            let game = await Game.findOne({ _id: id });
            if (game) {
                return ctx.render("/admin/update-game", {
                    data: game,
                });
            }
        } catch (error) {
            return (ctx.body = {
                mess: "error",
                data: error.message,
            });
        }
    },

    showImg: async (ctx) => {
        try {
            let result = await Game.find({});
            let arr, arr1, arr2;
            result.forEach((element, index) => {
                if(element.position == 1) {
                    arr =  element ;
                } else if(element.position == 2) {
                    arr1 =  element ;
                } else if (element.position == 3) {
                    arr2 = element;
                }
            });
            let result1 = (arr) ? arr : '';
            let result2 = (arr1) ? arr1 : '';
            let result3 = (arr2) ? arr2 : '';
            console.log(   result3)
            return await ctx.render('showImage', {
                data: {
                    result1,
                    result2,
                    result3
                }
            })
        } catch (error) {
            console.log(error);
        }
    },

 
};
