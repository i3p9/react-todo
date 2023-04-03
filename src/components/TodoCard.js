import * as React from 'react';
import styles from './TodoCard.module.css'
import { FaEdit, FaTrashAlt, FaSave } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';


export default function TodoCard({ children, todoId, items, setItems, editing }) {
    const notifyEdited = () => toast('Task Edited!');
    const notifyDeleted = () => toast('Task Deleted!');


    const [editMode, setEditMode] = React.useState(editing);
    const [todoItem, setTodoItem] = React.useState(children);

    function handleDeletion() {
        console.log('handle delete');
        console.log(todoId);
        const nextItems = [...items];
        const withRemovedTodo = nextItems.filter(items => {
            return items.id != todoId;
        })
        setItems(withRemovedTodo);
        notifyDeleted();
    }

    function handleEdit() {
        console.log('editing?');
        setEditMode(true);
        // return(
        //     <EditTodoCard items={items} setItems={setItems} todoId={todoId}>{children}</EditTodoCard>
        // )
    }

    function saveEdited(event) {
        console.log('saving edited stuff');
        const nextItems = [...items];
        nextItems.forEach((item) => {
            if (item.id === todoId) {
                item.text = todoItem;
            }
        });
        setItems(nextItems);
        setEditMode(false);
        notifyEdited();

    }

    const viewMode = (
        <div className={styles.task}>
            <div className={styles.taskname}>
                {children}
            </div>
            <button onClick={handleEdit} className={styles.delete}>
                <FaEdit />
            </button>
            <button onClick={handleDeletion} className={styles.delete}>
                <FaTrashAlt />
            </button>
        </div>

    );

    const editModePage = (
        <form onSubmit={saveEdited}>
            <div className={styles.task}>
                <input className={styles.editForm} id="taskname" value={todoItem}
                    onChange={event => setTodoItem(event.target.value)}>
                </input>
                <button className={styles.delete}>
                    <FaSave />
                </button>
            </div>
        </form>
    );

    return (
        (editMode == false) ? viewMode : editModePage
    )

}
