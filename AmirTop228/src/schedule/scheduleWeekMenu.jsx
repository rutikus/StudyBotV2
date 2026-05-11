import './schedule.css';
import { useState, useEffect } from 'react';
import ScheduleFormCrate from './scheduleForm';
import { supabase } from '../until/supabase';

function ScheduleWeek({ tgId }) {
  const [activeDay, setActiveDay] = useState(null);
  const [scheduleItems, setScheduleItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const days = [
    { name: 'Понедельник', id: 0 },
    { name: 'Вторник', id: 1 },
    { name: 'Среда', id: 2 },
    { name: 'Четверг', id: 3 },
    { name: 'Пятница', id: 4 },
    { name: 'Суббота', id: 5 },
  ];

  const fetchSchedule = async () => {
    console.log('🔵 fetchSchedule tgId:', tgId);
    if (!tgId) {
      console.warn('⏸️ fetchSchedule: tgId отсутствует');
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('Schedules')
      .select('*')
      .eq('tg_id', tgId)
      .order('start_time');

    if (error) {
      console.error('❌ Ошибка загрузки:', error);
    } else {
      console.log('✅ Загружено записей:', data?.length || 0);
      setScheduleItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSchedule();
  }, [tgId]);

  const openForm = (dayId) => setActiveDay(dayId);
  const closeForm = () => setActiveDay(null);

  const handleSave = async (formData) => {
    console.log('🔴 handleSave formData:', formData);
    
    if (!tgId) {
      alert('Не удалось определить пользователя (tgId отсутствует)');
      return;
    }

    if (!formData.title?.trim()) {
      alert('Введите название занятия');
      return;
    }

    const payload = {
      day_id: formData.day_id,
      title: formData.title.trim(),
      description: formData.description?.trim() || '',
      start_time: formData.start_time,
      tg_id: Number(tgId)
    };

    console.log('📤 Отправляем payload:', payload);

    const { error } = await supabase
      .from('Schedules')
      .insert(payload);

    if (error) {
      console.error('❌ Ошибка сохранения:', error);
      alert(`Ошибка: ${error.message} (код: ${error.code})`);
    } else {
      console.log('✅ Занятие успешно сохранено');
      await fetchSchedule();
      closeForm();
    }
  };

  // ✨ Функция удаления занятия
  const handleDelete = async (id) => {
    if (!confirm('Удалить это занятие?')) return;

    const { error } = await supabase
      .from('Schedules')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Ошибка удаления:', error);
      alert('Не удалось удалить занятие');
    } else {
      console.log('🗑️ Занятие удалено');
      fetchSchedule(); // обновляем список
    }
  };

  const getItemsForDay = (dayId) => {
    if (!scheduleItems || scheduleItems.length === 0) return [];
    return scheduleItems.filter(item => item.day_id === dayId);
  };

  return (
    <div className="Schedule-week">
      {loading && <div className="loading">Загрузка расписания...</div>}
      
      {days.map(day => (
        <div key={day.id} className={`day ${day.name.toLowerCase()}`}>
          <h5>{day.name}</h5>
          <button onClick={() => openForm(day.id)}>+</button>

          <div className="schedule-items">
            {getItemsForDay(day.id).length === 0 ? (
              <p className="empty-day">—</p>
            ) : (
              getItemsForDay(day.id).map(item => (
                <div key={item.id} className="schedule-item">
                  <div className="schedule-item-info">
                    <span><strong>{item.title}</strong></span>
                    <span>{item.start_time?.slice(0, 5)}</span>
                    {item.description && <small>{item.description}</small>}
                  </div>
                  {/* 🗑️ Кнопка удаления */}
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="delete-btn"
                    title="Удалить занятие"
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>

          {activeDay === day.id && (
            <div className="form-overlay">
              <ScheduleFormCrate
                dayId={day.id}
                onSave={handleSave}
              />
              <button onClick={closeForm} type="button" className="cancel-btn">Отмена</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ScheduleWeek;