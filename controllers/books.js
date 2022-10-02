const Book = require('../models/books');

module.exports.index = async (req, res) => {
    const books = await Book.find({}).populate('popupText');
    res.render('allbooks/index', {books})
}

module.exports.renderNewForm = (req, res) => {
    res.render('allbooks/new');
}

module.exports.createBook = async (req, res, next) => {
    // res.send(req.body);
    const book = new Book(req.body.book);
    book.image = req.file.path;
    book.author = req.user._id;
    await book.save();
    console.log(book);
    req.flash('success', 'Successfully added a new book!');
    res.redirect(`/allbooks/${book._id}`)
}

module.exports.showBook = async (req, res,) => {
    const book = await Book.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!book) {
        req.flash('error', 'Cannot find that book!');
        return res.redirect('/allbooks');
    }
    res.render('allbooks/show', {book});
}

module.exports.renderEditForm = async (req, res) => {
    const {id} = req.params;
    const book = await Book.findById(id)
    if (!book) {
        req.flash('error', 'Cannot find that book!');
        return res.redirect('/allbooks');
    }
    res.render('allbooks/edit', {book});
}

module.exports.updateBook = async (req, res) => {
    const {id} = req.params;
    console.log(req.body);
    const book = await Book.findByIdAndUpdate(id, {...req.body.book});
    const imgs = req.files.map(f => ({url: f.path, filename: f.filename}));
    book.images.push(...imgs);
    await book.save();
    req.flash('success', 'Successfully updated book!');
    res.redirect(`/allbooks/${book._id}`)
}

module.exports.deleteBook = async (req, res) => {
    const {id} = req.params;
    await Book.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted book')
    res.redirect('/allbooks');
}
