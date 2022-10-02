const express = require('express');
const router = express.Router();
const bookscontrol = require('../controllers/books');
const catchAsync = require('../helpers/catchAsync');
const Books = require('../models/books');
const {isLoggedIn, isAuthor, validateBook} = require('../middleware');
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
const upload = multer({storage: storage});


router.route('/')
    .get(isLoggedIn, catchAsync(bookscontrol.index))
    // .post(isLoggedIn, validateBook, catchAsync(bookscontrol.createBook));
    // .post(isLoggedIn, upload.single('image'), validateBook, catchAsync(bookscontrol.createBook));
    .post(isLoggedIn, upload.single('image'), catchAsync(bookscontrol.createBook));
// .post(isLoggedIn, catchAsync(bookscontrol.createBook));

router.get('/new', isLoggedIn, bookscontrol.renderNewForm);

router.route('/:id')
    .get(catchAsync(bookscontrol.showBook))
    .put(isLoggedIn, isAuthor, upload.single('image'), validateBook, catchAsync(bookscontrol.updateBook))
    // .put(isLoggedIn, validateBook, catchAsync(bookscontrol.updateBook))
    .delete(isLoggedIn, isAuthor, catchAsync(bookscontrol.deleteBook));


router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(bookscontrol.renderEditForm));


module.exports = router;
