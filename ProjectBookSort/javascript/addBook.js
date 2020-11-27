//Shortkey for document.getElementById()
const $ = function(id){
    return document.getElementById(id);
}

//Defining global variables
let addBtn = $('add');
let addImage = $('addImage');
let sort = $('sort');

//Add a book to the container
const addBook = function () {
    if (isLocalStorageEnabled) {
        console.log(`display the object books: ${localStorage}`); //displays the books objects items in console
        let books;
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

//Determines the localstorage function, to make sure its working
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

/*const sortByTitle = function(selected){
    let tempArr = new Array();
    for (let i = 0; i < selected.options.length; i++){
        tempArr[i] = new Array();
        tempArr[i][0] = selected.options[i].value;
    }
    tempArr.sort();

}
const sortBy = function (){
    let title = $('bookTitle');
    let author = $('bookAuthor');
        if(title){
            let tempArr = new Array();
            tempArr.push(books)

        }
        if(author){

        }
        else{

        }
    }

function addActivityItem(){
    //option is selected
    alert("yeah");
}
sort.addEventListener("change", sortBy, false);
*/
