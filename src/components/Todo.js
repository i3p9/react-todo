import TodoCard from './TodoCard';
import styles from './Todo.module.css'
import React from 'react';
import InputForm from './InputForm';
import {FaPlusSquare} from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

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

    const doneItems = items.filter((items) => {
        return items.done == true;
    });

    console.log(`doneItems len: ${doneItems.length}`);

    const pendingItems = items.filter((items) => {
        return items.done == false;
    });

    const notify = () => toast('Great! All tasks are completed!')

    return (
        <div className={styles.container}>
            <div className='item1'>
                <button className={styles.addNewButton} onClick={addNewItem}>Add New <FaPlusSquare/></button>
            </div>
            {showInputForm &&
                <div className='item3' style={{ padding: '10px', transition: "right 1s ease-in-out" }}>
                    <InputForm setShowInputForm={setShowInputForm} items={items} setItems={setItems}></InputForm>
                </div>
            }
            <div className='item2'>
                <div id="tasks">
                    {pendingItems.map((item) => {
                        return <TodoCard editing={false} items={items} setItems={setItems} todoId={item.id} key={item.id}>{item.text}</TodoCard>
                    })}
                </div>
            </div>
            {doneItems.length >= 1 ? <p className={styles.doneText}>Completed Items</p> : ""}
            <div className='item2'>
                <div id="tasks">
                    {doneItems.map((item) => {
                        return <TodoCard done={item.done} editing={false} items={items} setItems={setItems} todoId={item.id} key={item.id}>{item.text}</TodoCard>
                    })}
                </div>
            </div>

            {items.length < 1 ? <p style={{color: "#EEEEEE"}}>No tasks available, create one!</p> : ""}
        </div>
    )
}
