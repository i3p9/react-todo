import * as React from 'react';
import styles from './TodoCard.module.css'
import { FaEdit, FaTrashAlt, FaSave, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import { icons } from 'react-icons';


export default function TodoCard({ children, todoId, items, setItems, editing, done }) {
    const notifyEdited = () => toast.success('Task Edited!');
    const notifyDeleted = () => toast('Task Deleted!',{icon: '🗑️'});
    const notifyMarked = () => toast.success('Marking as Complete');
    const notifyUnmarked = () => toast.success('Marking as Incomplete');


    const [isChecked, setIsChecked] = React.useState(done);
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

    function handleMarkAsDone(event) {
        setIsChecked(!isChecked);
        const nextItems = [...items];
        nextItems.forEach((item) => {
            if (item.id === todoId) {
                item.done = !isChecked;
            }
        });
        setItems(nextItems);
        if (isChecked) {
            notifyUnmarked()
         } else {
            notifyMarked()
         }
    }

    const viewMode = (
        <div className={styles.task}>
            <button onClick={handleMarkAsDone} className={styles.doneIcon}>
                {done ? <FaCheckCircle size='2em' /> : <FaRegCircle size='2em' />}
            </button>

            <div className={isChecked ? styles.tasknameDone : styles.taskname}>
                {children}
            </div>
            <button onClick={handleEdit} className={styles.icons}>
                <FaEdit />
            </button>
            <button onClick={handleDeletion} className={styles.icons}>
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
                <button className={styles.icons}>
                    <FaSave />
                </button>
            </div>
        </form>
    );

    return (
        (editMode == false) ? viewMode : editModePage
    )

}
