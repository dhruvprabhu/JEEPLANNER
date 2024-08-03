// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import store from './app/store'; // Adjust import to use default export

ReactDOM.render(
  <Provider store={store}>
    
      <App />
    
  </Provider>,
  document.getElementById('root')
);
