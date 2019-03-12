
// Reminder : Check for constraints and security 

document.getElementById("submit-btn").addEventListener("click" , function() {
    authenticate();
});

function authenticate() {
    username = document.getElementById("username").value;
    password = document.getElementById("password").value;

    if(username === "" || password  == "") {
        alert("Username or Password cannot be empty");
    }

    if(username === "admin" && password === "1234") {
        alert("login Success");
    } else {
        alert("Login fail");
    }
}