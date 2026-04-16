import './todolist.css';

function TodoListTasks({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return <p>Нет задач</p>;
  }

  return (
    <div className="cmpTasks">
      {tasks.map((task) => (
        <div key={task.id} className="task">
          <h3 style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
            {task.title}
          </h3>
          <p>{task.description}</p>
          <p>Дата: {task.date}</p>
          <label>
            <input
              type="checkbox"
              checked={task.isCompleted}
              onChange={() => onToggle(task.id)}
            />
            Выполнено
          </label>
        </div>
      ))}
    </div>
  );
}

export default TodoListTasks;