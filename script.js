
// Reminder : Check for browser compatibility 
//  Reminder : Add method for dashboard 
//  Reminder : Add contraints to the form such as required 
// Reminder : Create a modal to view assignments submitted by students


let sidebar = document.getElementById("sidebar-li");
let flag = 1 ;

data = {
          0 : {
                 name : "Subject-1",
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
    }, 
    1 : {
            name : "Subject-2",
            teacher : "selma",
            assignments : []
        } 
    };

addDataToSideBar();
backToHome();
addEventsToSideBar();
addEventToNavBar(); //Experimental

function addDataToSideBar() {
    sidebar_element = document.getElementById("sidebar-li");
    for(index in data ) {
        sidebar_element.innerHTML += " <span class = 'subject-li'><li class = 'subjects'> <button class= 'li-button' value =" + index + ">"+" + </button>"+ data[index].name + "</li> <ul class = 'assignments-li' id = 'assignments-li'> </ul></span>"
        assignments_list = data[index].assignments;
        list = document.getElementsByClassName("assignments-li")[index];
        for(i = 0 ; i<assignments_list.length ; i++) {
            list.innerHTML += "<li> <a href = '#' id = 'assignment-1'> " + assignments_list[i].name + "</a></li>" ;
        }     
    }
}

function addEventToNavBar() { // Experimental
    navbar_dash = document.getElementById("dashboard-navbar");
    navbar_dash.addEventListener("click", function() {
        backToHome();
    });
}
function backToHome() {
    resetMainPage();
    heading = document.getElementById("heading");
    heading.innerHTML = "Recent Assignments" ;

    main_block = document.getElementById("main-block");
    main_block.innerHTML = " <table class='table'>"
                         +"<tr><th> S.No </th><th> Name </th><th> Class </th><th> Subject </th><th> Given on </th>"
                         +"<th> Submission </th><th> View </th></tr>"
                         +"<tr><td> 1</td><td> Assignment-1 </td><td> IT-C </td><td> Cryptography and Network Security </td>"
                         +"<td> 12/2/18</td><td> 24/2/18</td><td> <a href='#' > view </a> </td></tr>";
}
function addEventsToSideBar() {
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

   document.getElementById("create-assignment").addEventListener("click", function() {
       createNewAssignment();
   });

   document.getElementById("assignment-1").addEventListener("click", function() { // Might have to use getClassNames() instead of getElementById()
        openAssignment() //Experimental: should also send assignment name as parameter pin this for later
   });

}

function createNewAssignment() { // REMINDER : Add the feature to upload the document 
    let subjects_list = [];
    document.getElementById("heading").style.marginTop = "10px" ;// Refactor , line 88
    document.getElementsByClassName("line")[0].hidden = true ;
    heading = document.getElementById("heading");
    heading.innerHTML = "Assignment"
    for(index in data) {
        subjects_list.push(data[index].name);
    }

    main_block = document.getElementById("main-block");
    main_block.innerHTML = "<form method = 'post' action = '#' class = 'assignment-form'></form>"
    form = document.getElementsByClassName("assignment-form")[0];  
    form.innerHTML ="<label for = assignment-name class = 'form-component'>Name </label> <input type = 'text' id ="
                   + "'assignment-name' class = 'form-component'></input><br>"
                   +"<label for = 'subject-chooser'  class = 'form-component' >Subject</label>"
                   +"<select id = 'subject-chooser' class = 'subject-chooser form-component'></select><br>"
                           
    subject_chooser = form.getElementsByClassName("subject-chooser")[0];
    for(i = 0  ; i<subjects_list.length; i++) {
        subject_chooser.innerHTML += "<option value = " + subjects_list[i] + ">" +  subjects_list[i] + "</option>"
    }

    form.innerHTML += "<label class = 'form-component'>Issued " 
                   + "<span style = 'background:#ddd; padding : 2px;'>"+getDate() +"</span>" +"</label>"
                   + "<label for ='submission-date' class = 'form-component'> Submission</label> <input type = 'date' id = 'submission-date' "
                   + "class = 'submission-date'></input><br>"
                   +"<br><textarea  id = 'editor' ></textarea><br><button type = 'submit' id = 'submit-assignment' class = "+"'submit-btn'>Submit</button></form>";

    $(function() {
        $('textarea#editor').froalaEditor({
            height: 350,
            width: 800,
            toolbarButtons: [ 'bold', 'italic', 'underline','fontFamily', 'fontSize' ,'subscript', 'superscript', 'outdent', 'indent', 'formatOL','formatUL','insertTable','insertLink','insertImage','html']
            
        })
    });
}

function getDate() {
    date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    date_arr = date.toString().split("/").reverse();
    date_arr[0] = parseInt(date_arr[0]) + 1 ;
    date_arr[0] = date_arr[0].toString();
    return(date_arr.join("/")); 
}

function openAssignment() {
    resetMainPage();
    heading = document.getElementById("heading");
    heading.innerHTML = "<a href = '#' id = 'view' >View</a> | <a href = '#' id = 'submissions'> Submissions </a>";

    document.getElementById('view').addEventListener("click", function() {
        viewAssignment();
    });
    document.getElementById('submissions').addEventListener("click", function() {
        viewAssignmentSubmissions();
    });
    
    viewAssignment();
}

function viewAssignment() {
    main_block = document.getElementById("main-block");
    main_block.innerHTML = "Under construction";
}

function viewAssignmentSubmissions() {
    main_block = document.getElementById("main-block");
    main_block.innerHTML = "<div class = 'submission-details'>"
                         + "<span class = 'submission-disp'>Name </span> <span"
                         + " class = 'submission-disp'>Assignment-1</span><br>"
                         +"<span class = 'submission-disp' >Subject </span>"
                         +"<span class = 'submission-disp'>Subject-1 </span><br>"
                         +"<span class = 'submission-disp'>Issued</span> " 
                         + "<span>10/03/19</span>"
                         + "<span class = 'submission-disp'> Submission</span> <span "
                         + "class = 'submission-disp'>13/03/19</span><br>"
                         + "</div>";

    main_block.innerHTML += "<table> "
                         + "<tr><th> S.No </th> <th>Name</th> <th>Registration No.</th> <th>View</th> <th> Marks</th></tr>"
                         + "<tr><td> 1</td> <td>std1</td> <td>15910xxxx </td> <td><a href ='#'>view</a> </td>"
                         +"<td> <input type = 'number' id = 'assignment-marks' style = width:50px;></input></td></tr>"
                         +"</table>"
}

function resetMainPage() {

    document.getElementById("heading").style.marginTop = "30px" ;
    document.getElementsByClassName("line")[0].hidden = false ;

}