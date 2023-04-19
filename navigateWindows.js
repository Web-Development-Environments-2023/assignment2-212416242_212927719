function goToSignUpPage() {
    hideAll();
    document.getElementById("SignUp").style.display = "block";
}
function goToLoginPage() {
    hideAll();
    document.getElementById("Login").style.display = "block";
}

function goToHomePage() {
    hideAll();
    document.getElementById("HomeScreen").style.display = "block";
}

function goToLoggedInPage() {
    hideAll();
    document.getElementById("loggedInPage").style.display = "block";
}


function hideAll() {
    var menuButton = document.getElementById("menu-icon");
    if (menuButton.checked == true) {
        menuButton.checked = false;
    }

    document.getElementById("SignUp").style.display = "none";
    document.getElementById("Login").style.display = "none";
    document.getElementById("HomeScreen").style.display = "none";
    document.getElementById("loggedInPage").style.display = "none";
}
