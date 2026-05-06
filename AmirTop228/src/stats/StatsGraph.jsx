import './stats.css';
import { useState, useEffect } from 'react';
import { supabase } from '../until/supabase';

const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function StatsGraph({ tgId }) {
  const [dayStats, setDayStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!tgId) {
      setError('Нет tgId');
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      // Получаем задачи только с created_at
      const { data: tasksData, error: tasksErr } = await supabase
        .from('todos')
        .select('created_at')
        .eq('tg_id', tgId)
        .gte('created_at', sevenDaysAgo);

      // Получаем расписание с day_id и created_at
      const { data: schedData, error: schedErr } = await supabase
        .from('Schedules')
        .select('day_id, created_at')
        .eq('tg_id', tgId)
        .gte('created_at', sevenDaysAgo);

      if (tasksErr || schedErr) {
        setError('Ошибка: ' + (tasksErr?.message || schedErr?.message));
        setLoading(false);
        return;
      }

      const tasks = Array.isArray(tasksData) ? tasksData : [];
      const sched = Array.isArray(schedData) ? schedData : [];

      const daily = Array.from({ length: 7 }, (_, i) => ({
        dayIndex: i,
        tasks: 0,
        sched: 0,
      }));

      // Задачи группируем по дням недели добавления (created_at)
      tasks.forEach(({ created_at }) => {
        const d = new Date(created_at);
        if (isNaN(d)) return;
        const jsDay = d.getDay(); // 0-Вс, 1-Пн, ..., 6-Сб
        const idx = (jsDay + 6) % 7; // преобразуем в 0-Пн, 1-Вт, ...
        if (idx >= 0 && idx < 7) daily[idx].tasks++;
      });

      // Расписание группируем по фиксированному day_id (0-Пн, 1-Вт, ...)
      sched.forEach(({ day_id }) => {
        const idx = Number(day_id);
        if (idx >= 0 && idx < 7) daily[idx].sched++;
      });

      setDayStats(daily);
      setLoading(false);
    };

    fetchStats();
  }, [tgId]);

  if (loading) return <div className="stats-loading">Загрузка...</div>;
  if (error) return <div className="stats-error">{error}</div>;
  if (!dayStats) return null;

  const totalTasks = dayStats.reduce((sum, d) => sum + d.tasks, 0);
  const totalSched = dayStats.reduce((sum, d) => sum + d.sched, 0);

  return (
    <div className="stats-block">
      <h2>Последние 7 дней</h2>
      <div className="stats-row">
        <div className="stats-card">
          <span className="stats-label">Всего задач</span>
          <span className="stats-value">{totalTasks}</span>
        </div>
        <div className="stats-card">
          <span className="stats-label">Всего занятий</span>
          <span className="stats-value">{totalSched}</span>
        </div>
      </div>

      <div className="daily-breakdown">
        {dayStats.map(day => (
          <div key={day.dayIndex} className="day-row">
            <span className="day-name">{DAY_NAMES[day.dayIndex]}</span>
            <span className="day-counts">
              {day.tasks} задач, {day.sched} пар
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsGraph;