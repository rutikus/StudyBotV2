import { useState, useEffect } from 'react';
import './App.css';
import MenuButtons from './menu/menu';
import ScheduleMenu from './schedule/schedule';
import TodoList from './todolist/todolist';
import PomodoroMenu from './pomodoro/pomodoro';
import StatsMenu from './stats/stats';
import { loginWithTelegram } from './auth'; // <-- Импорт функции авторизации
import { supabase } from './until/supabase';

const getUserIIds = async () => {
  const { data, error } = await supabase
    .from('Users') // название таблицы
    .select('user_id')   // можно перечислить поля: 'id, title, completed'
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Ошибка загрузки:', error);
  } else {
    console.log('Данные:', data);
    // обновить состояние компонента
  }
};


function App() {
  const [currentPage, setCurrentPage] = useState('menu');
  const [userId, setUserId] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false); // <-- Состояние готовности авторизации

  useEffect(() => {
    const authenticate = async () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();

        // Выполняем авторизацию через Supabase
        const result = await loginWithTelegram();
        if (result.success) {
          setUserId(result.user_id);
        } else {
          console.warn('Авторизация не удалась:', result.error);
          // Можно показать сообщение пользователю, если нужно
        }
      } else {
        console.warn('⚠️ Запусти приложение внутри Telegram');
      }
      setIsAuthReady(true); // Авторизация завершена (успешно или с ошибкой)
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
        return <ScheduleMenu onBack={goBack} userId={userId} />;
      case 'todolist':
        return <TodoList onBack={goBack}  userId={userId}/>;
      case 'pomodoro':
        return <PomodoroMenu onBack={goBack} />;
      case 'stats':
        return <StatsMenu onBack={goBack} />;
      default:
        return <MenuButtons onNavigate={navigateTo} />;
    }
  };

  // Показываем загрузку, пока авторизация не завершена
  if (!isAuthReady) {
    return (
      <div style={{ color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Загрузка...
      </div>
    );
  }

  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;