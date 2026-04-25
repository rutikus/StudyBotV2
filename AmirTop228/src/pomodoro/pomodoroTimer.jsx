import './pomodoro.css';
import { useState, useEffect, useRef, useCallback } from 'react';

function PomodoroButtons() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [activeTimerId, setActiveTimerId] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState('work');

  const intervalRef = useRef(null);
  const phaseRef = useRef(phase);
  const activeTimerIdRef = useRef(activeTimerId);
  phaseRef.current = phase;
  activeTimerIdRef.current = activeTimerId;

  const timers = [
    { id: 1, work: 25, break: 5, label: '25:00/5:00 минут' },
    { id: 2, work: 50, break: 10, label: '50:00/10:00 минут' },
    { id: 3, work: 90, break: 25, label: '90:00/25:00 минут' },
    { id: 4, work: 120, break: 40, label: '120:00/40:00 минут' }
  ];

  const tick = useCallback(() => {
    setTimeLeft(prev => {
      if (prev <= 1) {
        const currentTimer = timers.find(t => t.id === activeTimerIdRef.current);
        if (!currentTimer) {
          stopTimer();
          return 0;
        }
        if (phaseRef.current === 'work') {
          setPhase('break');
          return currentTimer.break * 60;
        } else {
          stopTimer();
          alert('🍅 Помидорка завершена!');
          return 0;
        }
      }
      return prev - 1;
    });
  }, [timers]);

  useEffect(() => {
    if (isTimerRunning) {
      intervalRef.current = setInterval(tick, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTimerRunning, tick]);

  const startTimer = (id) => {
    const timer = timers.find(t => t.id === id);
    if (!timer) return;
    setActiveTimerId(id);
    setPhase('work');
    setTimeLeft(timer.work * 60);
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
    setActiveTimerId(null);
    setTimeLeft(0);
    setPhase('work');
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getDisplayContent = (timer) => {
    if (isTimerRunning && activeTimerId === timer.id) {
      return (
        <>
          <p>{phase === 'work' ? 'Работа' : 'Перерыв'}</p>
          <h2>{formatTime(timeLeft)}</h2>
          <button onClick={stopTimer}>Остановить</button>
        </>
      );
    }
    return (
      <>
        <h2>{timer.label}</h2>
        <button onClick={() => startTimer(timer.id)}>Старт</button>
      </>
    );
  };

  return (
    <div className="Pomodoro-buttons">
      <h1>Работа/Перерыв</h1>
      <div className='but'>
        {timers.map(timer => (
          <div key={timer.id} className='TimeSet'>
            {getDisplayContent(timer)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PomodoroButtons;