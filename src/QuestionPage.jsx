/* eslint-disable react/prop-types */
import Question from "./Question"
import Button from "./Button";
import React from "react";

export default function QuestionPage(props) {
  /*
   Props: 
   1. questions: an array of questionObject
   2. restartQuiz
   3. setQuestions
   */
  const {questions, setQuestions, restartQuiz} = props;
  
  // States
  const [answerChecked, setAnswerChecked] = React.useState(false);
  const [totalResult, setTotalResult] = React.useState(0);

  // Functions
  const getTotalResult = function(questionArray) {  
    let result = 0;

    questionArray.forEach(question => {
      if (question.userChoice === question.correctAnswer) {
        result += 1;
      }
    })

    setTotalResult(result);
    setAnswerChecked(true);
  }

  const restartGame = function() {
    // reinitialize the game
    setTotalResult(0);
    setAnswerChecked(false);
    restartQuiz();
  }

  // Handlers
  const setUserChoice = function(questionId, value) {
    setQuestions(function(prevState) {
      const newState = prevState.map((question, index) => {
        if (questionId !== index) {
          return question
        }
        return {...question, "userChoice": value};
      })

      return newState;
    });
  }

  // Components
  const Questions = questions.map(function(question, id) {
    return (
      <Question 
        key={id} 
        id={id}
        questionObject={question} 
        answerChecked={answerChecked}
        clickHandler={setUserChoice}
      />
    )
  });

  const ResultPanel = function(questionArray) { 
    return (
      <p className="result">
        Getting {totalResult} out of {questionArray.length} questions
      </p>
    )
  }

  const CheckAnswerButton = Button({
    onClickHandler: () => getTotalResult(questions),
    buttonText: "Check Answers",
  });

  const RestartButton = Button({
    onClickHandler: restartGame,
    buttonText: "Play Again",
  });
  

  
  return (
    <section className="question-page">
      { Questions }
      <div className="button-section">
        { 
          answerChecked ? 
            ResultPanel(questions): 
            "" 
        }

        {
        !answerChecked ? 
          CheckAnswerButton: 
          RestartButton
        }
      </div>
    </section>
  )
}
