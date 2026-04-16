import './stats.css';

function StatsMenu({ onBack }) {
  return (
    <div className="Stats-container">
      <h1>Статистика</h1>
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>

    </div>
  );
}

export default StatsMenu;