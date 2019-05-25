
subjects = ['s1' , 's2' , 's3'];
quiz = ['q1','q2','q3']

function initDashboard() {

    board = document.createElement('div');
    board.id = 'dashboard';
    document.getElementsByTagName('main')[0].appendChild(board);

    subjects.forEach(subject => {
        let sPanel = document.createElement('div');
        sPanel.id = 'subject-tile';
        sPanel.className = 'subject-tile';
        sPanel.innerHTML = "<h2> <button id ='expand' onclick = 'expand(this)'> + </button>"
                           +"<span id = 'subject-title'> Subject" 
                           +" | Class-Sec </span> <a href = '#' "
                           +"id = 'create-subject' onclick = 'initQuizEditor(this)'> "
                           +"CREATE</a>"
                           +" | <a href = '#' "
                           +"id = 'create-subject' >"
                           +"SUBMISSIONS</a>"
                           +" </h2> ";
        board.appendChild(sPanel);
    });
   
    
}

function expand(node) {
    sPanel = node.parentNode.parentNode;
    
    if(node.innerText === '+'){
        node.innerText = '-';
        table = document.createElement('table');
        table.id = 'table' ;
        sPanel.appendChild(table);
        tHRow = document.createElement('tr');
        thArr = ['id' ,'Name' ,'Date' , 'Time' , 'Duration'];
        idArr = ['id' ,'name','date' , 'time' , 'duration'];
        qtArr = ['1','Q1' , '11/05/19' , '10:00' , '5'];
        for(index = 0 ; index<4 ;index++) {
            tHeader = document.createElement('th');
            tHeader.innerHTML = thArr[index];
            tHRow.appendChild(tHeader);
        }
        table.appendChild(tHRow);
        for(index = 0 ; index <1 ; index++) {
            tRow = document.createElement('tr');
            for(attrNo = 0  ; attrNo <4 ;attrNo++) {
                tData = document.createElement('td');
                tData.innerHTML = qtArr[attrNo]; 
                tData.id = idArr[attrNo];
                tRow.appendChild(tData);
            }
            tData = document.createElement('td');
            tData.innerHTML = "<a id = 'edit' href = '#' onclick = edit(this) > EDIT |</a> ";
            tRow.appendChild(tData);

            tData = document.createElement('td');
            tData.innerHTML = "<a id = 'delete' href = '#' onclick = deleteQuiz(this) >DELETE|</a> ";
            tRow.appendChild(tData);
            
            tData = document.createElement('td');
            tData.innerHTML ="<a id = 'submissions' onclick = toggleModal(this) href ='#' >SUBMISSIONS </a>  "  ;
            tRow.appendChild(tData);
            
            table.appendChild(tRow);
        }
        /*header.innerHTML = '<h3> Name Date Time Duration </h3>';
        qTile = document.createElement('div');
        qTile.id = 'quiz-tile';
        qTile.innerHTML = '<h3> Q1 11th May 10:00 5 </h3>';
        sPanel.appendChild(header);
        sPanel.appendChild(qTile); */
        
    } else {
        node.innerText = '+';
        sPanel.removeChild(table);
    }
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
  initQuizEditor(subjects);
  tr = node.parentNode.parentNode ;
  id = tr.querySelector('.id');
  // GET quiz details using ID
  
}

function deleteQuiz(node) {
    tr = node.parentNode.parentNode ;
    id = tr.querySelector('.id');
    // DELETE quiz details Using ID
    tr.remove();
    alert('deleted');
}
document.getElementById('dashboard-navbar').addEventListener('click' ,() => {
    document.getElementById('quiz-details').remove() ;
    document.getElementById('quiz-form').remove();
    initDashboard();
});
initDashboard();
