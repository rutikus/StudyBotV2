import './pomodoro.css';

function PomodoroMenu({ onBack }) {
  return (
    <div className="Pomodoro-container">
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
      <a>its pomodoro</a>
    </div>
  );
}

export default PomodoroMenu;