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

    var edit_NofB = document.getElementById('bank_name');
    edit_NofB.removeAttribute("readonly");

    var edit_Acc_Name = document.getElementById('acc_holder_name');
    edit_Acc_Name.removeAttribute("readonly");

    var edit_Acc_No = document.getElementById('acc_no.');
    edit_Acc_No.removeAttribute("readonly");

    var edit_username = document.getElementById('usrname');
    edit_username.removeAttribute("readonly");

    var edit_password = document.getElementById('pwd');
    edit_password.removeAttribute("readonly");

    var edit_conf_password = document.getElementById('confirm_pwd');
    edit_conf_password.removeAttribute("readonly");
}

function save() {

}

function cancel_action() {

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

    var edit_pnum = document.getElementById('pnumber');
    edit_pnum.setAttribute("readonly", "true");

    var edit_email = document.getElementById('email');
    edit_email.setAttribute("readonly", "true");

    var edit_NofB = document.getElementById('bank_name');
    edit_NofB.setAttribute("readonly", "true");

    var edit_Acc_Name = document.getElementById('acc_holder_name');
    edit_Acc_Name.setAttribute("readonly", "true");

    var edit_Acc_No = document.getElementById('acc_no.');
    edit_Acc_No.setAttribute("readonly", "true");

    var edit_username = document.getElementById('usrname');
    edit_username.setAttribute("readonly", "true");

    var edit_password = document.getElementById('pwd');
    edit_password.setAttribute("readonly", "true");

    var edit_conf_password = document.getElementById('confirm_pwd');
    edit_conf_password.setAttribute("readonly", "true");
}