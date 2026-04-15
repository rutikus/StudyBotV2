import './menu.css';
function MenuButtons() {
  
  return (
    <div className="buttons-container">
      <button className='button button1'>Расписание занятий</button>
      <button className='button button2'>Дедлайны и задачи</button>
      <button className='button button3'>Таймер помодоро</button>
      <button className='button button4'>Анализ нагрузки</button>
      <button className='button button5'>Нейронка</button>
    </div>
  );
}

export default MenuButtons;