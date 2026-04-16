import { supabase } from './until/supabase';

/**
 * Аутентифицирует пользователя через Telegram Mini App
 * @returns {Promise<Object>} Объект с данными пользователя или ошибкой
 */
export async function loginWithTelegram() {
  try {
    // 1. Получаем initData из Telegram WebApp
    const initData = window.Telegram?.WebApp?.initData;
    
    if (!initData) {
      throw new Error('Не удалось получить данные от Telegram. Откройте приложение внутри мессенджера.');
    }

    // 2. Отправляем initData в Edge Function Supabase
    const response = await fetch('https://efjofnfyceiuwjqkvxcb.supabase.co/functions/v1/telegram-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ initData }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Ошибка аутентификации');
    }

    const { access_token, user_id, telegram_id } = await response.json();

    // 3. Устанавливаем сессию Supabase
    const { error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token: '', // В нашем подходе refresh_token не используется
    });

    if (sessionError) throw sessionError;

    console.log('✅ Пользователь успешно аутентифицирован!');
    console.log('Telegram ID:', telegram_id);
    console.log('Supabase User ID:', user_id);

    return { success: true, user_id, telegram_id };

  } catch (error) {
    console.error('❌ Ошибка входа:', error.message);
    return { success: false, error: error.message };
  }
}