// Definition of function to remove errors before going through form validation
function clearerrors() {

    errors = document.getElementsByClassName('formerror');
    // clears the content of innerHTML of elements of class name: 'formerror', useful to remove errors after it is solved
    for (let item of errors) {
        item.innerHTML = "";
    }

}

// Definiton of function to set error, takes id of the respective div and display message as arguments.
function seterror(id, error) {

    element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
    // we cannot set the properties of null

}

// Definition of function to check errors and validate form data
function validateForm() {

    clearerrors();
    var returnValue = true;
    console.log(returnValue);

    var number = document.forms['orderConfirmForm']["phoneNo"].value;

    // .length() property only works for strings. When retrieving data from input fields using the DOM model, the values are always treated as strings by JS, that is why even if the input field consists of number it is technically read as string.

    // Checks length of the phone no.
    if (number.length !== 10) {
        seterror("error_number", "*Invalid length. Phone number should be 10 digits long.");
        returnValue = false;
    }

    // Checks if the field consists of value other than +ve no.
    if (isNaN(number) || parseFloat(number) < 0) {
        seterror("error_number", "*Invalid value. Please enter a proper phone number ");
        returnValue = false;
    }

    console.log(returnValue);
    return returnValue;
}
/*
function khaltiPayment() {
    window.location.href = "khalti.html";
} */