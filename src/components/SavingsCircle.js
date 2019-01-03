import React from 'react';
import CircularProgressbar from 'react-circular-progressbar';

const SavingsCircle = (props) => {
    return (
        <div className="saving__container">
            <CircularProgressbar
                percentage={(props.amount / props.goal) * 100}
                text={`${props.amount} / ${props.goal}`}
                strokeWidth={5}
                styles={{
                    // Customize the root svg element
                    root: {},
                    // Customize the path, i.e. the part that's "complete"
                    path: {
                        // Tweak path color:
                        stroke: '#1c88bf',
                        // Tweak path to use flat or rounded ends:
                        strokeLinecap: 'butt',
                        // Tweak transition animation:
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                    },
                    // Customize the circle behind the path
                    trail: {
                        // Tweak the trail color:
                        stroke: '#d6d6d6',
                    },
                    // Customize the text
                    text: {
                        // Tweak text color:
                        fill: '#1c88bf',
                        // Tweak text size:
                        fontSize: '1.5rem',
                    },
                }}
            />
            <h3>{props.title}</h3>
        </div>
    );
}

export default SavingsCircle;