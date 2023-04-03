import React from "react";
import { FaSave } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';


export default function InputForm({ children, items, setItems, setShowInputForm }) {
    const notify = () => toast.success('New task added!');

    const [todoItem, setTodoItem] = React.useState('');
    function handleNewTodo(event) {
        event.preventDefault();
        const nextItems = [...items];
        const newItem = { "text": todoItem, "id": crypto.randomUUID(), "done": false }
        nextItems.push(newItem);
        console.log('input text');
        setItems(nextItems);
        notify();
        setShowInputForm(false)
    }
    return (
        <form onSubmit={handleNewTodo}>
            <div className="input-group mb-3">
                <input autoFocus type="text" placeholder="add new todo item, eg. run 5k today" className="form-control" value={todoItem} onChange={event => setTodoItem(event.target.value)}></input>
                <button style={{background: "#00ADB5", border: "none", color: "white"}} className="btn btn-outline-secondary"><FaSave /></button>
            </div>
        </form>

    );
};
