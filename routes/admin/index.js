const Router = require('@koa/router');
const router = new Router();
const controller = require('../../controllers/admin.controller');
const path = require('path')
const multer = require('@koa/multer');

// upload file storage path, and file name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: function (req, file, cb) {
    let date = new Date().toISOString().replace(/:/g, '-');
    cb(null, file.fieldname + '-' + date);
  }
})

const limits = {
  Fields: 10,// number of non-file fields
  FileSize: 500 * 1024,// fileSize in b
  Files: 1// files
}

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('This is not image file type'), false)
  }
}

const upload = multer({ storage, limits })

const cpUpload = upload.fields([
  { name: "imgSmall", maxCount: 1 },
  { name: "imgBig", maxCount: 1 }
])
////////////////////////

router.get('/home', controller.home);



//get add game
router.get('/add-game', async (ctx) => {
  let message = ctx.flash('error')[0];
  await ctx.render('admin/add-game', {error : message})
})

router.get('/update-game', async (ctx) => {
  await ctx.render('admin/update-game')
})


router.get('/find-game', async (ctx) => {
  await ctx.render('admin/find-game')
})

// show list image game 
router.get('/show-list-image', controller.showImg);

//curd game
router.post('/add-game', cpUpload, controller.create );
router.post('/add-game-ajax')
router.post('/update-game', cpUpload, controller.update);
router.get('/update-game/:id', cpUpload, controller.find);
router.delete('/detele-game/:id', cpUpload, controller.delete);




module.exports = router.routes();