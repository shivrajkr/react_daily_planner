import React from 'react';
import ItemList from './ItemList';

// Functional component to display the list of items
const Content = ({ items, handleCheck, handleDelete }) => {
  return (
    <>
      {/* Check if there are items in the list */}
      {items.length ? (
        <ItemList
          items={items}
          handleCheck={handleCheck} // Function to toggle checked state
          handleDelete={handleDelete} // Function to delete an item
        />
      ) : (
        // Display message when the list is empty
        <p style={{ marginTop: '10rem' }}>Your list is empty.</p>
      )}
    </>
  );
};

export default Content;
