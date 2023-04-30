const errorlog = document.getElementById("errorSignup");
function signUpValidation(username, password, confirm_password, firstName, lastName, email, date) {
    if (!length_validation(firstName, "First Name")) return false;
    if (!length_validation(lastName, "Last Name")) return false;
    if (!length_validation(password, "Password", 8)) return false;
    if (!length_validation(confirm_password, "Confirm Password")) return false;
    if (!length_validation(username, "Username")) return false;
    if (!length_validation(email, "Email")) return false;
    if (!length_validation(date, "Date")) return false;
    if (!allLetter(firstName,"First Name")) return false;
    if (!allLetter(lastName, "Last Name")) return false;
    if (!ValidateEmail(email)) return false;
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
    updateError("password should be same as confirm password!");
    return false;
}

function password_validation(password) {
    if (containsNumbers(password) && contains_letters(password)) {
        return true;
    }
    updateError("password should contain numbers and letters!");
    return false;
}

function containsNumbers(str) {
    return /\d/.test(str);
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
                updateError(name + " should not be empty!");
            }
            return false;
        }
    }
    return true;
}


function allLetter(uname, str) {
    var letters = /^[A-Za-z]+$/;
    if (letters.test(uname)) {
        return true;
    }
    else {
        updateError(str + ' must have English alphabet characters only!');
        uname.focus();
        return false;
    }
}

function ValidateEmail(uemail) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (mailformat.test(uemail)) {
        return true;
    }
    else {
        updateError("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}