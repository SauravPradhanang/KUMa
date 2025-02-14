// for account-details.html

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
}

// Definition of function to check errors and validate form data
function formValidate() {

    clearerrors();
    var returnValue = true;

    var number = document.forms['myForm']["phoneno."].value;

    // .length() property only works for strings. When retrieving data from input fields using the DOM model, the values are always treated as strings by JS, that is why even if the input field consists of number it is technically read as string.

    // Checks length of the phone no.
    if (number.length !== 10) {
        seterror("enumber", "*Invalid length. Phone number should be 10 digits long.");
        returnValue = false;
    }

    // Checks if the field consists of value other than +ve no.
    if (isNaN(number) || parseFloat(number) < 0) {
        seterror("enumber", "*Invalid value. Please enter a proper phone number ");
        returnValue = false;
    }
    // the condition at the bottom is priortized first.

    var pasword = document.forms['myForm']["password"].value;

    // 8 characters long, [A-Z], [a-z], [0-9], [!@#$%^&*]
    var passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

    const result = passwordPattern.test(pasword);
    // the .test() method is used to check the pattern of the password, we pass the variable that we want to check against the regex as an argument to the test method, and passwordPattern is the variable that stores the regex that is to be matched. 

    // Checks the pattern of the password
    console.log(result);
    if (result === false) {
        seterror("epassword", "*Invalid Format. Please check the password format and re-enter the password.");
        returnValue = false;
    }

    // Checks the length of acc. no 
    var accnumber = document.forms['myForm']["acc_no."].value;
    if (accnumber.length !== 16) {
        seterror("eaccno", "*Account number should be 11 digits long.");
        returnValue = false;
    }

    return returnValue;
}


