
/*
Created by: Kristjan Leotoots
Ostukorv - RIF21
*/



let productCount = 0;

//Function takes input from form and modifies the html to add the product.
function addToList() {

    let inputValue = getData().get("intoode");
    productCount++;
    document.getElementById("tooted").innerHTML += '<input class="form-check-label" type="checkbox" id="toode' + productCount + '" name="toode' + productCount + '" value="' + productCount + '"onclick="strikeThrough(this)">';
    document.getElementById("tooted").innerHTML += '<p id="toodeval' + productCount + '" for="toode' + productCount + '">' + inputValue + '<br></p>';

}


// Find out is the checkbox marked or not
function isBoxChecked(clickedElement) {
    return clickedElement.checked;
}

//  based on checkbos value, add strikethrough or remove it
function strikeThrough(clickedElement) {

    const isChecked = isBoxChecked(clickedElement);
    let productValue = document.getElementById("toodeval" + clickedElement.value).innerHTML;
    let newProductValue = "";

    // Change the specified inner element value based on if the checkboxed got marked or unmarked
    if (isChecked) {
        const newProductvalue = '<s>' + productValue + '</s>';
        document.getElementById("toodeval" + clickedElement.value).innerHTML = newProductvalue;
    }
    else {
        productValue = productValue.replace("<s>", "");
        productValue = productValue.replace("</s>", "");
        document.getElementById("toodeval" + clickedElement.value).innerHTML = productValue;
    }


}

// Function gets data from HTML from when "intoode" button is clicked

function getData() {
    let form = document.getElementById("korv");
    return new FormData(form);
}

// Clear all the added products 
function clearCheckedProducts() {
    document.querySelectorAll('[id^=toode]').forEach(box => {
        if (isBoxChecked(box)) {
            box.remove();
            document.getElementById("toodeval" + box.value).remove();
            //localStorage.removeItem("prod" + );
        }
    });
}

// Clear all added producsts

function clearAllProducts() {
    document.getElementById("tooted").innerHTML = "";
}

/*
function storeValues() {
    localStorage.setItem("prod" + productCount, prodValue);
    localStorage.setItem("prodCount" + productCount);
}

function fetchValues(prodValue) {
    return localStorage(prodValue);
} */