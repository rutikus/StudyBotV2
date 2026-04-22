import './schedule.css';
import ScheduleWeek from './scheduleWeekMenu';

function ScheduleMenu({ onBack, tgId }) {
  console.log('📅 ScheduleMenu получил tgId:', tgId);
  return (
    <div className="Schedule-container">
      <h1>Расписание</h1>
      <button className="button Backbutton" onClick={onBack}>← Назад</button>
      <ScheduleWeek tgId={tgId} />
    </div>
  );
}

export default ScheduleMenu;