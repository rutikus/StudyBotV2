import { useState, useEffect } from 'react';
import './App.css';
import MenuButtons from './menu/menu';
import ScheduleMenu from './schedule/schedule';
import TodoList from './todolist/todolist';
import PomodoroMenu from './pomodoro/pomodoro';
import StatsMenu from './stats/stats';
import { loginWithTelegram } from './auth';

function App() {
  const [currentPage, setCurrentPage] = useState('menu');
  const [tgId, setTgId] = useState(null);          // числовой Telegram ID
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();

        // Берём Telegram ID напрямую
        const rawTgId = tg.initDataUnsafe?.user?.id;
        if (rawTgId) {
          setTgId(rawTgId);
          console.log('✅ tg_id получен:', rawTgId);
        }

        // Выполняем серверную авторизацию (для JWT)
        const result = await loginWithTelegram();
        if (!result.success) {
          console.warn('Авторизация не удалась:', result.error);
        }
      } else {
        // Тестовый режим
        setTgId(123456789);
        console.warn('🔧 Режим разработки: тестовый tg_id = 123456789');
      }
      setIsAuthReady(true);
    };

    authenticate();
  }, []);

  const navigateTo = (page) => setCurrentPage(page);
  const goBack = () => setCurrentPage('menu');

  const renderPage = () => {
    switch (currentPage) {
      case 'menu':
        return <MenuButtons onNavigate={navigateTo} />;
      case 'schedule':
        return <ScheduleMenu onBack={goBack} tgId={tgId} />;
      case 'todolist':
        return <TodoList onBack={goBack} tgId={tgId} />;
      case 'pomodoro':
        return <PomodoroMenu onBack={goBack} />;
      case 'stats':
        return <StatsMenu onBack={goBack} />;
      default:
        return <MenuButtons onNavigate={navigateTo} />;
    }
  };

  if (!isAuthReady) {
    return (
      <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Загрузка...
      </div>
    );
  }

  return <div>{renderPage()}</div>;
}

export default App;