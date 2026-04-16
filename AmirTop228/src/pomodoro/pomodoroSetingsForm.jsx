import './pomodoro.css';

function PomodoroSetings() {
  return (
    <div className="Pomodoro-setings">
        <h3>Помидор</h3>
        <p>Введите время помидора от 1 до 60 минут</p>
        <input placeholder='1-60' type='number' min="1" max="60"/>
        <h3>Перерыв</h3>
        <p>Введите время помидора от 1 до 60 минут</p>
        <input placeholder='1-60' type='number' min="1" max="60"/>
        <button >Сохранить настройки</button>
    </div>
  );
}

export default PomodoroSetings;