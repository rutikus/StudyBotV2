import './todolist.css';

function TodoList({ onBack }) {
  return (
    <div className="todolist-container">
      <button className="button Backbutton" onClick={() => onBack()}>
        Назад
      </button>
      <a>Hello</a>
    </div>
  );
}

export default TodoList;