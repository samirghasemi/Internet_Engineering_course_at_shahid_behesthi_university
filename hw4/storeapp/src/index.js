import React from 'react';
import './index.css';
import './style.css';
import App from './App';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from "./redux/store";

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
