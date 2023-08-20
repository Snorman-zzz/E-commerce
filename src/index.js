import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import reducers from "./reducers";
import thunk from "redux-thunk";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById('root'));
const reduxStore = createStore(reducers, applyMiddleware(thunk))

root.render(
    <Provider store={reduxStore}>
        <App/>
    </Provider>
);

