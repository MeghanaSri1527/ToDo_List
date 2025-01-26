import React, { useState, useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import '../styles/App.css'; 

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo, completed: false, dueDate }]);
      setNewTodo('');
      setDueDate('');
    }
  };

  const toggleCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Function to check if a todo is active
  const isActive = (todo) => {
    if (!todo.dueDate) return true;
    const today = new Date();
    const due = new Date(todo.dueDate);
    const diffInDays = (due - today) / (1000 * 3600 * 24);
    return diffInDays <= 3 && !todo.completed;  // Active if due in 3 days or less
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'All') return true;
    if (filter === 'Active') return isActive(todo);
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  const isDueSoon = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffInDays = (due - today) / (1000 * 3600 * 24);
    return diffInDays <= 1;
  };

  const isOverdue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    return due < today;
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>

      <div>
        <button onClick={() => setFilter('All')}>All</button>
        <button onClick={() => setFilter('Active')}>Active</button>
        <button onClick={() => setFilter('Completed')}>Completed</button>
      </div>

      <ul>
        {filteredTodos.map((todo, index) => (
          <li
            key={index}
            className={
              todo.dueDate
                ? isOverdue(todo.dueDate)
                  ? 'due-late'
                  : isDueSoon(todo.dueDate)
                  ? 'due-soon'
                  : ''
                : ''
            }
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(index)}  // Checkbox for completing task
            />
            <span onClick={() => toggleCompletion(index)}>{todo.text}</span>
            {todo.dueDate && <span> - Due: {todo.dueDate}</span>}
            <button onClick={() => deleteTodo(index)}>
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;  // src/sheets/TodoPage.js
