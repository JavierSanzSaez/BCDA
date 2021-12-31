import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './components/App';

import { drizzleReactHooks } from "@drizzle/react-plugin";
import drizzle from "./drizzle"


ReactDOM.render(
  <React.StrictMode>
    <drizzleReactHooks.DrizzleProvider drizzle={drizzle}>
      <App />
    </drizzleReactHooks.DrizzleProvider>
  </React.StrictMode>,
  document.getElementById('root')
);