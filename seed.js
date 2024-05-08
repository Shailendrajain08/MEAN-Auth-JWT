const bookJSON = require('./bookstroe.book.json');
const Book = require('./models/book')
const seedBooksData = async () => {
    
    try {
        await Book.deleteMany({})
        await Book.insertMany(bookJSON);
        console.log("Data seeded successfully")
        
    } catch (error) {
        console.log("Error", error);        
    }
}

module.exports = {
    seedBooksData : seedBooksData
}
