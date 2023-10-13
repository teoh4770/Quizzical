import React from "react"

/* eslint-disable react/prop-types */
export default function Question({id, question, options, handleClick}) {
  const [selectedButton, getSelectedButton] = React.useState("");

  const optionsComponents = options.map((option, index) => {
    const isSelected = selectedButton === option;
    return (
      <button 
        className={isSelected ? "selected" : ""}
        onClick={() => {
          getSelectedButton(option)
          handleClick(id, option)
        }}
        key={index}
        id={id}
        value={option}>
          {option}
      </button>
  )})

  return (
    <section className="question-container">
      <p className="question">{question}</p>
      <div className="answer-options">
        {optionsComponents}
      </div>
    </section>
  )
}

