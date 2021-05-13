let library = [];
let bookCount = 0;
let readCount = 0;
// The book constructor
function Book(title, author, publisher, pages, read) {
  this.title = title;
  this.author = author;
  this.publisher = publisher;
  this.pages = pages;
  this.read = read;

}


// Adding book to library

function resetFields() {
  let bookForm = document.getElementById("book-form");
  bookForm.reset();
}

function getBookInfo() {
  console.log("clicked add button");
  let title = document.getElementById("title").value;
  let author = document.getElementById("author").value;
  let publisher = document.getElementById("publisher").value;
  let pages = document.getElementById("pages").value;
  let read = document.getElementById("read");
  let read_status;

  if (read.checked) {
    read_status = "read";
  } else {
    read_status = "not_read";
  }
  let book = new Book(title, author, publisher, pages, read_status);

  return book;
}

function addBook() {
  let book = getBookInfo();
  library.push(book);
  bookCount++;
}

// displaying added books
function displayBookShelf() {
  let librayShowcase = document.getElementById("library-showcase");

    // Refreshing Shelf
    refreshShelf();
    readCount = 0;
  // getting book info
  
  library.forEach((item, index) => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("card", "book");
    
    bookCard.innerHTML = `
            <h4>${item.title}</h4>
            <ul class="book-details">
              <li><b>Author</b>: ${item.author}</li>
              <li>Publisher: <b>${item.publisher}</b></li>
              <li>Pages: ${item.pages}</li>
              <li><b>Read</b> <label for="read-slider__${index}" class="switch"> <input type="checkbox" name="read-slider" id="read-slider__${index}"><span class = "slider"></span></label></li>
              <li><a href="" class="btn-primary" id="remove-entry" index = ${index}>Remove Entry</a></li>
            </ul>
    `;
    
    librayShowcase.appendChild(bookCard);
    // adding read status
    if (item.read == "read") {
        let readToggle = document.getElementById(`read-slider__${index}`);
        readToggle.checked = true;
        
        readCount++;
    }
  });
}

// Removing Book
function removeBook() {

}
function refreshShelf() {
    let parent = document.getElementById('library-showcase');
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getIndex(para, pattern) {
    return Number(para.match(pattern)[0].split('__')[1]);
}

// Show status



// event listener
const addBtn = document.getElementById("add-btn");

document.body.addEventListener("click", (event) => {
  let target = event.target;
    event.stopPropagation();

  if (target.id == "add-btn") {
    event.preventDefault();
    addBook();
    displayBookShelf();
    resetFields();
  }

  // Read Toggle Event
  let checkIdPattern = /read-slider__[0-9]+/i;
  if (checkIdPattern.test(target.id)) {
      console.log(target)
      // extract matched string
      let bookIndex = getIndex(target.id, checkIdPattern);
      console.log("bookIndex: ", bookIndex);
      if (target.checked) {
          library[bookIndex].read = "read";
          console.log(library[bookIndex].read);
      } else {
        library[bookIndex].read = "not_read"
        console.log(library[bookIndex].read);
      }

  }

  // Remove Button Event
  if (target.id == 'remove-entry') {
      event.preventDefault();
    console.log(target.getAttribute('index'));
    let bookIndex = target.getAttribute('index');
    delete library[bookIndex];
    displayBookShelf();
  }
});
