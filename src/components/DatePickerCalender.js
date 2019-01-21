import React from 'react';

export const DatePickerCalender = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
        <g stroke={props.theme === "dark" ? "white" : "black"} strokeWidth="2">
            <rect width="15" height="15" x="2" y="2" fill="none"></rect>
            <line x1="6" y1="0" x2="6" y2="4"></line>
            <line x1="13" y1="0" x2="13" y2="4"></line>
        </g>
    </svg>
)

export default DatePickerCalender;