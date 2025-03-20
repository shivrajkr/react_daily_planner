import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import Content from './Content';

function App() {
  //const API_URL = "http://localhost:3005/items"; // API URL for JSON Server
  const API_URL = "https://67dbad201fd9e43fe4756442.mockapi.io/items/items"; // API URL for JSON Server
  const [items, setItems] = useState([]); // State to store the list of items
  const [searchItem, setSearchItem] = useState(''); // State for search input
  const [newItem, setNewItem] = useState(''); // State for new item input
  const [error, setError] = useState(null); // State for handling errors
  const [loading, setLoading] = useState(true); // State for loading status

  // Fetch items from API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw Error("Data not found"); // Handle response errors
        }
        const data = await response.json();
        console.log("Printing JSON data", data);
        setItems(data); // Set fetched items to state
        setError(null); // Reset error state
      } catch (Err) {
        setError(Err.message); // Set error message if fetch fails
      } finally {
        setLoading(false); // Stop loading after fetch completes
      }
    };
    fetchData();
  }, []);

  // Function to add a new item
  const handleAdd = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create a new item object
    const id = items.length ? (items[items.length - 1].id + 1) : "1"; // Auto-generate ID
    const item = newItem;
    const formNewItem = { id: id, checked: false, item: item };
    // Update the state with the new list
    const newList = [...items, formNewItem];
    setItems(newList);

    // Send a POST request to add the item to the database
    const Options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formNewItem)
    };
    const result = await fetch(API_URL, Options);
    
    if (result) setError(result.message); // Handle API response error

    // Clear the input field after adding the item
    setNewItem('');
  };

  // Function to toggle the checked state of an item
  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    // Find the updated item
    const myItem = listItems.filter((item) => item.id === id);

    // Send a PATCH request to update the checked state
    const updateOptions = {
      method: 'PUT', // Change PATCH to PUT
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await fetch(reqUrl, updateOptions);
    if (result) setError(result.message);
    
  };

  // Function to delete an item
  const handleDelete = async (id) => {
    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    
    // Send a DELETE request to remove the item
    const result = await fetch(reqUrl, deleteOptions);
    if (result) setError(result.message);

    // Update the state after deletion
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);
  };

  return (
    <div className="App">
      <Header title="Daily Planner" /> {/* Header Component */}

      {/* Form to Add a New Item */}
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleAdd={handleAdd}
      />

      {/* Search Bar */}
      <SearchItem 
        searchItem={searchItem}
        setSearchItem={setSearchItem}
      />

      <main>
        {/* Show loading message while fetching data */}
        {loading && <p>Data loading</p>}

        {/* Show error message if there's an error */}
        {error && <p>{`Error: ${error}`}</p>}

        {/* Show content when data is available */}
        {!loading && !error && (
          <Content 
            items={items.filter(item => ((item.item).toLowerCase()).includes(searchItem.toLowerCase()))}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>

      {/* Footer Component */}
      <Footer length={items.length} />
    </div>
  );
}

export default App;
