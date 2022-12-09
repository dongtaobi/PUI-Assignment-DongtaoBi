
console.log("Javascript linked successfully.")

// smoothen transition animation for mobile application
// reference: www.w3school.com
function smoothTransition() {
    window.scrollTo({
    top: 800,
    time: 2000,
    behavior: 'smooth'
    });
}



// event icon selections list
let entryIconIndex = 0;
const entryIconList = ['fa-user-group', 'fa-cart-shopping', 'fa-user-doctor', 'fa-syringe', 'fa-pen'];
// console.log(entryIconList)


// capture event icon in the event editor of HTML file
let eventIcon = document.getElementById('eventIcon_selector');
function updateEventEntryIcon() {
  entryIconIndex = (entryIconIndex + 1) % entryIconList.length;
  const entryIconName = entryIconList[entryIconIndex];
  eventIcon.className = 'fa ' + entryIconName + ' fa-xl';
  // console.log(eventIcon.className)
}

// capture event icon tab for buttom
let eventIconTab = document.getElementById('eventIcon_selector_tab');
// console.log(eventIconTab);

//add on-click event to switch icons for new entry
eventIconTab.addEventListener('click', () => {
  updateEventEntryIcon();
});


class Event {
  constructor(icon, title, date, details) {
    this.eventIcon = icon;
    this.eventTitle = title;
    this.eventDate = date;
    this.eventDetails = details;
    this.element = null;
  }
}


const eventsList = new Set();
function createNewEvent(icon, title, date, details) {
  const event = new Event(icon, title, date, details);
  eventsList.add(event);
  return event;
}


function updateElement(notecard) {
  // get the HTML elements that need updating
  const eventIconElement = notecard.element.querySelector('#event-icon');
  const eventTitleElement = notecard.element.querySelector('#event-title');
  const eventDateElement = notecard.element.querySelector('#event-date');
  const eventDetailsElement = notecard.element.querySelector('#event-details');
  
  // copy our notecard content over to the corresponding HTML elements
  eventIconElement.className = notecard.eventIcon;
  eventTitleElement.innerText = notecard.eventTitle;
  eventDateElement.innerText = notecard.eventDate;
  eventDetailsElement.innerText = notecard.eventDetails;
}



function deleteEvent(event) {
  // remove the notecard DOM object from the UI
  event.element.remove();
  // remove the actual Notecard object from our set of notecards
  eventsList.delete(event);
}


function createElement(event) {
  // make a clone of the notecard template
  const template = document.querySelector('#event_card_template');
  console.log("template is:", template)
  console.log("template.content:", template.content)

  const clone = template.content.cloneNode(true);
  console.log("clone = ", clone);
  
  // connect this clone to our notecard.element
  // from this point we only need to refer to notecard.element
  event.element = null;
  event.element = clone.querySelector('#event-card');
  console.log("event.element is:", event.element)

  const btnDelete = event.element.querySelector('#event-delete');
  console.log(btnDelete);
  btnDelete.addEventListener('click', () => {
    deleteEvent(event);
  });
  
  // add the notecard clone to the DOM
  // find the notecard parent (#notecard-list) and add our notecard as its child
  const eventsListElement = document.querySelector('#events-list');
  eventsListElement.append(event.element);
  
  // populate the notecard clone with the actual notecard content
  updateElement(event);
}


function submitEvent() {
  let eventIcon = document.querySelector('#eventIcon_selector');
  let icon = eventIcon.className;
  console.log("editor icon:", icon);


  let eventTitle = document.querySelector('#event-editor-title');
  let title = eventTitle.value;
  console.log("editor title:", title);

  let eventDate = document.querySelector('#input_date');
  console.log(eventDate);
  let date = eventDate.value;
  console.log("editor date:", date);

  let eventDetails = document.querySelector('#event-editor-details');
  let details = eventDetails.value;
  console.log("editor details:", details);

  // create note cardobject and add to notecard set
  let event = createNewEvent(icon, title, date, details);

  // add the notecard to DOM
  createElement(event);
  console.log("Submitted event!")
}


const btnSubmitEvent = document.querySelector('#event-submit-btn');
btnSubmitEvent.addEventListener('click', () => {
  submitEvent();
});

const newEvent1 = createNewEvent(
'fa fa-user-doctor fa-xl', 
'Veterinary Visit', 
'2022-10-18', 
'Greenville Hosipital in Lakewood');

const newEvent2 = createNewEvent(
'fa fa-user-group fa-xl', 
'Meeting with Cat Sitter', 
'2022-11-02', 
'Cat Hotel in Pittsburgh,PA');

const newEvent3 = createNewEvent(
'fa fa-cart-shopping fa-xl', 
'Restock Cat Food', 
'2022-12-12',
'Place Online Order from PetCo');

const newEvent4 = createNewEvent( 
'fa fa-syringe fa-xl', 
'Vaccine Update', 
'2022-12-24',
'Greenville Hosipital in Lakewood');


createElement(newEvent1);
createElement(newEvent2);
createElement(newEvent3);
createElement(newEvent4);