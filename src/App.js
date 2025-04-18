
import './App.css';
import Header from './Header';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import AddItem from './AddItem';
import db from './data/db.json';
import apiRequest from './apiRequest';

function App() {

  const [items, setItems] = useState(db.items);
  const API_URL = "http://localhost:3000/items";
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if(!response.ok) {throw Error("Did not received expected data");}
        const listItems = await response.json(db.json);
        setItems(listItems);
        setFetchError(false);
      } catch(err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000)
  }, [])

  const addItem = async (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setItems(listItems);

    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) => item.id === id ? {
      ...item, checked: !item.checked
    } : item);
    setItems(listItems);

    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myItem[0].checked })
    };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  }

  // const handleDelete = (id) => {
  //   const listItems = items.filter((item) => item.id !== id);
  //   setItems(listItems);
  // }

  // const handleDelete = async (id) => {
  //   try {
  //     const response = await fetch(`${API_URL}/${id}`, {
  //       method: 'DELETE',
  //     });
  
  //     if (!response.ok) throw Error('Failed to delete the item.');
  
  //     const listItems = items.filter((item) => item.id !== id);
  //     setItems(listItems);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    
    addItem(newItem);
    setNewItem("");
  }
  
  return (
    <div className="App">
      <Header title = "Grocery List"/>

      <SearchItem
         search = {search}
         setSearch = {setSearch}
      />
      
      <AddItem
         newItem = {newItem}
         setNewItem = {setNewItem}
         handleSubmit = {handleSubmit}
      />

      <main>
        {isLoading && <p>Loading Items...</p>}
        {/*{fetchError && <p style={{color: "blue"}}>{`Error: ${fetchError}`}</p>} */}
        { fetchError &&!isLoading && <Content
          items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handleCheck = {handleCheck}
          handleDelete = {handleDelete}
        />}
      </main>
      <Footer length = {items.length}/>
    </div>
  );
}

export default App;
