import './todolist.css';

function TodoListTasks({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p>Нет задач</p>;
  }

  return (
    <div className="cmpTasks">
      {tasks.map((task) => (
        <div key={task.id} className="task" style={{ backgroundColor: task.completed ? 'green' : '#2e3640' }}>
          <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </h3>
          <p>{task.description}</p>
          <p>Дата: {task.date}</p>
          <label>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            Выполнено
          </label>
          {/* 🗑️ Кнопка удаления */}
          <button onClick={() => onDelete(task.id)} className="delete-task-btn">
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

export default TodoListTasks;