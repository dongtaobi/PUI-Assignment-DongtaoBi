console.log('Javascript file is successfully linked!');


//roll constructor
class Roll {
    constructor(rollType, rollGlazing, packSize, basePrice, imageURL) {
        
        this.rollType = rollType;
        this.rollGlazing =  rollGlazing;
        this.packSize = packSize;
        this.basePrice = basePrice;
        this.imageURL = imageURL;

        this.element = null;
    }
}

//create a shopping cart array
let cart_Array = [ ];
console.log("array created:" + [cart_Array]);


// This function creates a new Notecard object, and adds it to notecardSet.
function addNewRoll(rollType, rollGlazing, packSize, basePrice, imageURL) {
    // Create a new notecard object. The Notecard constructor takes three
    // arguments: the image URL, title text,  and body text.
    const rollitem = new Roll(rollType, rollGlazing, packSize, basePrice, imageURL);
  
    // Add the notecard object to our notecard Set, which keeps track of all
    // the notecards in our application.
    cart_Array.push(rollitem);
    console.log("array updated:" + cart_Array[0]);

    console.log("current roll item is:" + rollitem)
    return rollitem;
}


function createElement(rollitem) {
    // make a clone of the cart item template
    const template = document.querySelector('#cartitem-template');
    const clone = template.content.cloneNode(true);

    // connect this clone to our rollitem.element
    // from this point we only need to refer to rollitem.element
    rollitem.element = clone.querySelector('.bd_l2_cart_item_block_large');
    console.log(rollitem.element);

    //const btnDelete = rollitem.element.querySelector('.bd_l3_buttom_remove');
    //console.log(btnDelete);
    //btnDelete.addEventListener('click', () => {deleteRollItem(rollitem);});
    

    const rollitemListElement = document.querySelector('#rollitem-list');
    rollitemListElement.prepend(rollitem.element);

    // update_CartElement(rollitem);
}


function update_CartElement(rollitem) {

    // get the HTML elements that need updating
    const rollTitleElement = rollitem.element.querySelector('.roll-title');
    const rollGlazingType = rollitem.element.querySelector('.roll-glazingtype');
    const rollPackageSize = rollitem.element.querySelector('.roll-packagesize');
    const rollBasePrice = rollitem.element.querySelector('.roll-baseprice');
    const rollImageElement = rollitem.element.querySelector('.bd_l5_content_block_item_pic');

    // copy our notecard content over to the corresponding HTML elements
    rollTitleElement.innerText = rollType;
    rollGlazingType.innerText = rollitem.rollGlazingType;
    rollPackageSize.innerText = rollitem.packSize;
    rollBasePrice.innerText = rollitem.basePrice;
    rollImageElement.src = rollitem.imageURL;
}



// function deleteRollItem(rollitem) {
    // remove the cart item DOM object from the UI
    // rollitem.element.remove();
  
    // remove the actual cart item object from our set of items
    // cart_Array.remove(rollitem);

// }




const first_item = new Roll (
    'Original',
    'Sugar Milk',
    '1',
    '2.49',
    '/links/raisin-cinnamon-roll.jpg'
)

const second_item = new Roll (
    'Walnut',
    'Raisin',
    '12',
    '2.49',
    '/links/raisin-cinnamon-roll.jpg'
)

const third_item = new Roll (
    'Raisin',
    'Sugar Milk',
    '3',
    '2.49',
    '/links/raisin-cinnamon-roll.jpg'
)

const fourth_item = new Roll (
    'Apple',
    'Original',
    '3',
    '2.49',
    '/links/raisin-cinnamon-roll.jpg'
)

const item = addNewRoll(first_item);
console.log("new item:" + item)

createElement(item);






























