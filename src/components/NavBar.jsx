function NavBar({ onClick, fileCaricato }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2">
      <div className="container-fluid">
        <a className="navbar-brand">E-Distribuzione excel reader</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <button
                className={
                  fileCaricato === "caricando" ? "d-none" : "nav-link active"
                }
                aria-current="page"
                onClick={onClick}
              >
                {fileCaricato === "no" ? "Carica File" : "Carica Nuovo File"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
