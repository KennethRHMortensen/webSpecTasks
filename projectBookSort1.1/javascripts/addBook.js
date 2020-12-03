// When the librarian wants to add a book, they should be able to add
// title, author, genre and a cover image for the book to be displayed

// Shortkeys
const $ = function(id){
    return document.getElementById(id);
}

// Global variables 
let addBtn = $('add');
let addImage = $('addImage');
let sort = $('sort');
let clear = $('clearLocalStorage');
let book = {};
let bookShelf = $('container');


// ADD BOOK TO ARRAY
// Create global array of books
let books = [];


// CHECK IF LOCALSTORAGE IN BROWSER IS TRUE OR FALSE 
const isLocalStorageEnabled = function () {
    let test = 'this is a test';
    // if browser allows to set and remove item, it will return true, and therefor be enabled
    try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    // if browser doesnt allow, it will catch the event and return false
    } catch(e) {
        return false;
    }
}

// CLEAR LOCAL STORAGE IN BROWSER
const clearLocalStorage = function (){
    if (isLocalStorageEnabled) {
    localStorage.clear();
    window.location.reload();
    // HOW DO I CHECK IF LOCAL STORAGE IS CLEARED?????
        if (!localStorage.getItem()){
            console.log('Localstorage is now cleared')
        }
    } else {
    console.log('Local storage was not enabled, so there is nothing to clear');
    }
}

// if book input fields does not have values, return false with alert to stop the function
const checkIfAddBook = function (book){
    if(!book.title){
        alert('you forgot to write a title');
        $('userTitle').focus();
        return false;
    }
    if(!book.author){
        alert('you forgot to add an author');
        $('userAuthor').focus();
        return false;
    }
    if(!book.genre){
        alert('you forgot to add a genre');
        $('checkbox').focus();
        return false;
    }
}

// ADD BOOK TO ARRAY 'BOOKS'
const addBook = function (){

    // assign book as object
        let book = {
            title: $('userTitle').value,
            author: $('userAuthor').value,
            genre: (checkGenre()),
            image: $('selectImage').value
        };
        if(checkIfAddBook(book) == false){
            return false;
        } 

        // reset input field and move focus to next input field

        // add book to array of books
        books.push(book); 
        
        // convert books into JSON string
        let s = JSON.stringify(books); 
        
        // set book as item with values 's' to localstorage
        localStorage.setItem('book', s); 

        // apply genres checked in checkboxes
        checkGenre(book);

        // append cover image to the book
        //addImageToBook(book);  
        
        // Push book to array on click 
        addBookToContainer(book); 

        // add book to local storage
        addToLocalStorage(book);

}

// ADD GENRES SELECTED TO BOOK BEFORE PUSHING BOOK TO ARRAY
const checkGenre = function(){
    let genres ='';

    let checkboxes = document.querySelectorAll('#checkbox input:checked');

    checkboxes.forEach(element => {
        // for each checkbox checked, let genre get the attribute value assigned to it
        let genre = element.getAttribute('value');
        // if genres is not null, add comma behind the each value 
        if(genres != ''){
            genres += ', ';
        }
        // add multiple genres to genres if selected
        genres += genre;
    });

    return genres;
}

const addBookToContainer = function (book) {
    // create new book as div with classes assigned to it
    let newBook = document.createElement('div');
    newBook.setAttribute('class', 'book ' + `${book.genre = checkGenre()}`);
    
    // create div with info about book, inside of book     
    let newBookInfo = document.createElement('div');
    newBookInfo.setAttribute('class', 'bookInfo');

    // create header with textnode of the checked genre    
    let newBookGenre = document.createElement('h4');
    newBookGenre.setAttribute('class', 'genre');
    let genreText = document.createTextNode(`${book.genre}`);
    newBookGenre.appendChild(genreText);
    
    // set coverpicture of book    
    let newBookTitle = document.createElement('h2');
    newBookTitle.setAttribute('class', 'title');
    let titleText = document.createTextNode(`${book.title}`);
    newBookTitle.appendChild(titleText);
    
    // set coverpicture of book    
    let newBookAuthor = document.createElement('h3');
    newBookAuthor.setAttribute('class', 'author');
    let authorText = document.createTextNode(`${book.author}`);
    newBookAuthor.appendChild(authorText);

    // set coverpicture of book
    let newBookPic = document.createElement('div');
    newBookPic.setAttribute('class', 'bookPicture' + 'id', 'bookPic');
    
    newBookInfo.append(newBookGenre, newBookTitle, newBookAuthor);
    newBook.append(newBookPic, newBookInfo);
    bookShelf.appendChild(newBook);
}

// ADD TO LOCALSTORAGE WHEN ADDING BOOK
const addToLocalStorage = function (book){
    if (isLocalStorageEnabled) {
        let data = localStorage.getItem('books'); 
        console.log('This is your current array of books' + books);
        // If there is any data, parse it to books array
        if (data) { 
            books = JSON.parse(data); 
        // Else console log that no data has been written or checked
        }else {
            // books = [];
            console.log('No data to parse to books')
        }
    let s = JSON.stringify(books); 
    localStorage.setItem('books', s); 
    console.log(`This is the values of the books you just added: \nbook.title = ${book.title}\nbook.author = ${book.author}\nbook.genre = ${book.genre = checkGenre()}\nbook.image = ${book.image}`);
    } else {
    console.log('You must allow local storage in your browser');
    }   
}
const initBookList = function(){

}


