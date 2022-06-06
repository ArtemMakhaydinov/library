let myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: 295,
        read: true,
    },
    {
        title: 'The Schmobbit',
        author: 'J.R.R. Schmolkien',
        pages: 666,
        read: false,
    }
];

document.onload = loopThroughArray();

// CLASS DECLARATION

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// ADD

function getFormData() {
    const newTitle = document.getElementById('title').value;
    const newAuthor = document.getElementById('author').value;
    const newPages = document.getElementById('pages').value;
    const newRead = document.getElementById('read').checked;

    cancelNewBookForm();
    addBookToLibrary(newTitle, newAuthor, newPages, newRead);
}

function addBookToLibrary(title, author, pages, read) {

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    cleanExistingCards();
    loopThroughArray();
}

// DISPLAY

function loopThroughArray() {

    myLibrary.forEach((elem, index) => {
        buildBookCard(elem, index)
    })
}

function cleanExistingCards() {

    const cards = document.querySelectorAll('.book-card');

    if (cards !== []) cards.forEach(card => {
        document.querySelector('main').removeChild(card);
    })
}

function buildBookCard(obj, index) {

    const card = document.createElement('div');
    const main = document.querySelector('main');
    const readDiv = document.createElement('div');
    const fields = ['title', 'author', 'pages'];

    main.appendChild(card);
    card.classList.add('book-card', index)

    for (let i = 0; i < fields.length; i++) {

        const fieldDiv = document.createElement('div');
        const fieldName = document.createElement('div');
        const fieldContent = document.createElement('div');

        fieldDiv.classList.add(`${fields[i]}-container`, index);
        card.appendChild(fieldDiv);

        fieldName.classList.add(fields[i], index);
        fieldDiv.appendChild(fieldName);
        fieldName.textContent = fields[i][0].toUpperCase() + fields[i].slice(1);

        fieldContent.classList.add(`${fields[i]}-content`, index);
        fieldDiv.appendChild(fieldContent);
        fieldContent.textContent = obj[fields[i]];
    }

    readDiv.classList.add('read-container', index);
    card.appendChild(readDiv);
    printReadStatus(obj.read, readDiv);
}

function printReadStatus(status, readDiv) {

    if (status) {

        readDiv.textContent = 'Already read this';
        readDiv.style.color = 'green';

    } else {

        readDiv.textContent = 'Didn\'t read that yet';
        readDiv.style.color = 'red';
    }
}

// NEW BOOK INTERFACE

document.querySelector('.new-book').addEventListener('click', buildNewBookForm);

function buildNewBookForm() {

    const card = document.createElement('div');
    const form = document.createElement('form');

    animateButtons.call(this);
    buildBlankNewCard(card);
    buildNewCardForm(card, form);
    buildNewCardButtons(form);
};

function buildBlankNewCard(card) {

    const body = document.querySelector('body');
    const coverDiv = document.createElement('div');

    coverDiv.classList.add('cover-container');
    body.appendChild(coverDiv);

    card.classList.add('new-book-card');
    coverDiv.appendChild(card);
}

function buildNewCardForm(card, form) {

    const inputNames = ['title', 'author', 'pages', 'read'];

    form.setAttribute('id', 'new-book-form');
    form.setAttribute('name', 'new-book-form');
    form.setAttribute('onsubmit', 'getFormData(); return false');
    card.appendChild(form);

    for (let i = 0; i < inputNames.length; i++) {
        const inputDiv = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');

        inputDiv.classList.add(`new-book-${inputNames[i]}-container`);
        form.appendChild(inputDiv);

        label.classList.add(`new-book-${inputNames[i]}-label`);
        label.setAttribute('for', `${inputNames[i]}`);
        inputDiv.appendChild(label);
        label.textContent = inputNames[i][0].toUpperCase() + inputNames[i].slice(1);

        input.classList.add(`new-book-${inputNames[i]}-input`);
        input.setAttribute('name', `${inputNames[i]}`);
        input.setAttribute('id', `${inputNames[i]}`);
        inputDiv.appendChild(input)

        switch (inputNames[i]) {
            case 'title':
            case 'author':
                input.setAttribute('type', 'text');
                input.required = true;
                break;
            case 'pages':
                input.setAttribute('type', 'number');
                input.required = true;
                break;
            case 'read':
                input.setAttribute('type', 'checkbox');
                label.textContent = 'Did you read this book?';
                break;
        }
    }
}

function buildNewCardButtons(form) {

    const buttonsDiv = document.createElement('div');
    const addBookButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    buttonsDiv.classList.add('new-book-button-container');
    form.appendChild(buttonsDiv);

    addBookButton.classList.add('new-book-add-button');
    addBookButton.setAttribute('type', 'submit');
    buttonsDiv.appendChild(addBookButton);
    addBookButton.textContent = 'ADD BOOK';

    cancelButton.classList.add('new-book-cancel-button');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('onclick', 'cancelNewBookForm()')
    buttonsDiv.appendChild(cancelButton);
    cancelButton.textContent = 'CANCEL';
}

// NEW BOOK CANCEL

function cancelNewBookForm() {

    const body = document.querySelector('body');
    const coverDiv = document.querySelector('.cover-container');

    body.removeChild(coverDiv);
}

function animateButtons() {

    const button = this;

    button.classList.add('pressed');

    setTimeout(function () {
        button.classList.remove('pressed')
    }, 100);
}
