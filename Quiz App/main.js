
$(function() {

    $.getJSON('questions.json' , function (questions) {


    const questionElement = document.getElementById("question")
    const answerButtons = document.getElementById("answer-buttons")
    const nextBtn = document.getElementById("next-btn")


    let currentQuestionIndex = 0;
    let score =0;
    let theAnswer = null;

    function startQize(){
        currentQuestionIndex = 0;
        score =0;
        nextBtn.innerHTML = "Next";
        showQuestion();
        console.log(typeof(questions))
    }

    function showQuestion(){
        resetState();
        let currentquestion = questions[currentQuestionIndex];
        let questionNomber = currentQuestionIndex + 1;
        questionElement.innerHTML = questionNomber + ". " + currentquestion.question

        currentquestion.answers.forEach(answer =>{
            const button = document.createElement("button");
            button.innerHTML = answer.text;
            button.classList.add("btn");
            answerButtons.appendChild(button);
            if(answer.correct){
                //button.dataset.correct = answer.correct
                theAnswer = answer.text;
            }
            button.addEventListener('click',selectAnswer);
        })
    }


    function resetState(){
        nextBtn.style.display = "none";
        while(answerButtons.firstChild){
            answerButtons.removeChild(answerButtons.firstChild);
        }
    }


    function selectAnswer(e){
        const selectedBtn = e.target;
        //const isCorect = selectedBtn.dataset.correct === "true";
        if(selectedBtn.textContent == theAnswer){
            selectedBtn.classList.add("correct");
            score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }
        Array.from(answerButtons.children).forEach(button =>{
            if(button.textContent == theAnswer){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextBtn.style.display = "block";
        console.log(theAnswer)
    }

    function showScore(){
        resetState();
        questionElement.innerHTML = `you scored ${score} out of ${questions.length}`;
        nextBtn.innerHTML = "play Again";
        nextBtn.style.display = "block"
    }


    function handelNextButton(){
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }else{
            showScore();
        }

    }


    nextBtn.addEventListener('click' , ()=>{
        if(currentQuestionIndex <questions.length){
            handelNextButton();
        }else{
            startQize()
        }
    })

    startQize()



        
    });
});


