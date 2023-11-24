import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import cors from 'cors';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const app = cors({
  origin: "http://localhost:3000",
  methods:["GET","POST","PUT","DELETE"],
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <BrowserRouter>
   <App />
   </BrowserRouter>

    
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
