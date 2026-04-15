import { useState, useEffect } from 'react';
import './App.css';
import MenuButtons from './menu/menu';
import ScheduleMenu from './schedule/schedule';
import TodoList from './todolist/todolist';
import PomodoroMenu from './pomodoro/pomodoro';
import StatsMenu from './stats/stats';

function App() {
  const [currentPage, setCurrentPage] = useState('menu');

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready();
      tg.expand();
      console.log('Telegram WebApp успешно подключён');
    } else {
      console.warn('Запусти приложение внутри Telegram');
    }
  }, []);

  const navigateTo = (page) => setCurrentPage(page);
  const goBack = () => setCurrentPage('menu');

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuButtons onNavigate={navigateTo} />;
      case 'schedule':
        return <ScheduleMenu onBack={goBack} />;
      case 'todolist':
        return <TodoList onBack={goBack} />;
      case 'pomodoro':
        return <PomodoroMenu onBack={goBack} />;
      case 'stats':
        return <StatsMenu onBack={goBack} />;
      default:
        return <MenuButtons onNavigate={navigateTo} />;
    }
  };

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;