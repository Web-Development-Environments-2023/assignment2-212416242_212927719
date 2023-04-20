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
    else {
        // errorMsg.style.display = 'block';
    }
}



function tryLogin() {
    let username = document.getElementById('loginUserName').value;
    let password = document.getElementById('loginPassword').value;
    if (users[username].password === password) {
        console.log("loggedin");
        loggedInUser = users[username];
        document.getElementById("helloText").value = "Hello " + loggedInUser.firstName + " " + loggedInUser.lastName;
        goToLoggedInPage();
    }

}