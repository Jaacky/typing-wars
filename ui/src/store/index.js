import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';

import reducers from 'reducers';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const history = createHistory();

    const middleware = [
        sagaMiddleware,
        routerMiddleware(history),
    ];

    return {
        ...createStore(
            reducers,
            applyMiddleware(...middleware)
        ),
        runSaga: sagaMiddleware.run,
        history
    }
};

export default configureStore;