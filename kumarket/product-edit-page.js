// Definition of function to remove errors before going through form validation
function clearerrors() {

    errors = document.getElementsByClassName('formerror');
    // clears the content of innerHTML of elements of class name: 'formerror', useful to remove errors after it is solved
    for (let item of errors) {
        item.innerHTML = "";
    }

}

// Function Definiton to cancel edit action
function cancel_action() {

    clearerrors();

    var edit_product_name = document.getElementById('product_name');
    edit_product_name.setAttribute("readonly", "true");
    if (edit_product_name.hasAttribute("readonly")) {
        console.log("readonly exists");
    }
    else {
        console.log("readonly does not exist");
    }

    var edit_pr_category = document.getElementById('product_category');
    edit_pr_category.setAttribute("readonly", "true");

    var edit_pr_details = document.getElementById('pr_details');
    edit_pr_details.setAttribute("readonly", "true");

    var edit_pr_tags = document.getElementById('tags');
    edit_pr_tags.setAttribute("readonly", "true");

    var edit_pr_price = document.getElementById('price');
    edit_pr_price.setAttribute("readonly", "true");

    var edit__stock = document.getElementById('_stock');
    edit__stock.setAttribute("readonly", "true");

    // Setting display property value to none to hide the buttons when 'Cancel' button is clicked 
    var button_to_del = document.getElementById('buttons');
    // console.log(button_to_del);
    button_to_del.classList.add("none");
}

// Function Definition to remove 'readonly' attribute from the form document to enable the user to modify their data
function edit_page() {

    // use of element.removeAttribute("attr_name") method to remove 'readonly' attribute from the input elements
    var edit_pr_name = document.getElementById('product_name');
    edit_pr_name.removeAttribute("readonly");

    var edit_pr_category = document.getElementById('product_category');
    edit_pr_category.removeAttribute("readonly");

    var edit_pr_variant = document.getElementById('variant_details1');
    edit_pr_variant.removeAttribute("readonly");

    var edit_pr_details = document.getElementById('pr_details');
    edit_pr_details.removeAttribute("readonly");

    var edit_tags = document.getElementById('tags');
    edit_tags.removeAttribute("readonly");

    var edit_price = document.getElementById('price');
    edit_price.removeAttribute("readonly");

    var edit_stock = document.getElementById('_stock');
    edit_stock.removeAttribute("readonly");

    var button_to_add = document.getElementById('buttons');
    // console.log(button_to_del);

    // Resetting the CSS display property to make the buttons visible when the 'Edit' button is clicked again  
    button_to_add.classList.remove("none");
    // zzz.classList.add/remove/toggle("ccc"): helps us add, remove or toggle the class dynamically

    button_to_add.innerHTML = `
            <button onclick="" class="button button-bottom1" name="save">Save</button>
            <button onclick="cancel_action()" type="reset" class="button button-bottom2" name = "cancel">Cancel</button>
            `;
}

var counter = 0; // Counter to keep track of the number of repeated elements

// Definition of function to add more input fields specifically text for variant
function addMoreVariant() {
    // Create a new HTML element (e.g., an input field)
    var newElement1 = document.createElement('div');

    // console.log(counter);
    // Set attribute id = variant + counter
    newElement1.setAttribute('id', 'variant' + ++counter);

    // Set the innerHTML of the new element
    newElement1.innerHTML = `
    <input type="text" class="style-input variant-style variantColor" name="variant_color/size${counter}" id="variant_details1${counter}" placeholder="Color/Size of the product" required>
    <button class="button remove_button" type="button" onclick="remove(${counter})">Remove</button>
            <br>
            `;
    // Button to remove the redundant input fields for "Variant", needs counter as argument to identify that particular element that needs to be removed.

    // Append the new element to the container
    var container = document.getElementById('variant_div');
    container.appendChild(newElement1);

    // Increase the counter for the next element
    // counter++;
    console.log(counter);
}

// Definition of function to add more input fields specifically file for image
function addMoreImage() {
    // Create a new HTML element (e.g., an input field)
    var newElement2 = document.createElement('div');

    // console.log(counter);
    // Set attribute id = variant + counter
    newElement2.setAttribute('id', 'variant' + ++counter);

    // Set the innerHTML of the new element
    newElement2.innerHTML = `
            <input type="file" class="style-input variant-style" name="variant_img${counter}" id="variant_details2${counter} required">
            <button class="button remove_button" type="button" onclick="remove(${counter})">Remove</button>
            <br>
        `;
    // Button to remove the redundant input fields for "Variant", needs counter as argument to identify that particular element that needs to be removed.

    // Append the new element to the container
    var container2 = document.getElementById('image_div');
    container2.appendChild(newElement2);

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

    // counter--;
    console.log(counter);
}

function remove1() {
    var elementToremove = document.getElementById('variantDiv');
    elementToremove.remove();
}

function remove2() {
    var elementToremove = document.getElementById('variantImgDiv');
    elementToremove.remove();
}

function save() {

}