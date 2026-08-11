function WedgetsCard({ icon, title, img, count = 100 }) {
  return (
    <div className="wedgets" style={{ backgroundImage: img }}>
      <div className="wedgets-left">
        <div className="wedget-icon">{icon}</div>
        <div className="wedgets-heading">{title}</div>
      </div>

      <div className="wedgets-count">{count}</div>
    </div>
  );
}

export default WedgetsCard;
