import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import React from 'react';
import './App.css';
import Todo from './components/Todo';

function App() {
  return (
    <div className="App">
      <Todo></Todo>
      <Toaster position="bottom-right" />
  </div>
  );
}

export default App;
