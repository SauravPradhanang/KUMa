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
function edit() {

    // use of element.removeAttribute("attr_name") method to remove 'readonly' attribute from the input elements
    var edit_pr_name = document.getElementById('product_name');
    edit_pr_name.removeAttribute("readonly");

    var edit_pr_category = document.getElementById('product_category');
    edit_pr_category.removeAttribute("readonly");

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
            <button onclick="" class="button button-margin" name="save">Save</button>
            <button onclick="cancel_action()" type="reset" class="button button-bottom" name = "cancel">Cancel</button>
            `;
}

function save() {

}