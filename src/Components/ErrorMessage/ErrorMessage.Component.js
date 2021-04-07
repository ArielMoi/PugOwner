import './ErrorMessage.css'

function ErrorMessage(props) {
  return (
    <div className="error-window" style={{ visibility: props.visibility }}>
      <i className="fas fa-exclamation-circle fa-5x"></i>
      <h1>Error!</h1>
      <p>we encounter a network problem trying to connect you to the website. please reload and give us another chance</p>
      <button onClick={props.onClickExit} id="x">
        <i className="fas fa-times-circle"></i>
      </button>
    </div>
  );
}

export default ErrorMessage;