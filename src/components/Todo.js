import TodoCard from './TodoCard';
import styles from './Todo.module.css'
import React from 'react';
import InputForm from './InputForm';
import {FaPlusSquare} from "react-icons/fa";

export default function Todo() {
    const [items, setItems] = React.useState(() => {
        return JSON.parse(localStorage.getItem('items')) || []
      });

    const [showInputForm, setShowInputForm] = React.useState(false)
    console.log(items);

      React.useEffect(() => {
        localStorage.setItem('items', JSON.stringify(items));
      }, [items]);

    function addNewItem() {
        console.log("here");
        if (showInputForm == true) {
            setShowInputForm(false);
        } else {
            setShowInputForm(true);
        }
    }

    return (
        <div className={styles.container}>
            <div className='item1'>
                <button className={styles.addNewButton} onClick={addNewItem}>Add New <FaPlusSquare/></button>
            </div>
            {showInputForm &&
                <div className='item3' style={{ 'padding': '10px' }}>
                    <InputForm setShowInputForm={setShowInputForm} items={items} setItems={setItems}>Add New</InputForm>
                </div>
            }
            <div className='item2'>
                <div id="tasks">
                    {items.map((item) => {
                        return <TodoCard editing={false} items={items} setItems={setItems} todoId={item.id} key={item.id}>{item.text}</TodoCard>
                    })}
                </div>
            </div>
            {items.length < 1 ? <p style={{color: "#EEEEEE"}}>No tasks available, create one!</p> : ""}
        </div>
    )
}
