function StatCard({ title, value, handleClickCard }) {
  const monthStringToNumber = {
    Gennaio: "01",
    Febbraio: "02",
    Marzo: "03",
    Aprile: "04",
    Maggio: "05",
    Giugno: "06",
    Luglio: "07",
    Agosto: "08",
    Settembre: "09",
    Ottobre: "10",
    Novembre: "11",
    Dicembre: "12",
  };
  return (
    <div
      className="p-1"
      onClick={() => handleClickCard(monthStringToNumber[value] + "/" + title)}
    >
      <div className="card p-0">
        <div className="card-header"> {title} </div>
        <div className="card-body">
          <div className="card-text d-inline-flex">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
