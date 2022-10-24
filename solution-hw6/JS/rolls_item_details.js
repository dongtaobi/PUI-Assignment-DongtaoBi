// console.log('Javascript file is successfully linked!');
const queryString = window.location.search;
// console.log('QueryString "roll" selected is ' + queryString);

// Then, we use the query string to create a URLSearchParams object:
const params = new URLSearchParams(queryString);
// console.log('Param generated is '+ params);

// Finally, we can access the parameter we want using the "get" method:
const chosenRoll = params.get('roll');
// console.log('Chosen "roll" is',chosenRoll);

// Update the header text
let titleElement = document.getElementById('rolltype-name-text');
// console.log(titleElement)
titleElement.innerText = chosenRoll + ' Cinnamon Roll';

let item_Data = rolls[chosenRoll];
// console.log('Complete dada set for selected roll' , item_Data);

let item_BasePrice = item_Data["basePrice"];
// console.log('Item base price retrieved from data base', item_BasePrice);



// Update all item images displayed
const rollImage = document.querySelector('#rolltype-feature-image');
rollImage.src = './links/' + item_Data["imageFile"];

// console.log('Image display is', './links/' + item_Data["imageFile"]);

// Update all base prices displayed
const display_BasePrice = document.querySelector('#item_baseprice');
display_BasePrice.innerText = item_BasePrice;

// console.log('Updated displayed base price is', item_BasePrice);



// onchange event listener to trigger total calculation update 
// trigger for glazing option
let selectGlazing = document.querySelector('#glazing_Select');
selectGlazing.addEventListener('change', function () { cal_TotalPrice("upd_Glazing")});

// trigger for package size option
let selectPackSize = document.querySelector('#packsize_Select');
selectPackSize.addEventListener('change', function () { cal_TotalPrice("upd_PackSize")});

// list collection of all glazing options.
let allGlazingOptions = [
    {
        option_name: 'Keep Original',
        base_price: item_BasePrice,
        add_price: 0.00,
    },

    {
        option_name: 'Sugar Milk',
        base_price: item_BasePrice,
        add_price: 0.00,
    },

    {
        option_name: 'Vanilla Milk',
        base_price: item_BasePrice,
        add_price: 0.50,
    },

    {
        option_name: 'Double Chocolate',
        base_price: item_BasePrice,
        add_price: 1.50,
    },
];




// list collection of all package size options.
let allPackSizeOptions = [
    {
        option_packsize: 1,
        price_adaption: 1,
    },

    {
        option_packsize: 3,
        price_adaption: 3,
    },

    {
        option_packsize: 6,
        price_adaption: 5,
    },

    {
        option_packsize: 12,
        price_adaption: 10,
    },
];




//update glazing selection to DOM to return individual item price (base + glazing)
function item_GlazingChange(item) {
    // console.log('Glazing option is updated!');
    let price_SingleItem = (item.base_price + item.add_price);
    // console.log('Current single item price is ' + price_SingleItem);
    return price_SingleItem;
}


//update packsize selection to DOM to return price adaption factor
function item_PackSizeChange(item) {
    // console.log('Pack Size Option is updated!');
    let price_Factor = item.price_adaption;
    // console.log('Current price factor is ' + price_Factor);
    return price_Factor;
}


// set initial values of the preference options and update to DOM.
item_GlazingChange(allGlazingOptions[0]);
item_PackSizeChange(allPackSizeOptions[0]);



//on-change function to trigger preferences updates and calculate new total price
function cal_TotalPrice(operation) {
    // loop condition to audit glazing and pack size update.
    if (operation === "upd_Glazing") {  
        // console.log('You selected flavor option number ' + selectGlazing.value);
    }
    else if (operation === "upd_PackSize") {        
        // console.log('You selected pack size option number ' + selectPackSize.value);
    }
    // console.log('on_select preference update triggerred!');

    //Excecute glazing option data update
    let index_glazing = parseInt(selectGlazing.value);
    let glazingOption = allGlazingOptions[index_glazing];
    let price_SingleItem = item_GlazingChange(glazingOption);
    // console.log(price_SingleItem);

    let index_packsize = parseInt(selectPackSize.value);
    let packSizeOption = allPackSizeOptions[index_packsize];
    let price_Factor = item_PackSizeChange(packSizeOption);
    // console.log(price_Factor);
    

    // Compute the total price by single price item and adaption factor.
    let price_Total = price_SingleItem * price_Factor;

    //Round down the total price number to two digits
    price_Total = Math.round(price_Total*100) / 100;
    // console.log('Current total price is ' + price_Total);

    //Display resulted item price
    let totalPriceToDisplay = document.querySelector('#item_baseprice');
    totalPriceToDisplay.innerText = '$' + price_Total;
    // console.log('Total Price ' + price_Total + ' has been displayed');

    return price_Total;
}



//event listener add to cart on 'click!'
let add_Cart = document.querySelector('#item_add_to_cart');
add_Cart.addEventListener('click', function () { update_Cart("add_item")});


// code reference: www.section.io/engineering-education/
//push new constructor to end of array
function update_Cart() {
    // console.log("initiated add cart!")

    //extract current preferences
    let current_Flavor = document.querySelector('#glazing_Select').selectedOptions[0].text;
    let current_PackSize = document.querySelector('#packsize_Select').selectedOptions[0].text;

    //define constructor params
    const new_CartItem = new Roll(
        chosenRoll + ' Cinnamon Roll',
        current_Flavor,
        current_PackSize,
        item_BasePrice,
        './links/' + item_Data["imageFile"],
    );

    //push updated constructor to cart
    cart_Array.push(new_CartItem);
    // console.log("new items added to cart: ");
    // console.log(cart_Array);

    saveToLocalStorage();
}


//roll constructor
// 22-1021 updated - roll data constructor
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


function addNewRoll(rollType, rollGlazing, packSize, basePrice, imageURL) {

    // Create a new roll object. The roll constructor takes three
    // arguments: the image URL, title text,  and body text.
    const rollitem = new Roll(rollType, rollGlazing, packSize, basePrice, imageURL);
  
    // Add the rollitem object to our rollitem array, which keeps track of all
    // the rollitem in our application.
    cart_Array.push(rollitem);
    // console.log("array updated:" + cart_Array[0]);

    saveToLocalStorage();
    return rollitem;
}



// create a shopping cart array
let cart_Array = [ ];

// function to add object array to local storage
function saveToLocalStorage() {
    const rollitemArray = Array.from(cart_Array);
    // console.log(rollitemArray);
    
    const rollitemArrayString = JSON.stringify(rollitemArray);
    // console.log(rollitemArrayString);
  
    localStorage.setItem('storedRollitem', rollitemArrayString);
    console.log("updated local storage:  ", localStorage.getItem('storedRollitem'));
}

// function to retrieve object array from local storage
function retrieveFromLocalStorage() {
  const rollitemArrayString = localStorage.getItem('storedRollitem');
  const rollitemArray = JSON.parse(rollitemArrayString);
  for (const rollitemData of rollitemArray) {
    addNewRoll(rollitemData.rolltype, rollitemData.rollglazing, 
        rollitemData.packsize, rollitemData.baseprice, rollitemData.imageurl);
  }
  console.log("Cart array retrieved from local storage:  ", rollitemArrayString);
}


// if local storage is not empty - retrieve local storage 
if (localStorage.getItem('storedRollitem') != null) {
  retrieveFromLocalStorage();
}



























