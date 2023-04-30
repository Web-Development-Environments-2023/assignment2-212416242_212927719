const users = {};
var loggedInUser;
var UserScores = [{ score: "10", time: "15", date: "1/1/1", lives: "2" }];

users["p"] = { username: "p", password: "testuser", firstName: "Admin", lastName: "Admin", email: "admin@gmail.com", date: "1/1/1111" }




function submitSignUp() {
    // const errorMsg = document.getElementById('error-signup');
    let confirm_password = document.getElementById('confirmPassword').value;
    let password = document.getElementById('password').value;
    let username = document.getElementById('userName').value;
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let email = document.getElementById('email').value;
    let date = document.getElementById('date').value;
    if (signUpValidation(username, password, confirm_password, firstName, lastName, email)) {
        const newUser = { username: username, password: password, firstName: firstName, lastName: lastName, email: email, date: date };
        users[username] = newUser;
        console.log(users);
        goToHomePage()
    }
}



function tryLogin() {
    let username = document.getElementById('loginUserName').value;
    let password = document.getElementById('loginPassword').value;
    if (users[username] && users[username].password === password) {
        loginUser(username);
    }
    else {
        $("#errorLogin").empty();
        $("#errorLogin").append("Password or username incorrect");
    }

}


function clearLoginError(){
    $("#errorLogin").empty();
}

function loginUser(username) {
    console.log("loggedin");
    loggedInUser = users[username];
    UserScores = [];
    // document.getElementById("helloText").value = "Hello " + loggedInUser.firstName + " " + loggedInUser.lastName;
    goToHomePage();
    
    document.getElementById('signup').style.display = "none";
    document.getElementById('login').style.display = "none";
    document.getElementById('logout').style.display = "block";
    document.getElementById('playGame').style.display = "block";
    document.getElementById('scores').style.display = "block";

    document.getElementById('menu_signup').style.display = "none";
    document.getElementById('menu_login').style.display = "none";
    document.getElementById('menu_scores').style.display = "block";
    document.getElementById('menu_logout').style.display = "block";
}

function logOutUser() {
    loggedInUser = null;
    goToHomePage();
    document.getElementById('signup').style.display = "block";
    document.getElementById('login').style.display = "block";
    document.getElementById('logout').style.display = "none";
    document.getElementById('playGame').style.display = "none";
    document.getElementById('scores').style.display = "none";

    document.getElementById('menu_signup').style.display = "block";
    document.getElementById('menu_login').style.display = "block";
    document.getElementById('menu_scores').style.display = "none";
    document.getElementById('menu_logout').style.display = "none";
}