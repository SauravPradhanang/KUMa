var counter = 0; // Counter to keep track of the number of repeated elements

// Definition of function to add more variant input fields
function addMoreVariant() {
    // Create a new HTML element (e.g., an input field)
    var newElement = document.createElement('div');

    // console.log(counter);
    // Set attribute id = variant + counter
    newElement.setAttribute('id', 'variant' + ++counter);

    // Set the innerHTML of the new element
    newElement.innerHTML = `
            <input type="text" class="style-input variant-style variantColor" name="variant_colorsize" id="variant_details1${counter}" placeholder="Color/Size of the product">
            <button class="button remove_button" type="button" onclick="remove(${counter})">Remove</button>
            <br>
        `;
    // Button to remove the redundant input fields for "Variant", needs counter as argument to identify that particular element that needs to be removed.

    // Append the new element to the container
    var container = document.getElementById('variant_div');
    container.appendChild(newElement);

    // Increase the counter for the next element
    // counter++;
    console.log(counter);
}

//Add image
function addMoreImage() {
    // Create a new HTML element (e.g., an input field)
    var newElement = document.createElement('div');

    // console.log(counter);
    // Set attribute id = variant + counter
    newElement.setAttribute('id', 'variant' + ++counter);

    // Set the innerHTML of the new element
    newElement.innerHTML = `
            <input type="file" class="style-input variant-style" name="variant_img" id="variant_details2${counter}">
            <button class="button remove_button" type="button" onclick="remove(${counter})">Remove</button>
            <br>
        `;
    // Button to remove the redundant input fields for "Variant", needs counter as argument to identify that particular element that needs to be removed.

    // Append the new element to the container
    var container = document.getElementById('image_div');
    container.appendChild(newElement);

    // Increase the counter for the next element
    // counter++;
    console.log(counter);
}


// Definition of function to remove to input fields
function remove(counter) {
    // Stores element whose id is variant + counter (value passed as an argument) 
    var elementToremove = document.getElementById('variant' + counter);
    // Implementation of JS function 'remove()' to remove the entire element from DOM.
    elementToremove.remove();

    counter--;
    console.log(counter);
}

function seterror(id, error) {
    // Find the element by id and set the error message
    var element = document.getElementById(id); // Corrected: added document
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

function Validate() {
    var returnVal = true;

    // Get the value of the price input field
    var priceCheck = document.forms['addProductform']["pr_price"].value;
    // console.log(priceCheck);

    // Check if the input is not a number or if it is empty
    if (isNaN(priceCheck) || parseFloat(priceCheck) <= 0) {
        seterror("price_div", "*Price input is invalid. Please enter a valid numeric value.");
        returnVal = false;
    }

    return returnVal;

}