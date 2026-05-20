import './stats.css';
import { useState, useEffect } from 'react';
import { supabase } from '../until/supabase';

const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// Возвращает день недели по московскому времени: 0=Пн, 1=Вт, ..., 6=Вс
function getMoscowDayIndex(isoString) {
  const date = new Date(isoString);
  if (isNaN(date)) return -1;

  // Переводим в московское время (UTC+3)
  const moscowDate = new Date(date.getTime() + 3 * 60 * 60 * 1000);

  // getDay() возвращает: 0=Вс, 1=Пн, 2=Вт, 3=Ср, 4=Чт, 5=Пт, 6=Сб
  const jsDay = moscowDate.getDay();

  // Преобразуем: 0(Пн)..6(Вс)
  return jsDay === 0 ? 6 : jsDay - 1;
}

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

      const { data: tasksData, error: tasksErr } = await supabase
        .from('todos')
        .select('created_at')
        .eq('tg_id', tgId)
        .gte('created_at', sevenDaysAgo);

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

      // Задачи — группируем по дате добавления (created_at → локальный день)
      tasks.forEach(({ created_at }) => {
        const dayIdx = getMoscowDayIndex(created_at);
        if (dayIdx >= 0 && dayIdx < 7) daily[dayIdx].tasks++;
      });

      // Пары — группируем по выбранному дню (day_id)
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
  const maxTotal = Math.max(...dayStats.map(d => d.tasks + d.sched), 1);

  return (
    <div className="stats-block">
      <h2>Статистика за 7 дней</h2>
      
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

      <div className="chart-label">Нагрузка по дням</div>
      <div className="chart-area">
        {dayStats.map(day => {
          const total = day.tasks + day.sched;
          const barHeight = total === 0 ? 4 : Math.max(8, (total / maxTotal) * 100);
          return (
            <div key={day.dayIndex} className="chart-col">
              <div 
                className="bar" 
                style={{ height: `${barHeight}%`, minHeight: '4px' }}
              >
                {total > 0 && <span className="bar-val">{total}</span>}
              </div>
              <div className="chart-day">{DAY_NAMES[day.dayIndex]}</div>
            </div>
          );
        })}
        <div className="chart-baseline"></div>
      </div>

      <div className="daily-breakdown">
        {dayStats.map(day => (
          <div key={day.dayIndex} className="day-row">
            <span className="day-name">{DAY_NAMES[day.dayIndex]}</span>
            <span className="day-counts">
              📋 {day.tasks} задач &nbsp;|&nbsp; 📚 {day.sched} занятий
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatsGraph;