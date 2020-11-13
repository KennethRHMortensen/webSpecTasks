/* Todo list */
const $ = function(id){
    return document.getElementById(id);
}

let todoList = $('todoItemList');
let addBtn = $('addItem');
let textField = $('inputText');
let todo = $('todo');
let saveBtn = $('saveBtn');
let listBox = $('listBox')

let listBox = [];

// check if input value is > 0, if yes = run addItem function
function addItemAfterClick(){
    if (textField.value.length > 0) {
        addItem();
    } else {
        alert('You forgot to put in some text');
    }
}
function addItem () {
    
    //  Defines a value based on the users input
    let textInput = $('inputText').value;

    //  Creates a todo list item and divs and adds classnames
    const newLi = document.createElement('li');
    newLi.setAttribute('class', 'todoItem');

    const liText = document.createElement('div');
    liText.setAttribute('class', 'liText');

    const liBtns = document.createElement('div');
    liBtns.setAttribute('class', 'liBtns');

    //  Inputs user text into the new element
    const liUserText = document.createTextNode(textInput);

    //  Displays the new todo list items text
    liText.appendChild(liUserText);

    //  Displays new div elements
    newLi.append(liText, liBtns);

    //  Displays the new todo list item
    todoList.append(newLi);

    //  Creates a delete and an edit button with every new item added
    const newDeleteBtn = document.createElement('button');
    const newEditBtn = document.createElement('button');
    
    //  Adds classname to buttons
    newDeleteBtn.setAttribute('class', 'deleteBtn');
    const deleteBtn = document.createTextNode('X');
    
    newEditBtn.setAttribute('class', 'editBtn');
    const editBtn = document.createTextNode('O');


    // Displays delete and edit buttons
    liBtns.append(newEditBtn, newDeleteBtn);
    newDeleteBtn.appendChild(deleteBtn);
    newEditBtn.appendChild(editBtn);
    

    //  Loops through each list item and adds an event listener with a function
    let todoListItms = $('todoItemList').childNodes;
    todoListItms.forEach(function() {
        newDeleteBtn.addEventListener('click', deleteItem);
        liText.addEventListener('click', crossItem);
        newEditBtn.addEventListener('click', editItem);
    });

    //  Deletes list item
    function deleteItem () {
        newLi.remove();
    }

    //  Highlights list items
    function crossItem () {
        if (newLi.classList.contains('done')){
            newLi.classList.remove('done');
        } else {
            newLi.classList.add('done');
        }
    }

    //  Prompts a message to edit an item in case of a mispell
    function editItem () {
        let txt;
        let newText = prompt('Edit item', liText.innerHTML);
        if (newText == null || newText == ''){
            txt = textInput;
        } else {
            txt = newText;
        }
        liText.innerHTML = txt;
    }

    // Resets the input field
    textField.value = '';
    } 
addBtn.addEventListener('click', addItemAfterClick);

function displaySaveBtn(){
    if (todoList.getElementsByTagName('li').length >= 1){
        saveBtn.style.display = "block";
    } else{
        saveBtn.style.display = "none";
    }
}
window.setInterval(displaySaveBtn, 100);

function saveList(){
    const addDiv = document.createElement('div');
    addDiv.setAttribute('class', 'savedList');

    const addTitle = document.createElement('h2');
    addTitle.setAttribute('class', 'listTitle')
    listBox.appendChild(addDiv);    
}

function addListToLists(){
    /*let titleText = prompt('Write the title of your list');
    if (titleText == null || titleText == ''){*/
        saveList();

        /*const addTitle = document.createElement('h2')
        addTitle.setAttribute('class', 'listTitle');*/

    }
    saveBtn.addEventListener('click', addListToLists);

