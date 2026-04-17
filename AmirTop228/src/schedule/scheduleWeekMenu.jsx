import './schedule.css';
import { useState } from 'react';
import ScheduleFormCrate from './scheduleForm';

function ScheduleWeek() {
    const [activeDay, setActiveDay] = useState(null);

    const openForm = (dayIndex) => setActiveDay(dayIndex);
    const closeForm = () => setActiveDay(null);

    const days = [
    { name: 'Понедельник', index: 0 },
    { name: 'Вторник', index: 1 },
    { name: 'Среда', index: 2 },
    { name: 'Четверг', index: 3 },
    { name: 'Пятница', index: 4 },
    { name: 'Суббота', index: 5 },
    ];

  return (
    <div className="Schedule-container">
        {days.map(day => (
        <div key={day.index} className={`day ${day.name.toLowerCase()}`}>
            <h5>{day.name}</h5>
            <button onClick={() => openForm(day.index)}>+</button>
            {activeDay === day.index && (
            <div>
                <ScheduleFormCrate />
                <button onClick={closeForm} type='button'>Отмена</button>
            </div>
            )}
        </div>
        ))}
    </div>
  );
}

export default ScheduleWeek;