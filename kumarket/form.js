// Function Definiton to cancel edit action
function cancel_action() {

    clearerrors();

    var edit_name = document.getElementById('name');
    edit_name.setAttribute("readonly", "true");
    if (edit_name.hasAttribute("readonly")) {
        console.log("readonly exists");
    }
    else {
        console.log("readonly does not exist");
    }

    var edit_address = document.getElementById('address');
    edit_address.setAttribute("readonly", "true");

    var number = document.getElementById('pnumber');
    number.setAttribute("readonly", "true");

    var edit_email = document.getElementById('email');
    edit_email.setAttribute("readonly", "true");

    // var edit_NofB = document.getElementById('bank_name');
    // edit_NofB.setAttribute("readonly", "true");

    // var edit_Acc_Name = document.getElementById('acc_holder_name');
    // edit_Acc_Name.setAttribute("readonly", "true");

    // var edit_Acc_No = document.getElementById('acc_no.');
    // edit_Acc_No.setAttribute("readonly", "true");

    var edit_username = document.getElementById('usrname');
    edit_username.setAttribute("readonly", "true");

    // Setting display property value to none to hide the buttons when 'Cancel' button is clicked 
    var button_to_del = document.getElementById('buttons');
    // console.log(button_to_del);
    button_to_del.classList.add("none");
}

// Function Definition to remove 'readonly' attribute from the form document to enable the user to modify their data
function edit() {

    // use of element.removeAttribute("attr_name") method to remove 'readonly' attribute from the input elements
    var edit_name = document.getElementById('name');
    edit_name.removeAttribute("readonly");

    var edit_address = document.getElementById('address');
    edit_address.removeAttribute("readonly");

    var edit_pnum = document.getElementById('pnumber');
    edit_pnum.removeAttribute("readonly");

    var edit_email = document.getElementById('email');
    edit_email.removeAttribute("readonly");

    // var edit_NofB = document.getElementById('bank_name');
    // edit_NofB.removeAttribute("readonly");

    // var edit_Acc_Name = document.getElementById('acc_holder_name');
    // edit_Acc_Name.removeAttribute("readonly");

    // var edit_Acc_No = document.getElementById('acc_no.');
    // edit_Acc_No.removeAttribute("readonly");

    var edit_username = document.getElementById('usrname');
    edit_username.removeAttribute("readonly");

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