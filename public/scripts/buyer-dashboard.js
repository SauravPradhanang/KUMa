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

    document.getElementById('pwd1').removeAttribute('readonly');
    document.getElementById('pwd2').removeAttribute('readonly');

    var edit_pnum = document.getElementById('usrname');
    edit_pnum.removeAttribute("readonly");

    var button_to_add = document.getElementById('buttons');
    // console.log(button_to_del);

    // Resetting the CSS display property to make the buttons visible when the 'Edit' button is clicked again  
    // look at line no.39
    button_to_add.classList.remove("none");
    // zzz.classList.add/remove/toggle("ccc"): helps us add, remove or toggle the class dynamically

    button_to_add.innerHTML = `
          <button onclick="save(event)" type="button" class="button button-margin" name="save2">Save</button>
            <button onclick="cancel_action()" type="reset" class="button button-bottom" name = "cancel">Cancel</button>
            `;
}

// Function definitions to toggle input type i.e. to show/hide the passwords 

function togglePassword1() {
    var element_to_change1 = document.getElementById('pwd1');
    var element_to_change2 = document.getElementById('pwd2');
    if (element_to_change1.type === "password") {
        element_to_change1.type = "text";
    }
    else {
        element_to_change1.type = "password";
    }
    if (element_to_change2.type === "password") {
        element_to_change2.type = "text";
    }
    else {
        element_to_change2.type = "password";
    }
}



async function save(event) {

    event.preventDefault();  
    const form = document.querySelector('.form-grid');
    const passwordError = document.querySelector('.password-error');

    const newPasswordInput = form.querySelector('input[name="new-password"]');
    const oldPasswordInput = form.querySelector('input[name="old-password"]');
    const usernameInput = form.querySelector('input[name="username"]');
    const emailInput = form.querySelector('input[name="email"]');

    let newPassword = newPasswordInput ? newPasswordInput.value : '';
    let oldPassword = oldPasswordInput ? oldPasswordInput.value : '';

    const username = usernameInput ? usernameInput.value : '';
    const email = emailInput ? emailInput.value : '';

    update({ oldPassword, username, newPassword, email, passwordError });
    alert('Your email and username have been updated.');
}


async function update({ oldPassword, username, newPassword, email, passwordError }) {
    const res = await fetch(`/users/edit-user`, {
        method: 'POST',
        body: JSON.stringify({ oldPassword, username, newPassword, email }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) {
        passwordError.innerText = "Enter the correct old password to change it.";
        passwordError.style.color = "red";
    } else {
        passwordError.innerText = "Password changed successfully.";
        passwordError.style.color = "green";
    }
}

