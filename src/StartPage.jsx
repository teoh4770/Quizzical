export default function StartPage(props) {
    return(
        <section className="start-page">
          <h1 className="start-page__title">Quizzical</h1>
          <p className="start-page__subtitle">Let us see how many you got!</p>
          <button className="button button--large" onClick={() => props.startQuiz(true)}>Start Quiz</button>
        </section>
    )
}