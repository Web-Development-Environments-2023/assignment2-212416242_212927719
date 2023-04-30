const errorlog = document.getElementById("errorSignup");
function signUpValidation(username, password, confirm_password, firstName, lastName, email) {
    if (!length_validation(firstName, "firstName")) return false;
    if (!length_validation(lastName, "lastName")) return false;
    if (!length_validation(password, "password", 8)) return false;
    if (!length_validation(confirm_password, "confirm_password")) return false;
    if (!length_validation(username, "username")) return false;
    if (!length_validation(email, "email")) return false;
    if (!allLetter(firstName)) return false;
    if (!allLetter(lastName)) return false;
    if (!ValidateEmail(uemail)) return false;
    if (!password_validation(password)) return false;
    if (!confirm_password_validation(password, confirm_password)) return false;
    return true;

}
function updateError(msg) {
    $("#errorSignup").empty();
    $("#errorSignup").append(msg);
}

function confirm_password_validation(password, confirm_password) {
    if (password === confirm_password) {
        return true;
    }
    updateError("password should be same as confirm password");
    return false;
}

function password_validation(password) {
    if (containsNumbers(password) && contains_letters(password)) {
        return true;
    }
    updateError("password should contain numbers and letters");
    return false;
}

function contains_letters(str) {
    var regExp = /[a-zA-Z]/g;
    var testString = "john";
    return regExp.test(testString);
}


function length_validation(field, name, min = 0) {
    var uid_len = field.length;
    if (uid_len == 0) {
        if (min != 0 || uid_len >= min) {
            if (min > 0) {
                updateError(name + " should not be empty / length be more than " + min);
            } else {
                updateError(name + " should not be empty");
            }
            return false;
        }
    }
    return true;
}


function allLetter(uname) {
    var letters = /^[A-Za-z]+$/;
    if (uname.value.match(letters)) {
        return true;
    }
    else {
        updateError('Username must have alphabet characters only');
        uname.focus();
        return false;
    }
}

function ValidateEmail(uemail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (uemail.value.match(mailformat)) {
        return true;
    }
    else {
        updateError("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}