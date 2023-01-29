import React from 'react';
import {NativeSelect} from "@mui/material";

const MySelect = ({options, defaultValue, value, onChange}) => {
    return (
        <NativeSelect
            value={value}
            onChange={event => onChange(event.target.value)}
        >
            <option disabled value="">{defaultValue}</option>
            {options.map(option =>
                <option key={option.value} value={option.value}>{option.name}</option>
            )}
        </NativeSelect>
    );
};

export default MySelect;