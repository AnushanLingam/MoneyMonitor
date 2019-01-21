import React from 'react';

export const DatePickerCancel = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
        <g stroke={props.theme === "dark" ? "white" : "black"} strokeWidth="2">
            <line x1="4" y1="4" x2="15" y2="15"></line>
            <line x1="15" y1="4" x2="4" y2="15"></line>
        </g>
    </svg>
)

export default DatePickerCancel;