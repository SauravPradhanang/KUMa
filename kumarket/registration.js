    function clearerrors() {

        error = document.getElementsByClassName('formerror');
        error.innerHTML = "";

    }
    function seterror(id, error) {
        element = document.getElementById(id);
        element.getElementsByClassName('formerror')[0].innerHTML = error;
    }

    function formValidate() {

        var returnValue = true;
        clearerrors();

        var name = document.forms['myForm']["fullname"].value;
        if (name.length < 8) {
            seterror("name", "*Invalid Length. Full name should be at least 8 characters long.");
            returnValue = false;
        }

        var address = document.forms['myForm']["address"].value;
        if (address.length < 5) {
            seterror("eaddress", "Invalid Address. Address should be at least 5 characters long.");
            returnValue = false;
        }

        var number = document.forms['myForm']["phoneno."].value;
        if (isNaN(number) || parseFloat(number) <= 0) {
            seterror("enumber", "Invalid value. Please enter a proper phone number ");
            returnValue = false;
        }

        if (number.toString().length < 10) {
            seterror("enumber", "Invalid length. Phone number should be at least 10 digits long. You cannot enter a landline number.");
            returnValue = false;
        }

        var usrname = document.forms['myForm']["username"].value;
        if (usrname.length < 5) {
            seterror("eusername", "Username should be at least 5 characters long.");
            returnValue = false;
        }

        var pasword = document.forms['myForm']["password"].value;
        passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        if (passwordPattern.test(pasword)) {
            seterror("epassword", "Invalid Format. Please check the password format and re-enter the password.");
            returnValue = false;
        }

        var conf_pass = document.forms['myForm']["confirm_password"].value;
        if (conf_pass !== pasword) {
            seterror("econfpassword", "The password do not match. Please re-enter your password.");
            returnValue = false;
        }

        var accnumber = document.forms['myForm']["acc_no."].value;
        if (accnumber.length < 11 || parseFloat(accnumber) <= 0) {
            seterror("eaccno", "Account number should be 11 digits long.");
            returnValue = false;
        }

        return returnValue;
    }
