const express = require('express');
const router = express.Router();
const bookscontrol = require('../controllers/bookscontrol');
const catchAsync = require('../helpers/CatchAsync');
const Books = require('../models/books');
const {isLoggedIn, isAuthor, validateBooks} = require('../middleware');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '-' + Date.now() + '.' + extension)
    }
})
// const upload = multer({ dest: 'uploads/' });
const upload = multer({storage: storage});


router.route('/')
    .get(isLoggedIn, catchAsync(bookscontrol.index))
    .post(isLoggedIn, upload.single('image'), validateBooks, catchAsync(bookscontrol.createBook));

router.get('/new', isLoggedIn, bookscontrol.renderNewForm);

router.route('/:id')
    .get(catchAsync(bookscontrol.showBook))
    .put(isLoggedIn, isAuthor,upload.single('image'), validateBooks, catchAsync(bookscontrol.updateBook))
    .delete(isLoggedIn, isAuthor, catchAsync(bookscontrol.deleteBook));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(bookscontrol.renderEditForm));


module.exports = router;