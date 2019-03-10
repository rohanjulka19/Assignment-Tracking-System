let sidebar = document.getElementById("sidebar-li");
let flag = 1 ;
//let subjects = ["subject1", "subject2", "subject3" , "subject4"];
//let subject1 = ["a1","a2","a3"];



subjects = [
             {
                 name : "subject1",
        teacher : "selma",
        assignments : [ {
            name : "a1",
            issuedOn : "1/2/2019",
            submission: "6/2/2019"
        }, {
            name : "a2",
            issuedOn : "10/2/2019",
            submission: "15/2/2019"
        }]
    } ,
     {
        name : "subject2",
        teacher : "selma",
        assignments : [ {
            name : "A1",
            issuedOn : "1/2/2019",
            submission: "6/2/2019"
        }, {
            name : "A2",
            issuedOn : "10/2/2019",
            submission: "15/2/2019"
        }]
    }
];
addEvents();

function addEvents() {
    subjects = document.getElementsByClassName("subject-li");
    for(i = 0 ; i<subjects.length; i++ ) {
        subjects[i].addEventListener("click", function() {
        if(this.getElementsByClassName("assignments-li")[0].style.display === "block" ) {
            this.getElementsByClassName("assignments-li")[0].style.display = "none" ;
            this.getElementsByClassName("li-button")[0].innerHTML = "+" ;
        } else  {
            this.getElementsByClassName("assignments-li")[0].style.display = "block" ;
            this.getElementsByClassName("li-button")[0].innerHTML = "-" ;
        }
         
     
        });
    }
}
/*
addSubjects(subjects);
stretch();

function addSubjects(subjects) {
    let index = 0 ;
    for (subject of subjects) {
        sidebar.innerHTML += "<li><button value = '" + index + "'>+</button>" + subject.name + "</li>";
        index++ ;
    }
}


function stretch() {
    let buttons = sidebar.getElementsByTagName("button");

    for (button of buttons) { // change the iterator not working on Microsoft Edge
        button.addEventListener("click",function(){
            expand(this);
    });
  }
}

function expand(obj) {
    alert(obj);
    value = obj.value;
    console.log(value);
    let list = sidebar.getElementsByTagName("li")[value];

    if(flag == 0) {
        list.innerHTML += "<ul>" ;
        for( assingment of subjects[value].assignments) {
            list.innerHTML += "<li>" + assingment.name + "</li>";
        }
        list.innerHTML += "</ul>";
        flag = 1 ;
    } else {
        alert("else called");
        list.innerHTML = subjects[value].name ;
        flag = 0 ;
    }
}
*/