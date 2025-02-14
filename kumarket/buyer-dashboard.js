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

    var edit_email = document.getElementById('email');
    edit_email.setAttribute("readonly", "true");

    var edit_username = document.getElementById('usrname');
    edit_username.setAttribute("readonly", "true");

    // Setting display property value to none to hide the buttons when 'Cancel' button is clicked 
    var button_to_del = document.getElementById('buttons');
    console.log(button_to_del);
    button_to_del.classList.add("none");
}

// Function Definition to remove 'readonly' attribute from the form document to enable the user to modify their data
function edit() {

    // use of element.removeAttribute("attr_name") method to remove 'readonly' attribute from the input elements
    var edit_address = document.getElementById('email');
    edit_address.removeAttribute("readonly");

    var edit_pnum = document.getElementById('usrname');
    edit_pnum.removeAttribute("readonly");

    var button_to_add = document.getElementById('buttons');
    // console.log(button_to_del);

    // Resetting the CSS display property to make the buttons visible when the 'Edit' button is clicked again  
    // look at line no.39
    button_to_add.classList.remove("none");
    // zzz.classList.add/remove/toggle("ccc"): helps us add, remove or toggle the class dynamically

    button_to_add.innerHTML = `
            <button onclick="" class="button button-margin" name="save">Save</button>
            <button onclick="cancel_action()" type="reset" class="button button-bottom" name = "cancel">Cancel</button>
            `;
}

// Function definitions to toggle input type i.e. to show/hide the passwords 

function togglePassword1() {
    var element_to_change1 = document.getElementById('pwd');
    if (element_to_change1.type === "password") {
        element_to_change1.type = "text";
    }
    else {
        element_to_change1.type = "password";
    }
}

function save() {

}