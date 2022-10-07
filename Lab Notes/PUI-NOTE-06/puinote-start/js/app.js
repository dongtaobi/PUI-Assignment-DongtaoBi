// We use this class to represent our notecards. Each notecard object contains
// data for a single note, and a reference to a DOM element corresponding to
// that notecard.
class Notecard {

  // When we create a new Notecard object, the "constructor"
  // function is run. In the constructor, "this" refers to the
  // newly created Notecard object.
  constructor(imageURL, title, body) {
    this.noteImageURL = imageURL;
    this.noteTitle = title;
    this.noteBody = body;
    this.element = null;
  }
}

// Create an empty Set, which will hold all of our notecard objects. A Set is
// similar to an Array, but in a Set, an item can only be added once (there
// are no duplicates). Sets also allow for easy removal of items, using the
// Set.delete(item) function.
const notecardSet = new Set();

// This function creates a new Notecard object, and adds it to notecardSet.
function addNewNote(imageURL, title, body) {
  // Create a new notecard object. The Notecard constructor takes three
  // arguments: the image URL, title text,  and body text.
  const notecard = new Notecard(imageURL, title, body);

  // Add the notecard object to our notecard Set, which keeps track of all
  // the notecards in our application.
  notecardSet.add(notecard);

  return notecard;
}

function createElement(notecard) {
  // make a clone of the notecard template
  const template = document.querySelector('#notecard-template');
  const clone = template.content.cloneNode(true);
  
  // connect this clone to our notecard.element
  // from this point we only need to refer to notecard.element
  notecard.element = clone.querySelector('.notecard');

  const btnDelete = notecard.element.querySelector('.icon-delete');
  console.log(btnDelete);
  btnDelete.addEventListener('click', () => {
    deleteNote(notecard);
  });
  
  // add the notecard clone to the DOM
  // find the notecard parent (#notecard-list) and add our notecard as its child
  const notecardListElement = document.querySelector('#notecard-list');
  notecardListElement.prepend(notecard.element);
  
  // populate the notecard clone with the actual notecard content
  updateElement(notecard);
}

function updateElement(notecard) {
  // get the HTML elements that need updating
  const noteImageElement = notecard.element.querySelector('.notecard-thumbnail');
  const noteTitleElement = notecard.element.querySelector('.note-title');
  const noteBodyElement = notecard.element.querySelector('.note-body');
  
  // copy our notecard content over to the corresponding HTML elements
  noteImageElement.src = notecard.noteImageURL;
  noteTitleElement.innerText = notecard.noteTitle;
  noteBodyElement.innerText = notecard.noteBody;
}

function deleteNote(notecard) {
  // remove the notecard DOM object from the UI
  notecard.element.remove();

  // remove the actual Notecard object from our set of notecards
  notecardSet.delete(notecard);
  saveToLocalStorage();
}


/**** EXERCISE 6 CODE BELOW ***************************************************/

function submitNote() {
  // Nothing here yet!
  let titleElement = document.querySelector('#note-editor-title');
  let title = titleElement.value;

  let bodyElement = document.querySelector('#note-editor-body');
  let body = bodyElement.value;

  let imageElment = document.querySelector('#note-editor-image');
  let imageURL = imageElment.src;

  // create note cardobject and add to notecard set
  let notecard = addNewNote(imageURL, title, body);

  // add the notecard to DOM
  createElement(notecard);
  console.log("Submitted Note!")
}

function saveToLocalStorage() {
  let notecardArray = Array.from(notecardSet);
  console.log(notecardArray);

  let notecardJSON = JSON.stringify(notecardArray);
  console.log(notecardJSON);

  localStorage.selItem('storedNotes', notecardJSON);
}

function retrieveFromLocalStorage() {
  let notecardJSON = localStorage.getItem('storedNotes', notecardJSON);
  
  let notecardArray = JSON.parse(notecardJSON);

  for (let noteData of notecardArray) {
    // convert vanilla JS objects into Notecard instances, and add item to notecardSet
    let notecard = addNewNote(noteData.noteImageURL, noteData.noteTitle, noteData.noteBody);
    
    // add to DOM
    createElement(notecard);
    console.log(noteData);
  }
}