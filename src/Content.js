import React from 'react'
import './Content.css'
import ItemList from './ItemList'


const Content = ({items, handleCheck, handleDelete }) => {
   
  return (
    <>
        {items.length ? (
        <ul>
          
            <ItemList 
                 items = {items}
                 handleCheck = {handleCheck}
                 handleDelete = {handleDelete}
            />
        
        </ul>
        ) : (
          <p style={{marginTop: "2rem"}}>Your list is empty.</p>
        )}
    </>
  )
}

export default Content