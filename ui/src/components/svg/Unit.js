import React from 'react';

import styles from 'styles/GameMap';

const Unit = (props) => {
    const unitSize = props.size;
    const unitHeight = unitSize * props.adjustRatioHeight;
    const unitWidth = unitSize * props.adjustRatioWidth;
    const x = props.x * props.adjustRatioWidth;
    const y = props.y * props.adjustRatioHeight;

    return (
        <g className={`${styles.Unit} ${props.owned ? styles.Owned : ''}`}>
            <rect
                x={x - unitWidth/2} y={y - unitHeight/2} width={unitWidth} height={unitHeight} />  
            <text className={styles.Word} x={x} y={y-12} textAnchor="middle">
                <tspan className={styles.Typed}>{props.word.substring(0, props.typed)}</tspan>
                <tspan>{props.word.substring(props.typed)}</tspan>
            </text>
        </g>
    )
}

export default Unit;