import './schedule.css';

function ScheduleFormCrate() {
  return (
    <div className="ScheduleForm-container">
      <form>
        <input type="text" placeholder='Название занятия'/>
        <input type="text" className="place" placeholder='Аудитория'/>
        <input type="time" className="time" placeholder='Время занятия'/>
        <button>Сохранить</button>
      </form>
    </div>
  );
}

export default ScheduleFormCrate;