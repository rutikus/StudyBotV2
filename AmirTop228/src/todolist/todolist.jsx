import './todolist.css';
import TaskForm from './taskForm';
import TodoListTasks from './todoListTasks';
import { useState } from 'react';

function TodoList({ onBack }) {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Задача 1',
      description: 'Описание задачи 1',
      date: '2024-06-30',
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Задача 2',
      description: 'Описание задачи 2',
      date: '2024-07-15',
      isCompleted: false,
    },
  ]);


  const addTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      {
        ...newTask,
        id: Date.now(),
        isCompleted: false,
      },
    ]);
    setShowForm(false); 
  };
  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  };

  return (
    <div className="todolist-container">
      <h1>TodoList</h1>
      <button className="button Backbutton" onClick={onBack}>
        Назад
      </button>
      <button className="addButton" onClick={() => setShowForm(true)}>
        +
      </button>
      {showForm && <TaskForm onAddTask={addTask} onCancel={() => setShowForm(false)} />}
      <TodoListTasks tasks={tasks} onToggle={toggleTaskCompletion} />
    </div>
  );
}

export default TodoList;