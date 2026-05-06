import './todolist.css';

function TodoListTasks({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return <p>Нет задач</p>;
  }

  return (
    <div className="cmpTasks">
      {tasks.map((task) => (
        <div key={task.id} className="task" style={{ backgroundColor: task.completed ? 'green' : 'white' }}>
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
        </div>
      ))}
    </div>
  );
}

export default TodoListTasks;