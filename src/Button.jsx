export default function Button(props) {
    return (
        <button 
        onClick={props.onClickHandler}
        className="button"
      >
        {props.buttonText}
      </button>
    )
}