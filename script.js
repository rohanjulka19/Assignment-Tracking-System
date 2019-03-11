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
        subjects[i].getElementsByClassName("subjects")[0].addEventListener("click", function() {
            let button = this.getElementsByClassName("li-button")[0];
            let value = button.value ;
            let sub_list =  document.getElementsByClassName("subject-li")[value].getElementsByClassName("assignments-li")[0];
        if(sub_list.style.display === "block" ) {
            sub_list.style.display = "none" ;
            button.innerHTML = "+" ;
        } else  {
            sub_list.style.display = "block" ;
            button.innerHTML = "-" ;
        }
         
     
        });
    }
}