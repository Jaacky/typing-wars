import React from 'react';

import Base from 'components/svg/Base';
import Unit from 'components/svg/Unit';
import Target from 'components/svg/Target';

import styles from 'styles/GameMap';

const GameMap = (props) => {
    const width = window.innerWidth;
    const height = window.innerHeight - 50;

    const adjustRatioWidth = width / 100;
    const adjustRatioHeight = height / 100;
    const viewBox = [0, 0, width, height];
    let space = props.space || { bases: [], units: [], targets: {} };

    let bases = []
    for (let i=0; i<space.bases.length; i++) {
        let base = space.bases[i];
        let username = props.players[base.owner].username;
        let owned = false;
        if (props.clientId === base.owner) {
            owned = true;
        }
        bases.push(
            <Base adjustRatioWidth={adjustRatioWidth} adjustRatioHeight={adjustRatioHeight} x={base.position.x} y={base.position.y} hp={base.hp} size={base.size} user={base.owner} username={username} owned={owned}/>
        )
    }

    let units = []
    for (let i=0; i<space.units.length; i++) {
        let unit = space.units[i];
        let owned = false;
        if (props.clientId === unit.owner) {
            owned = true;
        }
        units.push(
            <Unit adjustRatioWidth={adjustRatioWidth} adjustRatioHeight={adjustRatioHeight} x={unit.position.x} y={unit.position.y} word={unit.word} typed={unit.typed} size={unit.size} owned={owned}/>
        )
    }
    
    let target;
    if (space.targets[props.clientId]) {
        let targetUnit = space.targets[props.clientId]
        target = <Target adjustRatioWidth={adjustRatioWidth} adjustRatioHeight={adjustRatioHeight} x={50*adjustRatioWidth} y={height - 20*adjustRatioHeight} word={targetUnit.word} typed={targetUnit.typed}/>
    }
    // let target = space.targets[props.clientId];

    return (
        <div className={styles.GameMap}>
            <svg
                preserveAspectRatio="xMidYMid"
                viewBox={viewBox}>
                {bases}
                {units}
                {target}
                {/* <Target adjustRatioWidth={adjustRatioWidth} adjustRatioHeight={adjustRatioHeight} x={50*adjustRatioWidth} y={height - 20*adjustRatioHeight} word={target.word} typed={target.typed}/> */}
            </svg>
        </div>
    )
}

export default GameMap;