// When the librarian wants to add a book, they should be able to add
// title, author, genre and a cover image for the book to be displayed

// Shortkeys
const $ = function(id){
    return document.getElementById(id);
}

// Global variables 
let addBtn = $('add');
let sort = $('sort');
let clear = $('clearLocalStorage');
let bookShelf = $('container');
//let cover = document.querySelectorAll('.bookPicture');

// Assign book as object
let book = {};
// Create global arrays of books
let books = [];





/************  CHECK IF LOCALSTORAGE IN BROWSER IS TRUE OR FALSE   *************/
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




/************  ADD BOOK TO LIBARY ARRAY 'BOOKS'   *************/
const addBook = function (e){
    e.preventDefault();
    // assign book as object
        let book = {
            title: $('userTitle').value,
            author: $('userAuthor').value,
            genre: checkGenre(),
            image: $('selectImage').value
        };
        if(checkIfInfoLegit(book) == false){
            return false;
        } 
        // apply genres checked in checkboxes
        checkGenre(book);
        // add book to array of books
        books.push(book); 
        // append cover image to the book
        //addImageToBook(book);  
        
        // add book to container of books and display it
        addBookToContainer(book); 
        // reset input fields when book is added
        $('userTitle').value = null;
        $('userAuthor').value = null;
        
        // add book to local storage
        addToLocalStorage(books);

}


