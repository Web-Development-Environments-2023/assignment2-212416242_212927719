function goToSignUpPage() {
    hideAll();
    document.getElementById("SignUp").style.display = "block";
}
function goToLoginPage() {
    hideAll();
    $("#errorLogin").empty();
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

function goToGamePage() {
    hideAll();
    document.getElementById("gamePage").style.display = "block";
}

function goToScores() {
    hideAll();
    updateScoreTable();
    document.getElementById("scoresPage").style.display = "block";
}

function openAbout() {
    var menuButton = document.getElementById("menu-icon");
    if (menuButton.checked == true) {
        menuButton.checked = false;
        setTimeout(() => {
            window.dialog.showModal();
        }, 1300);

    }
    else {
        window.dialog.showModal();
    }

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
    document.getElementById("gamePage").style.display = "none";
    document.getElementById("scoresPage").style.display = "none";
}


window.addEventListener('click', function(e){   
    if (document.getElementById('dialogDiv').contains(e.target)){
      // Clicked in box
    } else{
        window.dialog.close();
    }
  });
