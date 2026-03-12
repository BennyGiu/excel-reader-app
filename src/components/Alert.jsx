function Alert({ message, resetAlert }) {
  return (
    <div
      hidden={message === "" ? true : false}
      class="alert alert-danger alert-dismissible fade show mx-auto"
      role="alert"
    >
      {message}
      <button
        onClick={resetAlert}
        type="button"
        class="btn-close"
        aria-label="Close"
      ></button>
    </div>
  );
}

export default Alert;
