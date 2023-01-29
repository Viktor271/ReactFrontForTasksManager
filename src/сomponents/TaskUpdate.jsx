import React, {useState} from 'react';
import input from "./UI/input/MyInput";
import {useForm} from "react-hook-form";
import {InputLabel, Input} from "@mui/material";
import MyButton from "./UI/button/MyButton";

const TaskUpdate = ({update, taskId, modal}) => {

    const [task, setTask] = useState({title: '', body: '', status: '', date:''});

    const {
        register, formState: {
            errors, isValid
        }, handleSubmit, reset
    } = useForm();

    const onSubmit = (data) => {
        update(taskId, data.body, data.status)
        reset();
        setTask({title: '', body: '', status: '', date:''})
        modal()
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{height:40}}>{errors?.title && <p>{errors?.title?.message || "Error!"}</p>}</div>
            <InputLabel>New task description</InputLabel>
                <Input
                    {...register("body", {required: "this field is required"})}
                    value={task.body}
                    onChange={e => setTask({...task, body: e.target.value})}
                    type="text"
                    placeholder="Task description"

                ></Input>

            <div style={{height:40}}>{errors?.body && <p>{errors?.body?.message || "Error!"}</p>}</div>
            <InputLabel>New task status</InputLabel>
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
            <MyButton type="submit">Update task</MyButton>

        </form>
    );
};

export default TaskUpdate;