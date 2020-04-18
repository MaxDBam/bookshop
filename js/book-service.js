'use strict'


const gTitles = ['Harry Potter', 'LoTR', 'GoT', 'Night Watch', 'Magicians', 'HxH'];
const KEY = 'books';
var gBooks;
const PAGE_SIZE = 4;
var gPageIdx = 0;

function nextPage() {
    var numOfPages = Math.floor(gTitles.length / PAGE_SIZE);

    if (gPageIdx < numOfPages) gPageIdx++;
    else gPageIdx = 0;
}


function deleteBook(bookId) {
    var bookIdx = gBooks.findIndex(function(book) {
        return bookId === book.id;
    });
    gBooks.splice(bookIdx, 1)
    _saveBooksToStorage();
}


function getBooks() {
    var startIdx = gPageIdx * PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE);

}

function getTitles() {
    return gTitles;
}

function addBook(title, price) {
    const book = _createBook(title, price);
    gBooks.unshift(book);
    _saveBooksToStorage();
}


function getBookById(bookId) {
    var book = gBooks.find(function(book) {
        return book.id === bookId;
    });
    return book;
}



function getBookByTitle(bookTitle) {
    return gBooks.find(book => bookTitle === book.title);
}



function getBookIdx(bookId) {
    return gBooks.findIndex(book => bookId.toString() === book.id);
}



function updateBook(bookId, newPrice) {
    const book = gBooks.find(function(book) {
        return book.id === bookId;
    });

    book.price = newPrice;
    _saveBooksToStorage();
}



function _createBook(title, price) {
    if (!price) price = getRandomIntInclusive(5, 100);
    return {
        id: makeId(),
        title,
        price,
        rating: 0,
        desc: makeLorem()
    }
}

function createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [];
        for (let i = 0; i < 4; i++) {
            var title = gTitles[getRandomIntInclusive(0, gTitles.length - 1)];
            const book = _createBook(title);
            books.push(book);

        }
    }
    gBooks = books;
    _saveBooksToStorage();
}


function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}