import { monthStringToNumber } from "../utils/utils";

function StatCard({ title, value, handleClickCard }) {
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
