import React, {useState} from 'react';
import MyButton from "./UI/button/MyButton";
import MyModal from "./UI/MyModal/MyModal";
import TaskUpdate from "./TaskUpdate";
import format from 'date-fns/format';

import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const TaskItem = (props) => {
    const [modal, setModal] = useState(false);

    const taskUpdated = () => {
        setModal(false)
    }

    return (
        <TableBody>
            <TableRow key={props.task.id}>
                <TableCell>{props.task.title}</TableCell>
                <TableCell>{format(new Date(props.task.date), 'dd-MM-Y')}</TableCell>
                <TableCell>{props.task.status}</TableCell>
                <TableCell>{props.task.body}</TableCell>
                <TableCell><MyButton  onClick={() => setModal(true)}>Edit</MyButton></TableCell>
                <MyModal visible={modal} setVisible={setModal}>
                    <TaskUpdate update={props.update} taskId={props.task.id} modal={taskUpdated} ></TaskUpdate>
                </MyModal>
                <TableCell><MyButton  onClick={() => props.remove(props.task.id)}>Delete</MyButton></TableCell>
            </TableRow>
        </TableBody>
    );
};

export default TaskItem;