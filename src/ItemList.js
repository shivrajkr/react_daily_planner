import React from 'react';
import { FaTrashAlt } from 'react-icons/fa'; // Importing trash icon for delete action

// Functional component to display the list of items
const ItemList = ({ items, handleCheck, handleDelete }) => {
  return (
    <ul>
      {/* Mapping through the items array to render each item */}
      {items.map((item) => (
        <li key={item.id} className="item">
          {/* Checkbox to mark an item as checked/unchecked */}
          <input
            type="checkbox"
            onChange={() => handleCheck(item.id)} // Toggle checked state
            checked={item.checked}
          />
          
          {/* Label displaying item text, strikethrough if checked */}
          <label
            style={item.checked ? { textDecoration: 'line-through' } : null}
            onDoubleClick={() => handleCheck(item.id)} // Double-click to toggle checked state
          >
            {item.item}
          </label>
          
          {/* Trash icon button to delete an item */}
          <FaTrashAlt
            onClick={() => handleDelete(item.id)} // Delete item on click
            role="button"
            tabIndex="0"
            aria-label={`Delete ${item.item}`} // Accessible label for screen readers
          />
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
