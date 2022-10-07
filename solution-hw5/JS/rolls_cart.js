//console.log('Javascript file is successfully linked!');
// list collection of all glazing options.
let allGlazingOptions = [
    {
        option_name: 'Keep Original',
        add_price: 0.00,
    },

    {
        option_name: 'Sugar Milk',
        add_price: 0.00,
    },

    {
        option_name: 'Vanilla Milk',
        add_price: 0.50,
    },

    {
        option_name: 'Double Chololate',
        add_price: 1.50,
    },
];


function cal_SingleItemPrice (rollitem) {

    console.log("rollitem for sing price calc");

    console.log(rollitem);

    let glazing_Selection = rollitem.rollglazing;
    console.log("glazing option is:", glazing_Selection);
    const add_Price = allGlazingOptions;
    console.log("additional price is: ",add_Price);
}


function cal_CartTotalPrice () {
    

}


//roll constructor
class Roll {

    constructor(rollType, rollGlazing, packSize, basePrice, imageURL) {
        
        this.rolltype = rollType;
        this.rollglazing =  rollGlazing;
        this.packsize = packSize;
        this.baseprice = basePrice;
        this.imageurl = imageURL;

        this.element = null;
    }
}

//create a shopping cart array
let cart_Array = [ ];
//console.log("array created:" + cart_Array);



// This function creates a new rollitem object, and adds it to rollitem array.
function addNewRoll(rollType, rollGlazing, packSize, basePrice, imageURL) {





    // Create a new roll object. The roll constructor takes three
    // arguments: the image URL, title text,  and body text.
    const rollitem = new Roll(rollType, rollGlazing, packSize, basePrice, imageURL);
  
    // Add the rollitem object to our rollitem array, which keeps track of all
    // the rollitem in our application.
    cart_Array.push(rollitem);
    //console.log("array updated:" + cart_Array[0]);

    //console.log("current roll item is:" , rollitem)
    //console.log(rollitem)
    return rollitem;
}


function createElement(rollitem) {
    //console.log(rollitem)
    // make a clone of the cart item template
    const template = document.querySelector('#cartitem-template');
    const clone = template.content.cloneNode(true);
    //console.log('clone template is:' + clone)
    //console.log(clone)


    // connect this clone to our rollitem.element
    // from this point we only need to refer to rollitem.element
    rollitem.element = clone.querySelector('.peritem-container');


    //console.log(clone.querySelector('.peritem-container'));
    //console.log('imposed rollitem.element is:' + rollitem.element);


    const btnDelete = rollitem.element.querySelector('.bd_l3_buttom_remove');
    //console.log(btnDelete);
    btnDelete.addEventListener('click', () => {deleteRollItem(rollitem);});
    

    const rollitemListElement = document.querySelector('#rollitem-list');
    rollitemListElement.prepend(rollitem.element);

    update_CartElement(rollitem);

    console.log("rollitem.element printed here:");
    console.log(rollitem.element);

    console.log("rollitem printed here:");
    console.log(rollitem);
    return rollitem.element;
    
}




function update_CartElement(rollitem) {


    price_Peritem =  cal_SingleItemPrice(rollitem);
    console.log("price with galzing: ", price_Peritem);


    // get the HTML elements that need updating
    const rollTitleElement = rollitem.element.querySelector('.roll-title');
    const rollGlazingType = rollitem.element.querySelector('.roll-glazingtype');
    const rollPackageSize = rollitem.element.querySelector('.roll-packagesize');
    const rollBasePrice = rollitem.element.querySelector('.roll-baseprice');
    const rollImageElement = rollitem.element.querySelector('.bd_l5_content_block_item_pic');

    // copy our rollitem content over to the corresponding HTML elements
    rollTitleElement.innerText = rollitem.rolltype + " Cinnamon Roll";
    rollGlazingType.innerText = rollitem.rollglazing;
    rollPackageSize.innerText = "Pack size: " + rollitem.packsize;
    rollBasePrice.innerText = rollitem.baseprice;
    rollImageElement.src = rollitem.imageurl;



}



function deleteRollItem(rollitem) {
    // remove the cart item DOM object from the UI
    rollitem.element.remove();
  
    // remove the actual cart item object from our array of items
    cart_Array.remove(rollitem);

}



const first_item = addNewRoll (
    'Original',
    'Sugar Milk',
    '1',
    '2.49',
    './links/original-cinnamon-roll.jpg'
)

const second_item = addNewRoll (
    'Walnut',
    'Sugar Milk',
    '12',
    '2.49',
    './links/walnut-cinnamon-roll.jpg'
)

const third_item = addNewRoll (
    'Raisin',
    'Sugar Milk',
    '3',
    '2.49',
    './links/raisin-cinnamon-roll.jpg'
)

const fourth_item = addNewRoll (
    'Apple',
    'Keep Original',
    '3',
    '2.49',
    './links/apple-cinnamon-roll.jpg'
)

const item_one = createElement(first_item);
//console.log("new item created:" );

// const item_two = createElement(second_item);
//console.log("new item created:" );

// const item_three = createElement(third_item);
//console.log("new item created:" );

// const item_four = createElement(fourth_item);
//console.log("new item created:" );






















