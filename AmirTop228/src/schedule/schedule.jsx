import './schedule.css';

function ScheduleMenu({ onBack }) {
  return (
    <div className="Schedule-container">
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
    </div>
  );
}

export default ScheduleMenu;