/************  CHECK IF BOOK HAS INPUT VALUES BEFORE ADDING   *************/
// if book input fields does not have values, return false with alert to stop addBook function
const checkIfInfoLegit = function (book){
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




/************  ADD GENRES SELECTED TO BOOK BEFORE PUSHING BOOK TO ARRAY  *************/
const checkGenre = function(){
    let genres ='';
    let checkboxes = document.querySelectorAll('#checkbox input:checked');
        // for each checkbox checked, let genre get the attribute value assigned to it
    checkboxes.forEach(element => {
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



/************  ADD AND APPEND BOOK AND ITS INPUTS TO CONTAINER  *************/
const addBookToContainer = function (book) {
    // create new book as div with default class 'book' and 'show' and 'genre'
    // assigned to it, where genre is equal to the checked boxes value from checkGenre function, 
    // with all characters changed to lowercase to make them fit the ID's of filter buttons
    let newBook = document.createElement('div');
    newBook.setAttribute('class', 'book ' + 'show ' + `${book.genre.replace(',','').toLowerCase()}`);
    
    // create div with info about book, inside of book     
    let newBookInfo = document.createElement('div');
    newBookInfo.setAttribute('class', 'bookInfo');

    // set genre with textnode of the checked genre    
    let newBookGenre = document.createElement('h4');
    newBookGenre.setAttribute('class', 'genre');
    let genreText = document.createTextNode(`${book.genre}`);
    newBookGenre.appendChild(genreText);
    
    // set title of book    
    let newBookTitle = document.createElement('h2');
    newBookTitle.setAttribute('class', 'title');
    let titleText = document.createTextNode(`${book.title}`);
    newBookTitle.appendChild(titleText);
    
    // set author of book    
    let newBookAuthor = document.createElement('h3');
    newBookAuthor.setAttribute('class', 'author');
    let authorText = document.createTextNode(`${book.author}`);
    newBookAuthor.appendChild(authorText);

    // set coverpicture of book
    let newBookPic = document.createElement('div');
    newBookPic.setAttribute('class', 'bookPicture');
    newBookPic.setAttribute('id', 'bookPic');
    
    newBookInfo.append(newBookGenre, newBookTitle, newBookAuthor);
    newBook.append(newBookPic, newBookInfo);
    bookShelf.appendChild(newBook);
}



/************  ADD TO LOCALSTORAGE WHEN ADDING BOOK  *************/
const addToLocalStorage = function (books){
    if (isLocalStorageEnabled) {
        // set local storage item name "books", with values of "s", and convert 
        // this object in to a JSON string 
        let s = JSON.stringify(books); 
        localStorage.setItem('books', s); 
    } else {
        console.log('You must allow local storage in your browser');
    }   
}




/************  INITIALISE BOOKLIST AND DISPLAY STORED ARRAY UPON REFRESH  *************/
const initBookList = function(){
    // assign books as the item books from local storage in local scope
    books = localStorage.getItem('books');
    // if books has no values, empty books array and log info
    if(!books){
        books = [];
        console.log('there are currently no books saved in your local storage');
    // if books has values, convert string to object and assign books 
    // before logging the array of books
    } else if(books){
        books = JSON.parse(books);
        console.log(books)
        // for each book there are inside books array, add that book to the 
        // container of books to be displayed on the page
        books.forEach(book => {
            addBookToContainer(book);
        });
    }
}




/************  CLEAR LOCAL STORAGE IN BROWSER   *************/
// The idea was to set a new item in local storage and remove it after reload, that were supposed
// to console.warn or log, the information that local storage had been reset
// whenever the clear local storage button was clicked, but the reload function
// doesn't seem to be able prevent console.log or warn from clearing after reload
// without having to manually preserve console.log in browser
const clearLocalStorage = function (){
    if (isLocalStorageEnabled) {
        localStorage.clear();
        if (!localStorage.getItem('books')){
            let w = 'Local storage is now cleared';
            localStorage.setItem('consoleWarnAfterReload', w);
            // when site refreshed, start console.log('Local storage is now cleared')
            window.location.reload();
            console.warn(localStorage.getItem('consoleWarnAfterReload'));
            localStorage.removeItem('consoleWarnAfterReload');
            };
            
    } else {
    console.log('Local storage was not enabled, so there is nothing to clear');
    }
}




/************  FILTER BOOKS BY GENRE  *************/
function filterSelection(e) {
  let x, i;
  // console log which attribute the argument of filterSelection is given
  // to make sure it gets the ID of the button clicked and filters by that
  e = this.getAttribute('id');
  console.log(e)
  x = document.getElementsByClassName("book");
  
  // loop through each book in the current displayed array and remove "show" class. 
  // If the book contains the argument clicked or the argument is "all", 
  // then add "show" class to books to display them 
  for (i = 0; i < x.length; i++) {
  	x[i].classList.remove("show");
    if (x[i].classList.contains(e) || e == "all"){ 
    	x[i].classList.add("show");
    }   
  }
}

// Add active class to the current button (highlight it)
let filterContainer = $('tabs');
let btns = filterContainer.getElementsByClassName("filterBtn");
for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    let current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}




/************  SORT BOOKS  *************/
const sortBooks = function(){
    // assign local stored item of books to books in local scope
    books = localStorage.getItem('books');
    // if books has no values, empty books array and log info
    if(!books){
        books = [];
        console.log('there are no books to sort');
        return false;
    // if books has values and a sorting option has been selected, convert JSON.string 
    // to object and assign this sorted object of books to a new array, and show table of the sorted array in console
    } else if(books && sort.value == 'Author') sortedByAuthor()
    else if(books && sort.value == 'Title') sortedByTitle()
    else if(books && sort.value == 'Random') sortedRandomly()
    
}   
    // convert JSON string to object and sort this object by comparison or random
    // before assigning it to a new array that should be displayed instead of the original array
    function sortedByAuthor(){
        books = JSON.parse(books);
        let sortedByAuthor = [...books].sort(compareAuthors);
        $('container').innerHTML = '';
        console.table(sortedByAuthor);
        sortedByAuthor.forEach(book => {
            addBookToContainer(book);
        });
    }   
    // compare authors value to sort books according to author from A-Z
    function compareAuthors(a, b){
        let authorA = a.author.toLowerCase();
        let authorB = b.author.toLowerCase();
        // sort in descending order Z-A
        if (authorA < authorB) return -1; 
        // sort in ascending order A-Z
        else if (authorA > authorB) return 1;
        // if authors are equal sort nothing
        else return 0;
    }
    // convert JSON string to object and sort this object by comparison or random
    // before assigning it to a new array that should be displayed instead of the original array
    function sortedByTitle(){
        books = JSON.parse(books);
        let sortedByTitle = [...books].sort(compareTitles);
        $('container').innerHTML = '';
        console.table(sortedByTitle);
        sortedByTitle.forEach(book => {
            addBookToContainer(book);
        });
    }
    // compare titles value to sort books according to title from A-Z
    function compareTitles(a, b){
        let titleA = a.title.toLowerCase();
        let titleB = b.title.toLowerCase();
        // sort in descending order Z-A
        if (titleA < titleB) return -1; 
        // sort in ascending order A-Z
        else if (titleA > titleB) return 1;
        // if authors are equal sort nothing
        else return 0;
    }
    // convert JSON string to object and sort this object by comparison or random
    // before assigning it to a new array that should be displayed instead of the original array
    function sortedRandomly(){
        books = JSON.parse(books);
        let randomSort = [...books].sort(Math.random);
        $('container').innerHTML = '';
        console.table(randomSort);
        randomSort.forEach(book => {
            addBookToContainer(book);
        });
    }



/************  EVENTLISTENERS   *************/
addBtn.addEventListener('click', addBook);
window.addEventListener('load', isLocalStorageEnabled);
window.addEventListener('load', initBookList);
clear.addEventListener('click', clearLocalStorage);
sort.addEventListener('change', sortBooks);

// Hardcorded filter buttons 
$('all').addEventListener('click', filterSelection);
$('thriller').addEventListener('click', filterSelection);
$('crime').addEventListener('click', filterSelection);
$('adventure').addEventListener('click', filterSelection);
$('scifi').addEventListener('click', filterSelection);
$('drama').addEventListener('click', filterSelection);


/************  FUNCTIONS NOT FINNISHED ARE COMMENTED OUT   *************/

/*
const addImageToBook = function(book){
    let cover = `image(${book.image})`
    if(!book.image){
        console.log('no image added');
    } else {
        book.style.backgroundImage = cover;
    }
}
*/



/*
const addBookOnEnter = function(){
    addEventListener('keydown', function(e){
        let whichKey = checkKeyPressed(e);
        if (whichKey || keyCode === 13){
            addBook();
        }
    });
}
function checkKeyPressed(e){
    if(!(e.which === 13 || e.keyCode === 13)){
        return false;
    }else{        
        console.log('You pressed enter');
        return e.which || e.keyCode;
    }
}

window.addEventListener('load', addBookOnEnter);
*/
