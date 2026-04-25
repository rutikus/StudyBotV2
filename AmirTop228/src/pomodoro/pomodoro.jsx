import './pomodoro.css';
import PomodoroSetings from './pomodoroSetingsForm';
import PomodoroButtons from './pomodoroTimer';

function PomodoroMenu({ onBack }) {
  return (
    <div className="Pomodoro-container">
      <h1>Помидрочик</h1>
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
      {PomodoroButtons()}
    </div>
  );
}

export default PomodoroMenu;