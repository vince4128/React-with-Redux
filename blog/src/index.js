import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/app';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class Hello extends Component {
  render() {return <div>Hello!</div>}
}

class Goodbye extends Component {
  render() {return <div>Goodbye !</div>}
}

class Home extends Component {
  render() {return <div>Home !</div>}
}

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <div>
          <h1>Header</h1>
          <Route path='/' exact component={Home}/>
          <Route path='/hello' exact component={Hello}/>
          <Route path='/goodbye' exact component={Goodbye}/>
        </div>
      </BrowserRouter>
    </Provider>
    , document.querySelector('.container'));