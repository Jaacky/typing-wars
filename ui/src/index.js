import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import App from "App";
import configureStore from 'store';
import sagas from 'sagas';

import normalizeStyles from 'styles/normalize';
import globalStyles from 'styles/global';

let store = configureStore();
store.runSaga(sagas);

render(
    <Provider store={store}>
        <ConnectedRouter history={store.history}>
            <App />
        </ConnectedRouter>
    </Provider>, 
    document.getElementById("app")
);