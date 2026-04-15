import './stats.css';

function StatsMenu({ onBack }) {
  return (
    <div className="Stats-container">
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
      <a>its stats</a>
    </div>
  );
}

export default StatsMenu;