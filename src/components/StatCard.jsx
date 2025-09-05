function StatCard({ title, value }) {
  return (
    <div className="p-1">
      <div className="card p-0">
        <div className="card-header"> {title} </div>
        <div className="card-body">
          <div className="card-text">{value}</div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;
