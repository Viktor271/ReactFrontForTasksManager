import React, {useState} from 'react';
import TaskItem from "./TaskItem";

import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TasksList = ({tasks, remove, update}) => {


    if (tasks.length == 0){
        return (
            <h1 style={{textAlign: "center"}}>
                No tasks
            </h1>
        )
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell>Deadline</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                    {tasks.map((task) =>
                        <TaskItem update={update} remove={remove} task = {task} key={task.id}/>
                    )}
            </Table>
        </TableContainer>
    );
};

export default TasksList;