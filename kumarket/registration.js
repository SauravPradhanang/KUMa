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

function togglePassword2() {
    var element_to_change2 = document.getElementById('confirm_pwd');
    if (element_to_change2.type === "password") {
        element_to_change2.type = "text";
    }
    else {
        element_to_change2.type = "password";
    }
}