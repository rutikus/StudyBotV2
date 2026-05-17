import './menu.css';

function MenuButtons({ onNavigate }) {
  const handleNeuralClick = () => {
    const botUsername = 'StudyEazy_bot';

    if (window.Telegram?.WebApp?.openTelegramLink) {
      const url = `https://t.me/${botUsername}?text=%2Fstart`;
      window.Telegram.WebApp.openTelegramLink(url);
      setTimeout(() => {
        window.Telegram?.WebApp?.close();
      }, 200);
    }
    else {
      window.Telegram?.WebApp?.close();
    }
  };

  return (
    <div className="buttons-container">
      <button className="button button1" onClick={() => onNavigate('schedule')}>
        Расписание занятий
      </button>
      <button className="button button2" onClick={() => onNavigate('todolist')}>
        Дедлайны и задачи
      </button>
      <button className="button button3" onClick={() => onNavigate('pomodoro')}>
        Таймер помодоро
      </button>
      <button className="button button4" onClick={() => onNavigate('stats')}>
        Анализ нагрузки
      </button>
      <button className="button button5" onClick={handleNeuralClick}>
        Нейронка
      </button>
    </div>
  );
}

export default MenuButtons;