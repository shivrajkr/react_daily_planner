import React from 'react'
import { FaPlus } from 'react-icons/fa';  // Importing plus icon from react-icons
import { useRef } from 'react'  // Importing useRef for managing input focus

// Functional component for adding a new item
const AddItem = ({ newItem, setNewItem, handleAdd }) => {
    const inputRef = useRef();  // useRef to manage input field reference

    return (
        <form className='addForm' onSubmit={handleAdd}>  {/* Form for adding new items */}
            <label htmlFor='addItem'>Add Item</label>  {/* Label for accessibility */}
            
            <input 
                id='addItem'
                type='text'
                placeholder='Add Item'  // Placeholder text inside input
                required  // Ensures input cannot be empty
                ref={inputRef}  // Assigning input reference
                value={newItem}  // Controlled component with state binding
                onChange={(e) => setNewItem(e.target.value)}  // Updating state when typing
            />
            
            <button 
                type='submit'
                onClick={() => inputRef.current.focus()}  // Setting focus back to input on click
                aria-label='Add Item'  // Accessibility label
            >
                <FaPlus/>  {/* Plus icon button */}
            </button>
        </form>
    );
}

export default AddItem;  // Exporting the component