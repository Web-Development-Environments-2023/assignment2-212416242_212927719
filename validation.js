
function confirm_password_validation(password, confirm_password) {
    if (password === confirm_password) {
        return true;
    }
    alert("password should be same as confirm password");
    return false;
}

function password_validation(password) {
    if (containsNumbers(password) && contains_letters(password)) {
        return true;
    }
    alert("password should contain numbers and letters");
    return false;
}

function contains_letters(str) {
    var regExp = /[a-zA-Z]/g;
    var testString = "john";
    return regExp.test(testString);
}


function length_validation(field, my, name) {
    var uid_len = field.length;
    if (uid_len == 0) {
        if (my != 0 || uid_len >= my) {
            if (my > 0) {
                alert(name + " should not be empty / length be more than " + my);
            } else {
                alert(name + " should not be empty");
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
        alert('Username must have alphabet characters only');
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
        alert("You have entered an invalid email address!");
        uemail.focus();
        return false;
    }
}