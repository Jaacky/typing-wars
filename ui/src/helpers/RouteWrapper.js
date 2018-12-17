import React from 'react';
import { Route } from 'react-router';

const RouteWrapper = ({ component: ChildComponent, exact, path, ...rest }) => {
    return (
        <Route exact path={path} render={ props => {
            return (
                <ChildComponent {...rest}/>
            )
        }}/>
    )
}

export default RouteWrapper