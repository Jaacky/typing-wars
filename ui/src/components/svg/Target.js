import React from 'react';

import styles from 'styles/GameMap';

const Target = (props) => {
    const height = 15 * props.adjustRatioHeight;
    const width = 30 * props.adjustRatioWidth;

    return (
        <g className={styles.Target}>
            <rect x={props.x - width/2} y={props.y - height/2} width={width} height={height} />
            <text className={`${styles.Word}`} x={props.x} y={props.y} textAnchor="middle" alignmentBaseline="middle">
                <tspan className={styles.Typed}>{props.word.substring(0, props.typed)}</tspan>
                <tspan>{props.word.substring(props.typed)}</tspan>
            </text>
        </g>
    )
}

export default Target;