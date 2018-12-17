import React from 'react';

import styles from 'styles/GameMap';

const Base = (props) => {
    const baseSize = props.size;
    const baseWidth = baseSize * props.adjustRatioWidth;
    const x = props.x * props.adjustRatioWidth;
    const y = props.y * props.adjustRatioHeight;
    // const you = props.you 
    // const path = `M${x - baseWidth/2} ${y - baseHeight/2} h ${baseWidth} v ${baseHeight} h ${-baseWidth} Z`;
    const owned = props.owned ? "(You)" : '';
    
    return (
        <g className={styles.Base}>
            {/* <path
                d={path} fill="transparent" stroke="black" strokeWidth="4" strokeLinejoin="round"
            />   */}
            <rect x={x-baseWidth/2} y={0} width={baseWidth} height={props.adjustRatioHeight * 100}/>
            <text x={x} y={y} textAnchor="middle">
                <tspan>{props.hp}</tspan>
                <tspan x={x} y={y + 15}>{props.user}</tspan>
                <tspan x={x} y={y + 30}>{owned}</tspan>
                <tspan x={x} y={y + 45}>{props.username}</tspan>
            </text>
        </g>
    )
}

export default Base;