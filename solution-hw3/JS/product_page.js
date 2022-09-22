

console.log('Javascript file is successfully linked!')


let selectGlazing = document.querySelector('#glazing_Select');
// Give it a listener for the 'change' event, which is a function that will run
// when the selected option changes. You could also do this by setting the
// onchange property of selectElement, e.g. selectElement.onchange = ...
selectGlazing.addEventListener('change', function () { cal_TotalPrice("upd_Glazing");});

let selectPackSize = document.querySelector('#packsize_Select');
//selectPackSize.addEventListener('change', onSelect_PackSizeOptionChange);
selectPackSize.addEventListener('change', function () { cal_TotalPrice("upd_PackSize");});

//let selectPrefer = document.querySelector('#packsize_Select','#glazing_Select');
//selectPrefer.addEventListener('change', onSelect_TotalPriceChange);




// collection of all glazing options.
let allGlazingOptions = [
    {
        option_name: 'Keep Original',
        base_price: 2.49,
        add_price: 0.00,
        description: 'to be added',
    },

    {
        option_name: 'Sugar Milk',
        base_price: 2.49,
        add_price: 0.00,
        description: 'to be added',
    },

    {
        option_name: 'Vanilla Milk',
        base_price: 2.49,
        add_price: 0.50,
        description: 'to be added',
    },

    {
        option_name: 'Double Chololate',
        base_price: 2.49,
        add_price: 1.50,
        description: 'to be added',
    },
];


// collection of all package size options.
let allPackSizeOptions = [
    {
        option_packsize: 1,
        price_adaption: 1,
        description: 'to be added',
    },

    {
        option_packsize: 3,
        price_adaption: 3,
        description: 'to be added',
    },

    {
        option_packsize: 6,
        price_adaption: 5,
        description: 'to be added',
    },

    {
        option_packsize: 12,
        price_adaption: 10,
        description: 'to be added',
    },
];

item_GlazingChange(allGlazingOptions[0])
item_PackSizeChange(allPackSizeOptions[0])

function item_GlazingChange(item) {
    // get value of selected glazing option
    console.log('Glazing option is updated!');
    let price_SingleItem = '$' + (item.base_price + item.add_price);
    console.log('Current single item price is ' + price_SingleItem)
    return price_SingleItem
}

function item_PackSizeChange(item) {
    // get value of selected glazing option
    let item_TotalPrice = document.querySelector('#item_baseprice');
    console.log('Pack Size Option is updated!');
    let price_Factor = item.price_adaption
    console.log('Current price factor is ' + price_Factor);
    return price_Factor
}

function cal_TotalPrice(operation) {
    if (operation === "upd_Glazing") {  
        console.log('You selected flavor option number ' + this.value);
        let index_glazing = parseInt(this.value);
        let glazingOption = allGlazingOptions[index_glazing];
        item_GlazingChange(glazingOption);
    }


    else if (operation === "upd_PackSize") {        
        console.log('You selected pack size option number ' + this.value);
        let index_packsize = parseInt(this.value);
        let packSizeOption = allPackSizeOptions[index_packsize];
        item_PackSizeChange(packSizeOption);
    }

    let price_Total = price_SingleItem * price_Factor;
    console.log('Current total price is ' + price_Total)
    return price_Total
}





function onSelect_GlazingOptionChange() {
    // In this function, `this` corresponds to the select
    // element. So `this.value` will contain the value of the
    // selected option as a string.
    console.log('You selected flavor option number ' + this.value);
  
    // We need to convert the string value to an integer
    let index_glazing = parseInt(this.value);
  
    // Now retrieve the object at the index specified by the select's value
    let glazingOption = allGlazingOptions[index_glazing];
  
    // Update the UI
    item_GlazingChange(glazingOption);
}





function onSelect_PackSizeOptionChange() {
    console.log('You selected pack size option number ' + this.value);
    // We need to convert the string value to an integer
    let index_packsize = parseInt(this.value);
  
    // Now retrieve the object at the index specified by the select's value
    let packSizeOption = allPackSizeOptions[index_packsize];
  
    // Update the UI
    item_PackSizeChange(packSizeOption);
}





 
//function displayProductPrice() {

    //let totalDisplayItemPrice = document.querySelector('#item_baseprice');
    //console.log('Flavor option is updated!')
    //totalDisplayItemPrice.innerText = '$' + item_TotalPrice 
    //'$'+(item.base_price + item.add_price);
//}

      
































