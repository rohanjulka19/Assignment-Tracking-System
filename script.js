
// Reminder : Check for browser compatibility 

let sidebar = document.getElementById("sidebar-li");
let flag = 1 ;

data = {
          1 : {
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
      2:{
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
};

//addDataToSideBar();

addEventsToSideBar();

// Under Progress ... figure out a way to add the assingments ... priority : low 
/*function addDataToSideBar() {
    sidebar_element = document.getElementById("sidebar-li");
    for(index in data ) {
        sidebar_element.innerHTML += " <span class = 'subject-li'><li class = 'subjects'> <button class= 'li-button' value =" + (index-1) + "> + </button>"
        + data[index].name + "</li> <ul class = 'assignments-li' id = 'assignments-li'> <li> <a href='#'>" + data[index].assignments. 
        <ul class = "assignments-li" id = "assignments-li">
             <li> <a href="#"> A1 </a> </li>
             <li> <a href= "#"> A2 </a> </li>
        </ul></span>
     
    }
}*/

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
}

function createNewAssignment() { // REMINDER : Add the feature to upload the document 
    let subjects_list = [];
   // heading.innerHTML = "<a href = '#'>View</a> | <a href = '#'> Submissions </a>"; use in the view buttons event listener 
    document.getElementById("heading").style.marginTop = "10px" ;
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