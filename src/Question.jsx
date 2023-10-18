export default function Question(props) {
  /*
   props: 
   1. clickHandler
   2. id
   3. questionObject: correctAnswer, options, question, userChoice
   4. answerChecked 
   */

  const {question, options, userChoice, correctAnswer} = props.questionObject;

  // Function
  const classNames = function(classes) {
    return Object.entries(classes)
      .filter(([key, value]) => value)
      .map(([key, value]) => key)
      .join(' ');
  }

  // Components
  const Options = options.map((option, key) => {
    // set classes for each option state
    // 1. selected
    // 2. correctOption
    // 3. ? (if user select the wrong thing)

    const classes = {
      'option': true,
      'selected': userChoice === option,
      'correct': props.answerChecked && (option === correctAnswer),
      'incorrect': props.answerChecked && (userChoice === option) && (option !== correctAnswer)
    }

    const buttonClassNames = classNames(classes);

    return (
      <button
        disabled={props.answerChecked}
        className={buttonClassNames}
        key={key}
        onClick={
          () => props.clickHandler(props.id, option)
        }
      >
        {option}
      </button>
    )
  });


  
  return (
    <section className="question-container">
      <p className="question">{question}</p>
      <div className="options">
        {Options}
      </div>
    </section>
  )
}

