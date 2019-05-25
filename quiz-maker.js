function initQuiz(subjects_list) { 
    //let subjects_list = ['S1','S2', 'S3' , 'S4', 'S5'];


    quiz_details = document.getElementById("quiz-details");
    quiz_details.innerHTML = "<form method = 'post' action = '#' class = 'assignment-form'></form>"
    form = document.getElementsByClassName("assignment-form")[0];  
    form.innerHTML ="<label for = assignment-name class = 'form-component'>Name </label> <input type = 'text' id ="
                   + "'assignment-name' class = 'form-component'></input><br>"
                   +"<label for = 'subject-chooser'  class = 'form-component' >Subject</label>"
                   +"<select id = 'subject-chooser' class = 'subject-chooser form-component'></select><br>"
                           
    subject_chooser = form.getElementsByClassName("subject-chooser")[0];
    for(i = 0  ; i<subjects_list.length; i++) {
        subject_chooser.innerHTML += "<option value = " + subjects_list[i] + ">" +  subjects_list[i] + "</option>"
    }

    form.innerHTML += "<label for ='submission-date' class = 'form-component'>Date </label> <input type = 'date' id = 'submission-date' "
                   + "class = 'submission-date'></input><br>"
                   + "<label for ='submission-time' class = 'form-component'> Time </label> <input type = 'time' id = 'submission-time' "
                   + "class = 'submission-date'></input><br>"
                   + "<label for ='duration' class = 'form-component'> Duration </label> <input type = 'number' id = 'duration' "
                   + "class = 'duration'></input> in mins<br>"
                   +"<label for = 'subject-chooser'  class = 'form-component' >Marking Scheme</label>"
                   + "<select id = 'subject-chooser' class = 'subject-chooser form-component'>"
                   + "<option> Constant </option> <option> Variable </option> </select><br>"
                   + "<br> <label for ='total-marks' class = 'form-component'> Total Marks </label> <input type = 'number' id = 'total-marks' "
                   + "class = 'total-marks'></input><br>"
                   +" <hr>";

    let quizForm = document.getElementById('quiz-form');
    let addBtn = document.createElement('button');
    addBtn.id = 'quiz-add';
    addBtn.innerText = '+';
    addBtn.setAttribute('onclick' , 'addTile()');

    quizForm.appendChild(addBtn);
}

//  let addBtn = document.getElementById('add');
//let remBtn = document.getElementById('sub');
//let optBtn = document.getElementById('add-opt');
//let delOpt = document.getElementById('del-opt');
//let qtype = document.getElementById('question-type');

// USE ANCHOR TAGS

function addTile() {
    let quizForm = document.getElementById('quiz-form');
    let tile = document.createElement('div');
    let addBtn = document.getElementById('quiz-add');
    tile.id = "tile";
    quizForm.insertBefore(tile,addBtn); 
    qPanel = document.createElement('div');
    qPanel.id = "question-panel";
    qPanel.innerHTML = "<button id = 'ques-sub' onclick = 'deleteTile(this)'> - </button>"
                       +"<br> Question : <textarea></textarea>"
                       +"<br> Add Image : <input type='file' id = 'image' onchange = 'disImg(this)'></input>"
                       +"<br> Marks : <input type='text' id = 'marks'></input>"
                       +"<br> Solution <input type='text' id = 'solution'></input>";
    //if(qType.selectedIndex != 2) {
        optPanel = document.createElement('div');
        optPanel.id = "option-panel";
        optPanel.innerHTML = "<button id = 'opt-add' class = 'opt-add' onclick = 'insertOpt(this)'> + </button> "
                            +"<button id = 'opt-sub' onclick = 'deleteOpt(this)'> - </button>"
                            + "<br><span> A  <input type = 'text'></input></span>"
                            +" <span> B  <input type = 'text'></input></span>"
                            +"<br><span>  C  <input type = 'text'></input></span>"
                            +"<span> D  <input type = 'text'></input></span>";
    
       
    //}
    tile.appendChild(qPanel);
    tile.appendChild(optPanel);
    console.log(document.getElementById('image').value);

    
}


function insertOpt(node) {
    option = document.createElement("span");
    option.id = "option";
    option.innerHTML = "<br> A <input type = 'text'></input>"
    optionPanel = node.parentNode ; 
    optionPanel.appendChild(option);
    console.log("called");
}


function deleteOpt(node) {
    optionPanel = node.parentNode ;
    optionPanel.removeChild(optionPanel.lastChild);
}

function deleteTile(node) {
 qPanel = node.parentNode ;
 tile = qPanel.parentNode ;
 tile.remove();
}

function disImg(image) {
    img = document.createElement('img');
    let reader = new FileReader() ;
    reader.onload =   () => img.src = reader.result ;
    reader.readAsDataURL(image.files[0]);
    qPanel = image.parentNode ;
    qPanel.insertBefore(img,image);
    img.setAttribute('height' , '150')


}



