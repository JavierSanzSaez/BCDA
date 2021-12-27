import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './components/App';

import {DrizzleContext} from "@drizzle/react-plugin";
import drizzle from "./drizzle"


ReactDOM.render(
  <React.StrictMode>
    <DrizzleContext.Provider drizzle={drizzle}>
    <App />
    </DrizzleContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);