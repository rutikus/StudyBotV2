import './schedule.css';

function ScheduleMenu({ onBack }) {
  return (
    <div className="Schedule-container">
      <h1>Расписание</h1>
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
    </div>
  );
}

export default ScheduleMenu;