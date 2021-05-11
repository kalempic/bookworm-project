const mongoose = require('mongoose');
const Books = require('./models/books');
const books_import = require('./booksDatabase');

mongoose.connect('mongodb://localhost:27017/booksdb',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//ako je uspesno otvoreno tj radi ili ako ne radi

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    // await Campground.deleteMany({});
    for (let i = 0; i < books_import.length; i++) {
        const book = new Books(books_import[i])
        await book.save(function (err, book) {
            if (err) return console.error(err);
            console.log(book.name + " saved to bookstore collection.");
        });
    }
    console.log("Zapamtio knjige!");

}
seedDB().then(() => {
    // mongoose.connection.close();
    console.log("Database disconnected");
})
