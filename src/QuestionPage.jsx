/* eslint-disable react/prop-types */
import Question from "./Question"
import React from "react";

export default function QuestionPage(props) {
  // functions
  // const shuffleArray = (array) => {
  //   return array.sort(() => Math.random() - 0.5);
  // };
  const handleClick = (id, newAnswer) => {
    setUserAnswers(prevState => {
      return prevState.map((oldAnswer, index) => {
          if (index === id) {
            return newAnswer;
          }
          return oldAnswer;
      });
    });
  }

  const checkAnswer = (userAnswers, correctAnswers) => {
    setAnswerChecked(true);
    
    let score = 0;
    userAnswers.forEach((userAnswer, index) => {
      let userIsCorrect = userAnswer === correctAnswers[index];

      if (userIsCorrect) {
        score++;
      }
    });

    return score;
  }


  const [answerChecked, setAnswerChecked] = React.useState(false)
  const answers = props.questions.map(question => question.correct_answer);
  const [userAnswers, setUserAnswers] = React.useState(answers.map(answer => ""))


  const questionComponents = props.questions.map((questionObject, index) => {
    let {question, correct_answer, incorrect_answers} = questionObject;
    let options = [correct_answer, ...incorrect_answers];
    // const options = shuffleArray([correct_answer, ...incorrect_answers]);

    return (
      <Question 
        key={index}
        id={index}
        question={question}
        options={options}
        handleClick={handleClick}
      />
    );
  })


  return (
    <section className="question-page">
      {questionComponents}
      {
        !answerChecked ?
          <button onClick={() => checkAnswer(userAnswers, answers)} className="button">Check answers</button> :
          <button className="button">Play Again</button>
      }
     
    </section>
  )
}

// {questionComponents}