import './todolist.css';
import { useState } from 'react';

function TaskForm({ onAddTask, onCancel }) {
  const [task, setTask] = useState({
    title: '',
    description: '',
    date: '',
  });

  const handleSubmit = () => {
  if (!task.title.trim()) {
    window.Telegram?.WebApp?.showAlert?.('Введите название задачи');
    return;
  }
  onAddTask(task);
};

  return (
    <div className="cmpTaskForm">
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          className="TaskInput title"
          placeholder="Название"
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          className="TaskInput description"
          placeholder="Описание"
          rows="3"
          maxLength="100"
          cols="27"
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <input
          className="TaskInput"
          placeholder="Дата"
          type="date"
          onChange={(e) => setTask({ ...task, date: e.target.value })}
        />
        <button type="button" onClick={handleSubmit}>
          Сохранить
        </button>
        <button type="button" onClick={onCancel}>
          Отмена
        </button>
      </form>
    </div>
  );
}

export default TaskForm;