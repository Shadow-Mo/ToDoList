import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck } from '@fortawesome/free-solid-svg-icons';

function ToDoItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(props.text);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    props.onEdit(props.id, editedText);
  };

  return (
    <div className="todo-item">
      {isEditing ? (
        <div className='edit-mode'>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <button onClick={handleSaveClick}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
        </div>
      ) : (
        <div className='view-mode'>
          <li>{props.text}</li>
          <div className='buttons'>
            <button className='edit-icon' onClick={handleEditClick}>
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className='delete-icon' onClick={() => props.onDelete(props.id)}>
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToDoItem;
