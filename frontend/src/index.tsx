import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store';
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'
import { token } from './features/Auth/user';
import {
  BrowserRouter as Router,
} from "react-router-dom";

let persistor = persistStore(store)

if (!token) persistor.purge()

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <PersistGate loading = {<span className = 'loader'></span>} persistor = {persistor}>
        <Router>
        <App />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
