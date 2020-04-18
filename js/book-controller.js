'use strict'


function onInit() {
    createBooks();
    renderBooks();
}

function renderBooks() {
    var books = getBooks();
    var tableHTML = `<tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                     </tr>`;

    var strHtmls = books.map(getBookHTML)
    document.querySelector('table').innerHTML = tableHTML + strHtmls.join('');
}


function getBookHTML(book) {
    return `
            <tr>
                <td>${book.id}</td>
                <td><img src="img/book.jpg" alt="book-cover"></td>
                <td>${book.title}</td>
                <td>${book.price}</td>
                <td>
                    <button class="read-btn" onclick="onReadBook('${book.id}')">Read</button>
                    <button class="update-btn" onclick="onUpdateBook('${book.id}')">Update</button>
                    <button class="delete-btn" onclick="onDeleteBook('${book.id}')">Delete</button>
                </td>
            </tr>`
}

function onDeleteBook(bookId) {
    deleteBook(bookId);
    renderBooks();
}


function onSaveBook() {
    const elInput = document.querySelector('.add-book-input');
    const elBookTitle = elInput.querySelector('input[name="title"]');
    const elBookPrice = elInput.querySelector('input[name="price"]');

    const title = elBookTitle.value;
    const price = elBookPrice.value;

    addBook(title, price);
    renderBooks();

    elBookTitle.value = '';
    elBookPrice.value = '';
    elInput.hidden = true;
}



function onUpdateBook(bookId) {
    var newPrice = +prompt('What is the new price of the book?')
    updateBook(bookId, newPrice);
    renderBooks();
}


function onReadBook(bookId) {

    var book = getBookById(bookId);
    var elModal = document.querySelector('.modal');

    elModal.querySelector('h3').innerText = book.title;
    elModal.querySelector('h4').innerText = '$' + book.price;
    var strHTML = `
    
    <button class="rating-btn" onclick="onPlusRating('${bookId}')">+</button>
    <p>${book.rating}</p>
    <button class="rating-btn" onclick="onMinusRating('${bookId}')">-</button>`
    elModal.querySelector('.rating').innerHTML = strHTML;
    elModal.querySelector('h5').innerText = book.desc;
    elModal.hidden = false;

}


function onCloseModal(bookId) {
    var elModal = document.querySelector('.modal');
    elModal.hidden = true;
}


function onPlusRating(bookId) {
    var book = getBookById(bookId);
    if (book.rating === 10) return;
    book.rating++
        document.querySelector('p').innerText = book.rating;
    _saveBooksToStorage();
}


function onMinusRating(bookId) {
    var book = getBookById(bookId);
    if (!book.rating) return;
    book.rating--;
    document.querySelector('p').innerText = book.rating;
    _saveBooksToStorage();
}


function onNextPage() {
    nextPage();
    renderBooks();
}