import './pomodoro.css';
import PomodoroSetings from './pomodoroSetingsForm';

function PomodoroMenu({ onBack }) {
  return (
    <div className="Pomodoro-container">
      <h1>Помидрочик</h1>
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
      {PomodoroSetings()}
    </div>
  );
}

export default PomodoroMenu;