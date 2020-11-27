/*
let bookContainer = [document.getElementsByClassName('book')];

let allBooks = $('allBooks');
let sortGenre = $('sort')

const showAllBooks = function() {
     
}

const sortBooks = function(e){
    bookContainer.sort();
}

sortGenre.addEventListener('click', sortBooks);
allBooks.addEventListener('click', showAllBooks);

*/

let sortBtn = document.getElementsByClassName('sort');

let products = Array.from(document.querySelectorAll('.book'));
let buttons = Array.from(document.querySelectorAll('.filterBtn'));

//Skifter classen på det akive filter
function btnClicked() {
    buttons.forEach(function(button) {
        button.removeAttribute('class');
        button.classList.add('filterBtn');
    })
    this.classList.add('active');
    filterFunc(this.id);
}

//Filtrerer de forskellige varer når man klikker på filterknap
const filterFunc = function (category) {
    products.forEach(function (product) {
        product.style.display = 'none';
    })

    let filter = products.filter(function (product) {
        return product.classList.value.includes(category);
    })

    filter.forEach(function (product) {
        product.style.display = 'block';
    })
}

buttons.forEach(function (button) {
    button.addEventListener('click', btnClicked);
})

let author = document.getElementsByClassName('author').value;

const sortBooks = function(){
    products.sort();
}

sortBtn.addEventListener('click', sortBooks);