// Eventlisteners
addBtn.addEventListener('click', addBook);
// addImage.addEventListener('change', addImageToBook, true);
clear.addEventListener('click', clearLocalStorage);
document.addEventListener('load', isLocalStorageEnabled);
document.addEventListener('load', initBookList);



/*
//Add a book to the container
const addBook = function () {
    if (isLocalStorageEnabled) {
        console.log(`display the object books: ${localStorage}`); //displays the books objects items in console
        let data = localStorage.getItem('books'); //defines the value of data as the stored data in books from our localstorage
        console.log(`display the type of data and content ${typeof data} data: ${data}`); //displays the type of our variable "data", and writes the data values in console
        if (data == null) { //If no data is found, empty the books array
            books = [];
        }else {
            books = [JSON.parse(data)]; //If data has content, parse data values through JSON into the books array
        }
        //assign object to book with names and values
        let book = {
            title: $('userTitle').value,
            author: $('userAuthor').value,
            image: $('selectImage').value
        };
        let genres = checkIfGenre();
        book.genre = genres;
        books.push(book); //push the objects values into the books array
        let s = JSON.stringify(books); //defines variable as a converted string through JSON of the books object names and values
        localStorage.setItem('books', s); //sets our object 'books' with the values 's' as item to localstorage 
        console.log(`check and display object values that are pushed into books array ${localStorage}`);
        addBookToContainer(genres); //add new book with values to container
        addImageToBook(); //function to change the divs background from default to selected image 
        console.log(`book.title = ${book.title}\nbook.author = ${book.author}\nbook.genre = ${book.genre}\nbook.image = ${book.image}`);
    } else {
        console.log('You must allow local storage in your browser');
    }   
}

//create bookshelf to display all added books
let bookShelf = $('container');

const addBookToContainer = function (genres) {
    let book = {
        title: $('userTitle').value,
        author: $('userAuthor').value,
        genre: genres,
        image: $('selectImage').value
    };
    //create and append books div and info when adding a book
    let newBook = document.createElement('div');
    newBook.setAttribute('class', 'book ' + `${book.genre}`);

    let newBookPic = document.createElement('div');
    newBookPic.setAttribute('class', 'bookPicture' + 'id', 'bookPic');
    
    let newBookInfo = document.createElement('div');
    newBookInfo.setAttribute('class', 'bookInfo');

    let newBookGenre = document.createElement('h4');
    newBookGenre.setAttribute('class', 'genre');
    let genreText = document.createTextNode(`${book.genre}`);
    newBookGenre.appendChild(genreText);
    
    let newBookTitle = document.createElement('h2');
    newBookTitle.setAttribute('class', 'title');
    let titleText = document.createTextNode(`${book.title}`);
    newBookTitle.appendChild(titleText);
    
    let newBookAuthor = document.createElement('h3');
    newBookAuthor.setAttribute('class', 'author');
    let authorText = document.createTextNode(`${book.author}`);
    newBookAuthor.appendChild(authorText);
    
    newBookInfo.append(newBookGenre, newBookTitle, newBookAuthor);
    newBook.append(newBookPic, newBookInfo);
    bookShelf.appendChild(newBook);
}

//Add image from user upload upon adding book, instead of default picture
const addImageToBook = function(){
   var file = $("selectImage").files[0];
   var reader = new FileReader();
   reader.onloadend = function(){
      $('bookPic').style.backgroundImage = "url(" + reader.result + ")";        
   }
   if(file){
      reader.readAsDataURL(file);
    }else{
    }
}


// resets localstorage everytime browser is refreshed
if (isLocalStorageEnabled) {
    localStorage.removeItem('foo');
    let book = {
        title: $('userTitle').value,
        author: $('userAuthor').value,
        genre: document.getElementsByClassName('checked').value,
        image: $('selectImage').value
    };
    let test = JSON.stringify(book);
    localStorage.setItem('books', test);
} else {
    console.log('You must allow local storage in your browser');
}

addBtn.addEventListener('click', addBook);
addImage.addEventListener('change', addImageToBook, true);

const checkIfGenre = function(){
    let genres='';
    if(document.querySelector('#thriller:checked')){
        genres += (document.querySelector('#thriller').value) + ', ';
    }
    if(document.querySelector('#crime:checked')){
        genres += (document.querySelector('#crime').value) + ', '; 
    }
    if(document.querySelector('#drama:checked')){
        genres += (document.querySelector('#drama').value) + ', ';
    }
    if(document.querySelector('#adventure:checked')){
        genres += (document.querySelector('#adventure').value) + ', ';
    }
    if(document.querySelector('#scifi:checked')){
        genres += (document.querySelector('#scifi').value) + ', ';
    }
    else if (genres == ''){
        genres += 'No genre selected';
    }
    return genres;
}
*/
