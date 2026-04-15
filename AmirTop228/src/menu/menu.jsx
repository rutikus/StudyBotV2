import './menu.css';

function MenuButtons({ onNavigate }) {
  return (
    <div className="buttons-container">
      <button className="button button1" onClick={() => onNavigate('schedule')}>
        Расписание занятий
      </button>
      <button className="button button2" onClick={() => onNavigate('todolist')}>Дедлайны и задачи</button>
      <button className="button button3" onClick={() => onNavigate('pomodoro')}>Таймер помодоро</button>
      <button className="button button4" onClick={() => onNavigate('stats')}>Анализ нагрузки</button>
      <button className="button button5">Нейронка</button>
    </div>
  );
}

export default MenuButtons;