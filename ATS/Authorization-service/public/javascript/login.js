
//import URLSearchParams from 'url-search-params';


document.getElementById('LoginForm').addEventListener('submit' ,  (event) => {
    event.preventDefault();
    console.log('submit called');
    
    let user = document.getElementById('username').value ;
    let pass = document.getElementById('password').value;
    let data = 'username=' + user + '&' + 'password=' + pass ;
    let service = document.getElementById('selection').selectedIndex;
    
    
    
    fetch('http://localhost:3000/login', {
        body: data,
        headers: {
          "Cache-Control": "no-cache",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then((res) => console.log(res))
    .then(() => {
        if(service == 0) {
           
        } else {
            window.location = 'http://localhost:3002/';
        }
    } )
    //.catch((err) => console.log("Error " +err))
});