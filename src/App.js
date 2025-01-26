import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './sheets/Home';  
import TodoPage from './sheets/TodoPage';  

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* Home Page */}
        <Route path="/todos" element={<TodoPage />} />  {/* Todo List Page */}
      </Routes>
    </Router>
  );
}

export default App;
