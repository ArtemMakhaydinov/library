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

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}

function addBookToLibrary(title, author, pages, read) {
    
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

// DISPLAY

function loopThroughArray() {

    myLibrary.map((elem, index) => {
        buildBookCard(elem, index)
    })
}

function buildBookCard(obj, index) {

    index++;

    let card = document.createElement('div');
    let main = document.querySelector('main');
    main.appendChild(card);
    card.classList.add('book-card', index)

    let titleDiv = document.createElement('div');
    titleDiv.classList.add('title-container', index);
    card.appendChild(titleDiv);
    titleDiv.textContent = obj.title;

    let authorDiv = document.createElement('div');
    authorDiv.classList.add('author-container', index);
    card.appendChild(authorDiv);
    authorDiv.textContent = obj.author;

    let pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages-container', index);
    card.appendChild(pagesDiv);
    pagesDiv.textContent = obj.pages;

    let readDiv = document.createElement('div');
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