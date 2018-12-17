import React from 'react';
import { Link } from 'react-router-dom';

import styles from 'styles/Nav';

const Nav = () => {
    return (
        <div className={styles.Nav}>
            <Link to="/">
                {/* <p>T<span>yping</span> W<span>ars</span></p> */}
                <p>Typing Wars</p>
            </Link>
        </div>
    )
}

export default Nav;