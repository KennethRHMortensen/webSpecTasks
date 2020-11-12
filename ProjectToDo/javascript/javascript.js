/* Todo list */

let todoList = document.getElementById('todoItemList');
let addBtn = document.getElementById('addItem');
let textField = document.getElementById('inputText');

function addItem () {
    //  Defines a value based on the users input
    let textInput = document.getElementById('inputText').value;

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
    let todoListItms = document.getElementById('todoItemList').childNodes;
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

addBtn.addEventListener('click', addItem);
