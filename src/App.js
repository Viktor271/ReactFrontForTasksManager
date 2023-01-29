import {useEffect, useMemo, useState} from "react";
import TasksList from "./сomponents/TasksList";
import './styles/App.css'
import MyButton from "./сomponents/UI/button/MyButton";
import TaskForm from "./сomponents/TaskForm";
import TaskFilter from "./сomponents/TaskFilter";
import MyModal from "./сomponents/UI/MyModal/MyModal";
import {useTasks} from "./hooks/useTasks";
import TaskService from "./API/TaskService";
import Loader from "./сomponents/UI/loader/Loader";
import {useFatching} from "./hooks/useFatching";
import moment from "moment";

function App() {

    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState({ date: '', status: '', sort: '' });
    const [modal, setModal] = useState(false);
    const filteredSortTasks = useTasks(tasks, filter.sort, filter);
    const [fetchTasks, isTasksLoading, taskError] = useFatching(async () => {
        const tasks = await TaskService.getAll();
        setTasks(tasks)
    });


    useEffect(()=>{
        fetchTasks()
    },[])

    const createTask = async (newTask) => {
        await TaskService.create(newTask);
        setTasks([...tasks, newTask])
        setModal(false)
    }

    const handleDelete = async (taskId) => {
        const dueDate = new Date(tasks.find((task) => task.id === taskId).date);
        const today = new Date();
        if (new moment(dueDate) > new moment(today.setDate(today.getDate() + 6))) {
            const updatedTasks = tasks.filter((task) => task.id !== taskId);
            await TaskService.delete(taskId);
            setTasks(updatedTasks);
        }else {
            alert("Task can't be deleted as it's due date is less than 6 days from today.");
        }
    };

    const handleEdit = async (taskId, newBody, newStatus) => {
        await TaskService.update(taskId, newBody, newStatus);
        const updatedTasks = tasks.map((task) => {
            if (task.id === taskId) {
                return { ...task, body: newBody, status: newStatus };
            }
            return task;
        });
        setTasks(updatedTasks);
    };

    return (
        <div className="App">
            <h1 style={{display:"flex", justifyContent:"center", marginTop:"30px"}}>Tasks list</h1>

            <MyButton style={{marginTop: "30px"}} onClick={()=>setModal(true)}>
                Add task
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}
            >
                <TaskForm create={createTask}></TaskForm>
            </MyModal>

            <TaskFilter
                filter={filter}
                setFilter={setFilter}
            ></TaskFilter>

            {taskError &&
                <h3>Error: ${taskError}</h3>
            }
            {isTasksLoading
                ? <div style={{display:"flex", justifyContent:"center", marginTop:"60px"}}><Loader/></div>
                : <TasksList remove={handleDelete} update={handleEdit} tasks={filteredSortTasks}/>
            }
        </div>
    );


}

export default App;
