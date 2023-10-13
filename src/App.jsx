import React from "react"
import QuestionPage from "./QuestionPage"
import {decode} from 'html-entities';

export default function App() {
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [questions, setQuestion] = React.useState([]);

  // get the api one time only
  React.useEffect(function() {
    const api = "https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple";

    fetch(api)
      .then(response => response.json())
      .then(json => {
        // clean up each result before add to the json itself
        const results = json.results.map(result => {
          return {
            ...result,
            "question": decode(result.question),
            "correct_answer": decode(result.correct_answer),
            "incorrect_answers": result.incorrect_answers.map(answer => decode(answer))
          };
        });

        return setQuestion(results)
      });
  }, [])

  return (
    <div className="app-container">
      {/* <div className="block block--one"></div>
      <div className="block block--two"></div> */}

      {
        !startQuiz ? 
        (
          <section className="start-page">
            <h1 className="start-page__title">Quizzical</h1>
            <p className="start-page__subtitle">Let us see how many you got!</p>
            <button className="button button--large" onClick={() => setStartQuiz(true)}>Start Quiz</button>
          </section>
        ):
        <QuestionPage questions={questions} /> 
      }
      
      {/* <Question /> */}

    </div>
  )
}
