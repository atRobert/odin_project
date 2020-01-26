let myLibrary = []
let bookShelf = document.getElementById('bookShelf')

let harryPotter = new Book('Harry Potter','JK Rowling', 500)
myLibrary.push(harryPotter)
let dictionary = new Book('Dictionary','Merriam Webster',1000)
myLibrary.push(dictionary)

function Book(title, author, pageNumber, read){
    this.title = title
    this.author = author
    this.pageNumber = pageNumber
    this.read = read
    this.id =  uniqueID(title)
    this.info = function(){
        let readStatus
        read ? readStatus = 'You have read this book.' : readStatus = 'You have not read this book.'
        return console.log(title + ', by ' + author + ' is ' + pageNumber + ' pages. ' + readStatus)
    }
}

function randomNumber(){
    return Math.floor((Math.random() * 5) + 1)
}

function uniqueID(nextBook, tries){
    let title = nextBook.title
    let unique_id = String(title + randomNumber()).replace(' ','')
    if (tries > 14){
        nextBook.title = prompt('Too many of this book exist. Try different title.')
        find_id = uniqueID(nextBook, 0)
        return find_id
    } else {
        tries++
    }
    console.log(unique_id)
    if (myLibrary.findIndex(x => x.id == unique_id) == -1){
        return [unique_id, title]
    } else {
        console.log('ID found, generating another.')
        find_id = uniqueID(nextBook, tries)
        return find_id
    }
}

function render(){
    let i = 0
    while (i < myLibrary.length){
        let currentBook = myLibrary[i]
        renderNew(currentBook)
        i++
    }
}

function renderShelf(currentBook){
    let shelf = document.createElement('div');
    
    shelf.classList.add('shelf')
    shelf.classList.add(currentBook.id)
    return shelf
}

function renderBookText(currentBook){
    let bookText = document.createElement('span')
    if (currentBook.author != ''){
        bookText.textContent = currentBook.title + ', by ' + currentBook.author
    } else {
        bookText.textContent = currentBook.title
    }
    return bookText
}

function renderRemove(){
    let removeShelfButton = document.createElement('BUTTON')
    removeShelfButton.classList.add('removeButton')
    removeShelfButton.setAttribute('onClick','removeShelf(this)')
    removeShelfButton.innerHTML = '<i class="far fa-times-circle"></i>'
    return removeShelfButton
}

function renderRead(){
    let readBookButton = document.createElement('BUTTON')
    readBookButton.classList.add('markRead')
    readBookButton.setAttribute('onClick', 'readBookStatus(this)')
    readBookButton.innerHTML = '<i class="fas fa-book-open"></i>'
    return readBookButton
}

function renderNew(currentBook){
    shelf = renderShelf(currentBook)
    bookText = renderBookText(currentBook)
    removeShelfButton = renderRemove()
    readBookButton = renderRead()

    bookShelf.appendChild(shelf)
    shelf.appendChild(bookText)
    shelf.appendChild(removeShelfButton)  
    shelf.appendChild(readBookButton)
}

function getFormData(){
    title = document.getElementById('title').value
    if (title == ''){
        alert('Please enter a title')
    } else{ 
        author = document.getElementById('author').value
        pageNumber = document.getElementById('pages').value
        document.getElementById('bookForm').reset()
        return [title, author, pageNumber]
    }
}

    


function newBook(){
    let nextBook = new Book('')
    bookValues = getFormData()
    nextBook.title = bookValues[0]
    nextBook.author = bookValues[1]
    nextBook.pageNumber = bookValues[2]
    nextBook.read = false
    let newIDandTitle = uniqueID(nextBook, 0)
    nextBook.id = newIDandTitle[0]
    nextBook.title = newIDandTitle[1]
    myLibrary.push(nextBook)
    renderNew(nextBook)
}

function removeShelf(element){
    let index = myLibrary.indexOf(x => x.id == element.parentNode.classList[1])
    console.log(myLibrary.length)
    console.log('Removing..')
    console.log(myLibrary.length)

    myLibrary.splice(index, 1)
    (element.parentNode.parentNode.removeChild(element.parentNode))
}

function readBookStatus(element){
    let index = myLibrary.findIndex(x => x.id == element.parentNode.classList[1])
    thisBook = myLibrary[index]
    thisBook.read ? bookNotRead(thisBook, element) : readTheBook(thisBook, element)
}

function readTheBook(thisBook, element){
    thisBook.read = true
    console.log(thisBook.read)
    element.parentNode.style.border = 'green 1px solid'
    element.innerHTML = '<i class="fas fa-book"></i>'
}

function bookNotRead(thisBook, element){
    thisBook.read = false
    console.log(element.parentNode)
    element.parentNode.style.border = 'black 1px solid'
    element.innerHTML = '<i class="fas fa-book-open"></i>'
}

render()