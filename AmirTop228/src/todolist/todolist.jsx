import './todolist.css';
import TaskForm from './taskForm';
import TodoListTasks from './todoListTasks';
import { useState, useEffect } from 'react';
import { supabase } from '../until/supabase';

function TodoList({ onBack, tgId }) {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addError, setAddError] = useState(null);

  const fetchTasks = async () => {
    if (!tgId) return;
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .eq('tg_id', tgId)
      .order('created_at', { ascending: false });

    if (error) {
      setAddError('Ошибка загрузки: ' + error.message);
    } else {
      setTasks(data || []);
      setAddError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [tgId]);

  const addTask = async (newTask) => {
    setAddError(null);
    if (!tgId) {
      setAddError('Нет tgId. Скорее всего, не авторизован Telegram.');
      return;
    }
    if (!newTask.title.trim()) {
      setAddError('Введите название задачи');
      return;
    }

    const { error } = await supabase
      .from('todos')
      .insert({
        title: newTask.title,
        description: newTask.description || '',
        date: newTask.date || null,
        tg_id: tgId,
        completed: false
      });

    if (error) {
      setAddError('Ошибка при добавлении: ' + error.message + ' (код: ' + error.code + ')');
    } else {
      setAddError(null);
      fetchTasks();
      setShowForm(false);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    const { error } = await supabase
      .from('todos')
      .update({ completed: !task.completed })
      .eq('id', taskId);
    if (!error) fetchTasks();
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

      {addError && (
        <div style={{ background: 'red', color: 'white', padding: '10px', marginBottom: '10px' }}>
          {addError}
        </div>
      )}

      {showForm && <TaskForm onAddTask={addTask} onCancel={() => setShowForm(false)} />}
      {loading ? <p>Загрузка...</p> : <TodoListTasks tasks={tasks} onToggle={toggleTaskCompletion} />}
    </div>
  );
}

export default TodoList;