import { useState } from "react";
import './Content2.css';

const Content2 = () => {

    const [name, setName] = useState("Dave");
    const [count, setCount] = useState(0);

    const handleNameChange = () => {
        const names = ["Bob", "Kevin", "Dave"];
        const int = Math.floor(Math.random() * 3);
        setName(names[int]);
    }

    const handleClick = () => {
        setCount(count + 1);
        console.log(count);

    }
    const handleClick2 = (name) => {
        console.log(count);

    }
    const handleClick3 = (e) => {
        console.log(e);

    }
  return (
    <main>
        <p onDoubleClick={handleClick}>
            Hello {name}!
        </p>
        <button onClick={handleNameChange}>Change Name</button><br></br>
        <button onClick={handleClick}>Click It</button> 
        <button onClick={handleClick2}>Click It</button>
        {/*<button onClick={(e) => handleClick3(e.target.textContent)}>Click It</button> */}
    </main>
  )
}

export default Content2