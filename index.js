let myLibrary = [];

document.onload = loopThroughArray();

// CLASS DECLARATION

class Book {

    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    changeRead() {

        return this.read === true ? this.read = false : this.read = true;
    }
}

document.onload = addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 395, true);
document.onload = addBookToLibrary('The Shcmobbit', 'S.S.S. Shcmolkien', 666, false);

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
    const fields = ['title', 'author', 'pages'];
    const readButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    main.appendChild(card);
    card.classList.add('book-card');
    card.setAttribute('data-index', index);

    for (let i = 0; i < fields.length; i++) {

        const fieldDiv = document.createElement('div');
        const fieldName = document.createElement('div');
        const fieldContent = document.createElement('div');

        fieldDiv.classList.add(`${fields[i]}-container`);
        card.appendChild(fieldDiv);

        fieldName.classList.add(fields[i]);
        fieldDiv.appendChild(fieldName);
        fieldName.textContent = fields[i][0].toUpperCase() + fields[i].slice(1);

        fieldContent.classList.add(`${fields[i]}-content`);
        fieldDiv.appendChild(fieldContent);
        fieldContent.textContent = obj[fields[i]];
    }

    readButton.classList.add('read-button');
    readButton.setAttribute('onclick', 'changeReadStatus.call(this)');
    readButton.setAttribute('data-index', index);
    card.appendChild(readButton);
    printReadStatus(obj.read, readButton);

    deleteButton.classList.add('delete-book-button');
    deleteButton.setAttribute('onclick', 'deleteBook.call(this)');
    deleteButton.setAttribute('data-index', index);
    card.appendChild(deleteButton);
    deleteButton.textContent = 'Delete';
}

function printReadStatus(status, readButton) {

    if (status) {

        readButton.textContent = 'Already read this';
        readButton.classList.remove('button-red');
        readButton.classList.add('button-green');

    } else {

        readButton.textContent = 'Didn\'t read that yet';
        readButton.classList.remove('button-green');
        readButton.classList.add('button-red');
    }
}

// CREATE NEW BOOK

document.querySelector('.new-book').addEventListener('click', buildNewBookForm);

function buildNewBookForm() {

    const card = document.createElement('div');
    const form = document.createElement('form');

    animateButtons.call(this);
    buildBlankNewCard(card);
    buildNewCardForm(card, form);
    buildNewCardCheckbox(form)
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

    const inputNames = ['title', 'author', 'pages'];

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

function buildNewCardCheckbox(form) {

    const inputDiv = document.createElement('div');
    const label = document.createElement('label');
    const input = document.createElement('input');

    inputDiv.classList.add(`new-book-read-container`);
    form.appendChild(inputDiv);

    input.classList.add('new-book-read-input');
    input.setAttribute('name', 'read');
    input.setAttribute('type', 'checkbox');
    inputDiv.appendChild(input)

    label.classList.add('new-book-read-label');
    label.setAttribute('for', 'read');
    inputDiv.appendChild(label);
    label.textContent = 'Did you read this book?';
}

function buildNewCardButtons(form) {

    const buttonsDiv = document.createElement('div');
    const addBookButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    buttonsDiv.classList.add('new-book-button-container');
    form.appendChild(buttonsDiv);

    addBookButton.classList.add('new-book-add-button', 'button-green');
    addBookButton.setAttribute('type', 'submit');
    buttonsDiv.appendChild(addBookButton);
    addBookButton.textContent = 'Add book';

    cancelButton.classList.add('new-book-cancel-button', 'button-red');
    cancelButton.setAttribute('type', 'button');
    cancelButton.setAttribute('onclick', 'cancelNewBookForm()')
    buttonsDiv.appendChild(cancelButton);
    cancelButton.textContent = 'Cancel';
}

// NEW BOOK CANCEL

function cancelNewBookForm() {

    const body = document.querySelector('body');
    const coverDiv = document.querySelector('.cover-container');

    body.removeChild(coverDiv);
}

// BUTTON ANIMATION

function animateButtons() {

    const button = this;

    button.classList.add('pressed');

    setTimeout(function () {
        button.classList.remove('pressed')
    }, 100);
}

// DELETE BOOK

function deleteBook() {
    const index = this.dataset.index;
    myLibrary.splice(index, 1);

    animateButtons.call(this);
    cleanExistingCards();
    loopThroughArray();
}

// READ STATUS

function changeReadStatus() {
    const index = this.dataset.index;
    const readStatus = myLibrary[index].changeRead();

    printReadStatus(readStatus, this);
    animateButtons.call(this);
}