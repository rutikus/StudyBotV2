import { useEffect } from 'react';
import './App.css';
import MenuButtons from './menu/menu';

function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;

      tg.ready(); 
      tg.expand();

      console.log('✅ Telegram WebApp успешно подключён');
    } else {
      console.warn('⚠️ Запусти приложение внутри Telegram');
    }
  }, []);

  return (
    <MenuButtons/>
  );
}

export default App;