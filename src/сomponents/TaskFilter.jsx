import React from 'react';
import MySelect from "./UI/select/MySelect";
import {InputLabel, NativeSelect, Input} from "@mui/material";

const TaskFilter = ({filter, setFilter}) => {
    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "25px", marginBottom: "5px"}}>
            <InputLabel variant="standard" color="success" >Sort:</InputLabel>
            <MySelect
                value={filter.sort}
                onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
                defaultValue="select"
                options={[
                    {value: 'body', name: "by body"},
                    {value: 'date', name: "by date"},
                    {value: 'status', name: "by status"}
                ]}
            ></MySelect>
            <InputLabel>Filter by Date:</InputLabel>
            <Input type="date" onChange={(e) => setFilter({ ...filter, date: e.target.value })} />
            <InputLabel>Filter by Status:</InputLabel>
            <NativeSelect onChange={(e) => setFilter({ ...filter, status: e.target.value })}>
                <option value="">All</option>
                <option value="completed">Completed</option>
                <option value="in progress">In Progress</option>
                <option value="pending">Pending</option>
            </NativeSelect>
        </div>
    );
};

export default TaskFilter;