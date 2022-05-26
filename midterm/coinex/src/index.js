import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import DarkThemeProvider from "./DarkThemeProvider";
import store from "./redux/store";
import {Provider as ReduxProvider} from "react-redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ReduxProvider store={store}>
        <DarkThemeProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </DarkThemeProvider>
    </ReduxProvider>
);

