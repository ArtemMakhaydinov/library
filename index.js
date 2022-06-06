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

function addBookToLibrary(title, author, pages, read) {

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// DISPLAY

function loopThroughArray() {

    myLibrary.forEach((elem, index) => {
        buildBookCard(elem, index)
    })
}

function buildBookCard(obj, index) {

    const card = document.createElement('div');
    const main = document.querySelector('main');
    const readDiv = document.createElement('div');
    const textFieldNames = ['title', 'author', 'pages'];

    main.appendChild(card);
    card.classList.add('book-card', index)

    for (let i = 0; i < textFieldNames.length; i++) {

        const fieldDiv = document.createElement('div');
        const fieldName = document.createElement('div');
        const fieldContent = document.createElement('div');

        fieldDiv.classList.add(`${textFieldNames[i]}-container`, index);
        card.appendChild(fieldDiv);

        fieldName.classList.add(textFieldNames[i], index);
        fieldDiv.appendChild(fieldName);
        fieldName.textContent = textFieldNames[i][0].toUpperCase() + textFieldNames[i].slice(1);

        fieldContent.classList.add(`${textFieldNames[i]}-content`, index);
        fieldDiv.appendChild(fieldContent);
        fieldContent.textContent = obj[textFieldNames[i]];
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

// NEW BOOK BUILD

document.querySelector('.new-book').addEventListener('click', buildNewBookForm);

function buildNewBookForm() {

    const card = document.createElement('div');
    const form = document.createElement('form');

    animateButtons.call(this);
    buildEmptyCard(card);
    buildCardForm(card, form);
    buildCardButtons(form);
};

function buildEmptyCard(card) {

    const body = document.querySelector('body');
    const coverDiv = document.createElement('div');

    coverDiv.classList.add('cover-container');
    body.appendChild(coverDiv);

    card.classList.add('new-book-card');
    coverDiv.appendChild(card);
}

function buildCardForm(card, form) {

    const textFieldNames = ['title', 'author', 'pages', 'read'];

    form.classList.add('new-book-form');
    card.appendChild(form);

    for (let i = 0; i < textFieldNames.length; i++) {
        const inputDiv = document.createElement('div');
        const label = document.createElement('label');
        const input = document.createElement('input');

        inputDiv.classList.add(`new-book-${textFieldNames[i]}-container`);
        form.appendChild(inputDiv);

        label.classList.add(`new-book-${textFieldNames[i]}-label`);
        label.setAttribute('for', `${textFieldNames[i]}`);
        inputDiv.appendChild(label);
        label.textContent = textFieldNames[i][0].toUpperCase() + textFieldNames[i].slice(1);

        input.classList.add(`new-book-${textFieldNames[i]}-input`);
        input.setAttribute('name', `${textFieldNames[i]}`);
        input.setAttribute('id', `${textFieldNames[i]}`);
        inputDiv.appendChild(input)

        switch(textFieldNames[i]) {
            case 'title':
            case 'author':
                input.setAttribute('type', 'text');
                break;
            case 'pages':
                input.setAttribute('type', 'number');
                break;
            case 'read':
                input.setAttribute('type', 'checkbox');
                label.textContent = 'Did you read this book?';
                break;
        }
    }
}

function buildCardButtons(form) {

    const buttonsDiv = document.createElement('div');
    const addBookButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    buttonsDiv.classList.add('new-book-button-container');
    form.appendChild(buttonsDiv);

    addBookButton.classList.add('new-book-add-button');
    addBookButton.setAttribute('type', 'submit')
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
