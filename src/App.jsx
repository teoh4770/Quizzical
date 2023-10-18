import React from "react";
import QuestionPage from "./QuestionPage";
import StartPage from "./StartPage";
import {decode} from 'html-entities';

export default function App() {
  // States
  const [startQuiz, setStartQuiz] = React.useState(false);
  const [restartQuiz, setRestartQuiz] = React.useState(0);
  const [questions, setQuestions] = React.useState([]);

  // Side effect
  React.useEffect(function() {
    const shuffleArray = function(array) {
      return array.sort(() => Math.random() - 0.5);
    }

    const api = "https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple";

    // Note: fetch and assigned the value to the questions
    const fetchData = async function() {
      const data = await fetch(api);
      const {results} = await data.json();

      // decode the weird characters to user-friendly characters
      const cleanResults = results.map(function(result) {
        let decodedQuestion = decode(result.question);
        let decodedIncorrectAnswers = result.incorrect_answers.map(answer => decode(answer));
        let decodedCorrectAnswer = decode(result.correct_answer);
        let shuffledOptions = shuffleArray([...decodedIncorrectAnswers, decodedCorrectAnswer]);

        return {
          question: decodedQuestion,
          options: shuffledOptions,
          correctAnswer: decodedCorrectAnswer,
          userChoice: "",
        };
      })

      setQuestions(cleanResults);
    }

    fetchData()
      .catch(console.error);
  }, [restartQuiz])

  // Handlers
  // startQuiz: boolean
  const startQuizHandler = function(startQuiz) {
    setStartQuiz(startQuiz);
  }

  const restartQuizHandler = function() {
    setRestartQuiz((prevState) => prevState + 1)
  }

  return (
    <div className="app-container">
      {
        !startQuiz ? 
          <StartPage 
            startQuiz={startQuizHandler}
          /> :
          <QuestionPage 
            questions={questions} 
            setQuestions={setQuestions}
            restartQuiz={restartQuizHandler}
          />
      }
    </div>
  )
}
