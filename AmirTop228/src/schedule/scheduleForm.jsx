import './schedule.css';
import { useState } from 'react';

function ScheduleFormCrate({ dayId, onSave }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('09:00');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      day_id: dayId,
      title,
      description,
      start_time: startTime
    });
  };

  return (
    <div className="ScheduleForm-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Название занятия"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Описание / Аудитория"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
}

export default ScheduleFormCrate;