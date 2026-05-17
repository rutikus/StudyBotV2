import './pomodoro.css';
import PomodoroButtons from './pomodoroTimer';

function PomodoroMenu({ onBack }) {
  return (
    <div className="Pomodoro-container">
      <h1>Помидорчик</h1>
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
      {PomodoroButtons()}
    </div>
  );
}

export default PomodoroMenu;