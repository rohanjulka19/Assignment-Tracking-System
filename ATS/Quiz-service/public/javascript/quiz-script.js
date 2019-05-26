
subjects = [];
quiz = []
console.log('called quiz-script');
function getSubjects() {
    console.log("Called getSubjects()");
    fetch('http://localhost:3002/subjects' )
    .then((res)=>{
        return (res.json());
    })
    .then((data) => {subjects = [...data]} )
    .then(()=>initDashboard())
    .catch((err) => console.log("Error"+ err));
}

function initDashboard() {
    console.log('Called initDashbaord()');
    board = document.createElement('div');
    board.id = 'dashboard';
    document.getElementsByTagName('main')[0].appendChild(board);
    console.log(subjects);
    subjects.forEach(subject => {
        let sPanel = document.createElement('div');
        sPanel.id = 'subject-tile';
        sPanel.className = 'subject-tile';
        sPanel.innerHTML = "<h2> <button id ='expand' onclick = 'getQuizList(this)'> + </button>"
                           +"<span id = 'subject-title'> ["+subject.course_code+"] " + subject.name  
                           +" | " + subject.class +"-" +subject.sec + "</span> <a href = '#' "
                           +"id = 'create-subject' onclick = 'initQuizEditor(this)'> "
                           +"CREATE</a>"
                           +" | <a href = '#'  onclick = 'addModalData(this)'"
                           +"id = 'subject-sub' >"
                           +"SUBMISSIONS</a>"
                           +" </h2> ";
        board.appendChild(sPanel);
    });
   
    
}

function getQuizList(node) {
    let sPanel = node.parentNode.parentNode;
    console.log(sPanel);
    let subName = sPanel.getElementsByTagName('span')[0].innerText.split('|')[0].split(']')[1].trim() ;
    console.log(subName);
    let sub = subjects.find((subject) => {
        if(subject.name === subName)
            return subject;
    });
    let subCode = sub.course_code;
    let url = "http://localhost:3002/" + subCode + "/quiz";
    console.log(url);
    fetch(url)
    .then((res)=> res.json())
    .then((data) => {quiz = [...data]; console.log(quiz)})
    .then(()=> expand(node))
    .catch((error) => console.log("Error" + error));
}

function expand(node) {
    sPanel = node.parentNode.parentNode;
    
    if(node.innerText === '+'){
        node.innerText = '-';
        table = document.createElement('table');
        table.id = 'table' ;
        sPanel.appendChild(table);
        tHRow = document.createElement('tr');
        thArr = ['id' ,'Name' ,'Date' , 'Time' , 'Duration', 'Total Marks'];
        for(index = 0 ; index<thArr.length ;index++) {
            tHeader = document.createElement('th');
            tHeader.innerHTML = thArr[index];
            tHRow.appendChild(tHeader);
        }
        table.appendChild(tHRow);
        for(index = 0 ; index <quiz.length ; index++) {
            tRow = document.createElement('tr');
                tData = document.createElement('td');
                tData.innerHTML = quiz[index].id; 
                tData.id = 'id';
                tRow.appendChild(tData);
                tData = document.createElement('td');
                tData.innerHTML = quiz[index].name; 
                tData.id = 'name';
                tRow.appendChild(tData);
                tData = document.createElement('td');
                tData.innerHTML = getDateTime(quiz[index].start_time)[0]; 
                tData.id = 'date';
                tRow.appendChild(tData);
                tData = document.createElement('td');
                tData.innerHTML = getDateTime(quiz[index].start_time)[1]; 
                tData.id = 'time';
                tRow.appendChild(tData);
                tData = document.createElement('td');
                tData.innerHTML = quiz[index].duration + ' min'; 
                tData.id = 'duration';
                tRow.appendChild(tData);
                tData = document.createElement('td');
                tData.innerHTML = quiz[index].total_marks; 
                tData.id = 'total_marks';
                tRow.appendChild(tData);
               
            tData = document.createElement('td');
            tData.innerHTML = "<a id = 'edit' href = '#' onclick = edit(this) > EDIT |</a> ";
            tRow.appendChild(tData);

            tData = document.createElement('td');
            tData.innerHTML = "<a id = 'delete' href = '#' onclick = deleteQuiz(this) >DELETE|</a> ";
            tRow.appendChild(tData);
            
            tData = document.createElement('td');
            tData.innerHTML ="<a id = 'submissions' onclick = addModalData(this) href ='#' >SUBMISSIONS </a>  "  ;
            tRow.appendChild(tData);
            
            table.appendChild(tRow);
        }
    } else {
        node.innerText = '+';
        sPanel.removeChild(table);
    }
}

function getDateTime(value) {
    dtArr = [] ;
    dt = value.split(' ');
    dtArr[0] = dt[0];
    dtArr[1] = dt[1].split('+')[0];
    
    return dtArr ;
}

function initQuizEditor(subjects) {
    document.getElementById('dashboard').hidden = true;
    let qDetails = document.createElement('div');
    let qForm = document.createElement('div');
    qDetails.id = 'quiz-details';
    qForm.id = 'quiz-form';
    let main = document.getElementsByTagName('main');
    
    main[0].appendChild(qDetails);
    main[0].appendChild(qForm);
    initQuiz(subjects) ;
}

function edit(node) {
  tr = node.parentNode.parentNode ;
  let id = tr.querySelector('#id').innerText;
  initQuizEditor(subjects);
  // GET quiz details using ID
  
}


function deleteQuiz(node) {
    let tr = node.parentNode.parentNode ;
    let id = tr.querySelector('#id').innerText;
    let url = "http://localhost:3002/quiz/" + id ;
    console.log(url);
    fetch(url , {
        method : 'delete'
    })
    .then((res) => {
        console.log(res);
        tr.remove()
    })

}

function addModalData(node) {
    if(node.parentNode.tagName == 'TD' ) {
        let tr = node.parentNode.parentNode ;
        let id = tr.querySelector('#id').innerText;
        let url = "http://localhost:3002/subm/quiz/" + id ;
        let subTable = document.getElementById('sub-table');
        fetch(url)
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            subTable.innerHTML= "<tr><th> id </th> <th> Regno </th><th> Name </th><th> marks </th></tr>"
            data.forEach((quizSub) => {
                subTable.innerHTML += "<tr><td>"+quizSub.quiz_id  +"</td> <td>"+ quizSub.std_regno +" </td>"
                + "<td>" + quizSub.names + "</td><td>"+ quizSub.marks + "</td></tr>"
            });
            toggleModal();
        })
    } else if(node.parentNode.tagName == 'H2') {
        let tile = node.parentNode.parentNode ;
        let title = tile.querySelector('#subject-title').innerText ;
        let subCode = title.trim().substring(1,7);
        let url = "http://localhost:3002/subm/subject/" + subCode ;
        let subTable = document.getElementById('sub-table');
        fetch(url)  
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            subTable.innerHTML= "<tr><th> Regno </th><th> Name </th><th> Quiz_marks </th></tr>"
            data.forEach((quizSub) => {
                subTable.innerHTML += "<tr><td>"+ quizSub.std_regno +" </td>"
                + "<td>" + quizSub.names + "</td><td>"+ quizSub.quiz_marks + "</td></tr>"
            });
            toggleModal();
        })
    }
}

document.getElementById('dashboard-navbar').addEventListener('click' ,() => {
    document.getElementById('quiz-details').remove() ;
    document.getElementById('quiz-form').remove();
    initDashboard();
});

getSubjects();
