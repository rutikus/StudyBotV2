
function HelpMenu({ onBack }) {
  return (
    <div className="Stats-container">
      <h1>Статистика</h1>
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
      <h1>Шмоукаю дрип</h1>
    </div>
  );
}

export default HelpMenu;