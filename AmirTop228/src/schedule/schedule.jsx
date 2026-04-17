import './schedule.css';
import ScheduleWeek from './scheduleWeekMenu';

function ScheduleMenu({ onBack }) {
  return (
    <div className="Schedule-container">
      <h1>Расписание</h1>
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
      {ScheduleWeek()}
    </div>
  );
}

export default ScheduleMenu;