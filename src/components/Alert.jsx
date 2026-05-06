function Alert({ message, resetAlert }) {
  return (
    <div
      hidden={message === "" ? true : false}
      className="alert alert-danger alert-dismissible fade show mx-auto"
      role="alert"
    >
      {message}
      <button
        onClick={resetAlert}
        type="button"
        className="btn-close"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default Alert;
