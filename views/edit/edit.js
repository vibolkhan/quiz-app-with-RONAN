// DOMS ELEMENTS  ---------------------------------------------------------
const dom_questions_view = document.getElementById("questions-view");
const dom_questions_dialog = document.getElementById("questions-dialog");
const dom_createEditButton = document.getElementById("createEditButton");

// DATA  ---------------------------------------------------------
let questions = [{
        title: "What does HTML stand for?",
        choiceA: "Hi Thierry More Laught",
        choiceB: "How To move Left",
        choiceC: "Ho Theary Missed the Laundry !",
        choiceD: "Hypertext Markup Language",
        correct: "D",
    },
    {
        title: "What does CSS stand for?",
        choiceA: "Cisco and Super Start",
        choiceB: "Ci So Sa",
        choiceC: "Cascading Style Sheets ",
        choiceD: "I don't know !",
        correct: "C",
    },
    {
        title: "What does JS stand for?",
        choiceA: "Junior stars",
        choiceB: "Justing Star",
        choiceC: "Javascript",
        choiceD: "RonanScript",
        correct: "C",
    },
];

let questionToEdit = null;

// HIDE / SHOW ---------------------------------------------------------
function hide(element) {
    element.style.display = "none";
}

function show(element) {
    element.style.display = "block";
}

//  LOCAL STORAGE ---------------------------------------------------------
function saveQuestions() {
    localStorage.setItem("questions", JSON.stringify(questions));
}

function loadQuestions() {
    let questionsStorage = JSON.parse(localStorage.getItem("questions"));
    if (questionsStorage !== null) {
        questions = questionsStorage;
    }
}

//  EDIT ---------------------------------------------------------

function renderQuestions() {
    // Remove the card container and create a new one
    dom_questions_container = document.getElementById("questions-container");
    dom_questions_container.remove();
    dom_questions_container = document.createElement("div");
    dom_questions_container.id = "questions-container";
    dom_questions_view.appendChild(dom_questions_container);

    // 2 - For all questions,  create a new div (class : item), and append it the container
    for (let index = 0; index < questions.length; index++) {
        let question = questions[index];

        let card = document.createElement("div");
        card.className = "card";
        card.dataset.index = index;
        dom_questions_container.appendChild(card);

        let questionInfos = document.createElement("div");
        questionInfos.className = "question-info";
        card.appendChild(questionInfos);

        let title = document.createElement("h2");
        title.className = "title";
        title.textContent = question.title;
        questionInfos.appendChild(title);

        // Create spams for title and author
        let actions = document.createElement("div");
        actions.className = "actions";
        card.appendChild(actions);

        let answers = document.createElement('div');
        answers.className = 'answers';

        let answerA = document.createElement('span');
        answerA.className = 'answerDisplay';
        answerA.textContent = question.choiceA;

        let answerB = document.createElement('span');
        answerB.className = 'answerDisplay';
        answerB.textContent = question.choiceB;

        let answerC = document.createElement('span');
        answerC.className = 'answerDisplay';
        answerC.textContent = question.choiceC;

        let answerD = document.createElement('span');
        answerD.className = 'answerDisplay';
        answerD.textContent = question.choiceD;

        answers.appendChild(answerA);
        answers.appendChild(answerB);
        answers.appendChild(answerC);
        answers.appendChild(answerD);

        questionInfos.appendChild(answers)

        if (question.correct == "A") {
            answerA.style.backgroundColor = "green";
        } else if (question.correct == "B") {
            answerB.style.backgroundColor = "green";
        } else if (question.correct == "C") {
            answerC.style.backgroundColor = "green";
        } else if (question.correct == "D") {
            answerD.style.backgroundColor = "green";
        }

        let editAction = document.createElement("img");
        editAction.src = "../../img/edit.svg";
        editAction.addEventListener("click", editQuestion);
        actions.appendChild(editAction);

        let trashAction = document.createElement("img");
        trashAction.src = "../../img/trash.png";
        trashAction.addEventListener("click", removeQuestion);
        actions.appendChild(trashAction);
    }

}

function editQuestion(event) {
    //  Get the question index
    questionToEdit = event.target.parentElement.parentElement.dataset.index;

    // update the dialog with question informatin
    let question = questions[questionToEdit];
    document.getElementById("title").value = question.title;
    document.getElementById("choiceA").value = question.choiceA;
    document.getElementById("choiceB").value = question.choiceB;
    document.getElementById("choiceC").value = question.choiceC;
    document.getElementById("choiceD").value = question.choiceD;
    let corrects = document.querySelectorAll(".correct");
    for (let i = 0; i < corrects.length; i++) {
        if (corrects[i].value == question.correct) {
            corrects[i].checked = true;
        }
    }
    // Show the dialog
    dom_createEditButton.textContent = "EDIT";
    show(dom_questions_dialog);
}

function removeQuestion(event) {
    //  Get index
    let index = event.target.parentElement.parentElement.dataset.index;

    // Remove question
    questions.splice(index, 1);

    // Save to local storage
    saveQuestions();

    // Update the view
    renderQuestions();
}

function onAddQuestion() {
    show(dom_questions_dialog);
    clearValue()
    document.getElementById("createEditButton").textContent = 'Create';
}

function onCancel(e) {
    dom_createEditButton.textContent = "CREATE";
    hide(dom_questions_dialog);
}


let answer = document.getElementsByName('answer');

function onCreate() {
    hide(dom_questions_dialog);
    let correctAnswer = ''
    let question = document.getElementById("title").value;
    let answerA = document.getElementById("choiceA").value;
    let answerB = document.getElementById("choiceB").value;
    let answerC = document.getElementById("choiceC").value;
    let answerD = document.getElementById("choiceD").value;
    let correctA = document.getElementById("correctA");
    let correctB = document.getElementById("correctB");
    let correctC = document.getElementById("correctC");
    let correctD = document.getElementById("correctD");
    if (correctA.checked) {
        correctAnswer = "A";
    } else if (correctB.checked) {
        correctAnswer = "B";
    } else if (correctC.checked) {
        correctAnswer = "C";
    } else if (correctD.checked) {
        correctAnswer = "D";
    }
    if (questionToEdit !== null) {
        let editQuestion = questions[questionToEdit];
        editQuestion.title = question;
        editQuestion.correct = correctAnswer;
        editQuestion.choiceA = answerA;
        editQuestion.choiceB = answerB;
        editQuestion.choiceC = answerC;
        editQuestion.choiceD = answerD;
    } else {
        let newQuestion = {};
        newQuestion.title = document.getElementById("title").value;
        newQuestion.correct = correctAnswer;
        newQuestion.choiceA = answerA;
        newQuestion.choiceB = answerB;
        newQuestion.choiceC = answerC;
        newQuestion.choiceD = answerD;
        questions.push(newQuestion);
    }
    // 2- Save question
    saveQuestions();

    // 3 - Update the view
    renderQuestions();
}
// MAIN  ---------------------------------------------------------

loadQuestions();

renderQuestions();

function clearValue() {
    questionToEdit = null;
    document.getElementById("title").value = "";
    document.getElementById("choiceA").value = "";
    document.getElementById("choiceB").value = "";
    document.getElementById("choiceC").value = "";
    document.getElementById("choiceD").value = "";
    let corrects = document.querySelectorAll(".correct");
    for (let i = 0; i < corrects.length; i++) {
        corrects[i].checked = false;
    }
}