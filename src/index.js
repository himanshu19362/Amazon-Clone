import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { StateProvider } from './ReactContextApi/StateProvider.js';
import { initialState , reducer} from './ReactContextApi/reducer.js'
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React>
    <StateProvider initialState = {initialState} reducer = {reducer}>
      <App />
    </StateProvider>
  // </React>
);




//Website Link : https://clone-6f8d5.web.app/