import React, {useState} from 'react';
import input from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import {useForm} from "react-hook-form";
import {InputLabel, Input} from "@mui/material";


const TaskForm = ({create}) => {

    const [task, setTask] = useState({title: '', body: '', status: '', date:''});

    const {
        register, formState: {
            errors, isValid
        }, handleSubmit, reset
    } = useForm();

    const onSubmit = () => {
        const newTask = {
            ...task
        }
        create(newTask)

        setTask({title: '', body: '', status: '', date:''})
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit) }>
            <InputLabel>Task name</InputLabel>
                <Input
                    {...register("title", {required: "this field is required"})}
                    value={task.title}
                    onChange={e => setTask({...task, title: e.target.value})}
                    type="text"
                    placeholder="Task name"

                ></Input>

                <div style={{height:40}}>{errors?.title && <p>{errors?.title?.message || "Error!"}</p>}</div>
            <InputLabel>Task description</InputLabel>
                <Input
                    {...register("body", {required: "this field is required"})}
                    value={task.body}
                    onChange={e => setTask({...task, body: e.target.value})}
                    type="text"
                    placeholder="Task description"

                ></Input>

                <div style={{height:40}}>{errors?.body && <p>{errors?.body?.message || "Error!"}</p>}</div>
            <InputLabel>Task status</InputLabel>
                <select
                    {...register("status", {required: "this field is required"})}
                    onChange={(e) => setTask({...task, status: e.target.value})
                }>
                    <option value="" selected disabled hidden>Choose status</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="in progress">In Progress</option>
                </select>

            <div style={{height:40}}>{errors?.status && <p>{errors?.status?.message || "Error!"}</p>}</div>
            <InputLabel>Task deadline</InputLabel>
                <input
                    {...register("date", {required: "this field is required"})}
                    type="date"
                    onChange={(e) => setTask({...task, date: e.target.value})}
                />

            <div style={{height:40}}>{errors?.date && <p>{errors?.date?.message || "Error!"}</p>}</div>

            <MyButton type="submit">Create task</MyButton>

        </form>
    );
};

export default TaskForm;