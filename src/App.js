import { useEffect, useState } from 'react';
import './App.css';
import ToDoItem from './ToDoItem';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

library.add(faTrash);

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState(()=> {
    // Initialize the state with tasks from local storage or an empty array
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    return storedTasks;
  });

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(items));
  }, [items]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItems() {
    if (inputText.trim() !== '') {
      setItems(prevItems => {
        return [...prevItems, inputText]
      });
      setInputText("");
    }
  }

  function deleteItem(id) {
    setItems(prevItems => {
      return prevItems.filter((items, index) => {
        return index !== id;
      });
    });
  }

  function editItem(id, newText) {
    setItems((prevItems) => {
      return prevItems.map((item, index) => {
        if (index === id) {
          return newText;
        }
        return item;
      });
    });
  }

  return (
    <div className="container">
      <div className='heading'>
        <h1>To do List</h1>
      </div>
      <div className='form'>
        <input onChange={handleChange} type='text' placeholder="Enter your task" value={inputText} />
        <button onClick={addItems}><span>Add</span></button>
      </div>
      <div>
        <ul>
          {items.map((todoItem, index) => (
            <ToDoItem
              key={index}
              id={index}
              text={todoItem}
              onDelete={deleteItem}
              onEdit={editItem}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
