import React from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

//api key
const API_KEY = 'AIzaSyD4UktRSzQVmt_yYtEDAM6ePRIMgCvX4Kg';

import App from './components/app';

ReactDOM.render(
  <App />, document.querySelector('.container')
);
