let myLibrary = [
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: 295,
        read: true,
    },
    {
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        pages: 295,
        read: true,
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

function loopThroughArray(){
    myLibrary.map((elem, index) => {
        buildBookCard(elem, index)
    })
}

function buildBookCard(obj, index) {
    index++;

    let card = document.createElement('div');
    let main = document.querySelector('main');
    main.appendChild(card);
    card.classList.add('book-card', 'book-card-' + index)

    let titleDiv = document.createElement('div');
    titleDiv.classList.add('title-container', 'title-container-' + index);
    card.appendChild(titleDiv);

    let authorDiv = document.createElement('div');
    authorDiv.classList.add('author-container', 'author-container-' + index);
    card.appendChild(authorDiv);

    let pagesDiv = document.createElement('div');
    pagesDiv.classList.add('pages-container', 'pages-container-' + index);
    card.appendChild(pagesDiv);

    let readDiv = document.createElement('div');
    readDiv.classList.add('read-container', 'read-container-' + index);
    card.appendChild(readDiv);
}