import './stats.css';
import StatsGraph from './StatsGraph';

function StatsMenu({ onBack, tgId }) {
  return (
    <div className="Stats-container">
      <h1>Статистика</h1>
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
      <StatsGraph tgId={tgId} />
    </div>
  );
}

export default StatsMenu;