function NavBar({ onClick, statoApp, onClickProva }) {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary mb-2">
      <div className="container-fluid">
        <a href="/excel-reader-app" className="navbar-brand">
          e-Distribuzione csv reader
        </a>
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
                  statoApp === "caricandoFile" ? "d-none" : "nav-link active"
                }
                aria-current="page"
                onClick={onClick}
              >
                {statoApp === "fileNonCaricati"
                  ? "Carica File"
                  : "Carica Nuovi File"}
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link active"
                aria-current="page"
                onClick={onClickProva}
              >
                Usa dati di prova
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
