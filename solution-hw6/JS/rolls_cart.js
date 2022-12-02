// console.log('Javascript file is successfully linked!');
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
        option_name: 'Double Chocolate',
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




function calc_ItemTotalPrice (rollitem) {

    // console.log("rollitem for sing price calc");
    // console.log(rollitem);
    let glazing_Selection = rollitem.rollglazing;
    // console.log("glazing option is:", glazing_Selection);
    
    let obj_Index_glazing = allGlazingOptions.findIndex(item => item.option_name === glazing_Selection);
    const price_additional = allGlazingOptions[obj_Index_glazing]["add_price"];
    // console.log("additional price is: ",price_additional);
    
    price_PerItem = Number(rollitem.baseprice) + (price_additional);
    // console.log(price_PerItem)
    
    let packsize_Selection = rollitem.packsize;
    // console.log("Pack sel is", packsize_Selection);
    let obj_Index_packsize = allPackSizeOptions.findIndex(item => item.option_packsize === Number(packsize_Selection));
    // console.log("index is", obj_Index_packsize);
    const price_multiplier = allPackSizeOptions[obj_Index_packsize]["price_adaption"];
    // console.log("price mutiplier is ",price_multiplier);

    let price_ItemTotal = round(price_PerItem * price_multiplier);
    // console.log("Created an item with total :", price_ItemTotal);

    return price_ItemTotal;
}

//function to round a price number
function round(number_raw) {
    let number_rounded = (Math.round(number_raw*100))/100;
    return number_rounded;
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



// create an empty shopping cart array
let cart_Array = [ ];


// This function creates a new rollitem object, and adds it to rollitem array.
function addNewRoll(rollType, rollGlazing, packSize, basePrice, imageURL) {

    // Create a new roll object. The roll constructor takes three
    // arguments: the image URL, title text,  and body text.
    const rollitem = new Roll(rollType, rollGlazing, packSize, basePrice, imageURL);
  
    // Add the rollitem object to our rollitem array, which keeps track of all
    // the rollitem in our application.
    cart_Array.push(rollitem);
    // console.log("array updated:" + cart_Array[0]);

    // console.log("current roll item is:" , rollitem)
    // console.log(rollitem)

    saveToLocalStorage();
    return rollitem;
}    


function createElement(rollitem) {
    // console.log(rollitem)
    // make a clone of the cart item template
    const template = document.querySelector('#cartitem-template');
    const clone = template.content.cloneNode(true);
    // console.log('clone template is:' + clone)
    // console.log(clone)


    // connect this clone to our rollitem.element
    // from this point we only need to refer to rollitem.element
    rollitem.element = clone.querySelector('.peritem-container');


    // console.log(clone.querySelector('.peritem-container'));
    // console.log('imposed rollitem.element is:' + rollitem.element);


    const btnDelete = rollitem.element.querySelector('.bd_l3_buttom_remove');
    // console.log(btnDelete);
    btnDelete.addEventListener('click', () => {deleteRollItem(rollitem);});
    

    const rollitemListElement = document.querySelector('#rollitem-list');
    rollitemListElement.prepend(rollitem.element);

    update_CartElement(rollitem);
    calc_UpdatePriceArray();
    calc_CartTotalPrice(price_CartTotalArray);

    let cart_TotalPrice = calc_CartTotalPrice(price_CartTotalArray);
    update_CartTotalPrice(cart_TotalPrice);

    // console.log("Created an item in cart:", rollitem);
    return rollitem;
}

function deleteRollItem(rollitem) {
    // remove the cart item DOM object from the UI
    rollitem.element.remove();
  
    // remove the actual cart item object from our array of items
    cart_Array.pop(rollitem);
 
    
    price_ToRemove = rollitem.element.querySelector('.roll-baseprice').innerText;
    // console.log('to remove', Number(price_ToRemove));
    // console.log('before remove', price_CartTotalArray);

    
    index_Remove = price_CartTotalArray.indexOf(Number(price_ToRemove));

    // console.log('index to remove is',index_Remove);
    price_CartTotalArray.splice(index_Remove, 1);
    // console.log('after remove', price_CartTotalArray);
    let cart_TotalPrice = calc_CartTotalPrice(price_CartTotalArray);
    update_CartTotalPrice(cart_TotalPrice);
    saveToLocalStorage();
}


function update_CartElement(rollitem) {

    price_ItemTotal =  calc_ItemTotalPrice(rollitem);

    // get the HTML elements that need updating
    const rollTitleElement = rollitem.element.querySelector('.roll-title');
    const rollGlazingType = rollitem.element.querySelector('.roll-glazingtype');
    const rollPackageSize = rollitem.element.querySelector('.roll-packagesize');
    const rollBasePrice = rollitem.element.querySelector('.roll-baseprice');
    const rollImageElement = rollitem.element.querySelector('.bd_l5_content_block_item_pic');
    //const rollItemLink = rollitem.element.querySelector('#item_thumbnail_link')

    // copy our rollitem content over to the corresponding HTML elements
    rollTitleElement.innerText = rollitem.rolltype + " Cinnamon Roll";
    rollGlazingType.innerText = rollitem.rollglazing;
    rollPackageSize.innerText = "Pack size: " + rollitem.packsize;
    rollBasePrice.innerText = price_ItemTotal;
    rollImageElement.src = rollitem.imageurl;
    //rollItemLink.innerText = "./product_detail_roll.html?roll=", rollitem; 
}


// create an empty array for price calculation
let price_CartTotalArray = [];

// update price array based on new items created 
function calc_UpdatePriceArray() {
    let cart_ItemTotal = document.querySelector('.roll-baseprice').innerText;
    price_CartTotalArray.push (Number(cart_ItemTotal));
    // console.log('Updated cart total price: ', price_CartTotalArray);
    return price_CartTotalArray;
}

// calculate cart total price whenver items are added or deleted
function calc_CartTotalPrice(array) {
    // console.log('this array =', array);
    let sum = 0;
    for ( element of array) {
        sum = sum + round(Number(element));
    }
    // console.log(round(sum));
    return round(sum);
}

// to replace the displayed price with updated total
function update_CartTotalPrice (number) {
    const cartTotalPrice = document.querySelector('#cart-total-price');
    cartTotalPrice.innerText = '$' + number;
}

// function to add object array to local storage
function saveToLocalStorage() {
    const rollitemArray = Array.from(cart_Array);
    // console.log(rollitemArray);
    
    const rollitemArrayString = JSON.stringify(rollitemArray);
    // console.log(rollitemArrayString);
  
    localStorage.setItem('storedRollitem', rollitemArrayString);
    console.log("Updated local storage: ", localStorage.getItem('storedRollitem'));
}


// function to retrieve object array from local storage
function retrieveFromLocalStorage() {
    const rollitemArrayString = localStorage.getItem('storedRollitem');
    const rollitemArray = JSON.parse(rollitemArrayString);
    for (const rollitemData of rollitemArray) {
      const notecard = addNewRoll(rollitemData.rolltype, rollitemData.rollglazing, 
          rollitemData.packsize, rollitemData.baseprice, rollitemData.imageurl);
      createElement(notecard);
    }
    console.log("Cart array retrieved from local storage:  ", rollitemArrayString);
}

// if local storage is not empty - retrieve local storage 
if (localStorage.getItem('storedRollitem') != null) {
    retrieveFromLocalStorage();
}



















