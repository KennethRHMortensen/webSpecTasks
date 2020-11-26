const $ = function(id){
    return document.getElementById(id);
}

let addBtn = $('add');
let booksContainer = [];

let bookTitle = $('userTitle');
let bookAuthor = $('userAuthor');
let bookGenre;


const addBook = function () {
    localStorage.setItem('title', bookTitle);
    localStorage.setItem('author', bookAuthor);

    if (isLocalStorageEnabled) {
        let data = localStorage.getItem('books');
        book = JSON.parse(data);
        console.log(`book.title = ${book.title}\nbook.author = ${book.author}`);
    } else {
        console.log('You must allow local storage in your browser');
    }

}
const isLocalStorageEnabled = function () {
    let foo = 'bar';
    try {
        localStorage.setItem(foo, foo);
        localStorage.removeItem(foo);
        return true;
    } catch(e) {
        return false;
    }
}

if (isLocalStorageEnabled) {
    localStorage.removeItem('foo');
    let book = {
        title: 'hej',
        author: bookAuthor,
        genre: bookGenre
    };
    let test = JSON.stringify(book);
    localStorage.setItem('books', test);
} else {
    console.log('You must allow local storage in your browser');
}


addBtn.addEventListener('click', addBook);
