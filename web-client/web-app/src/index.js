import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import { Switch, Route } from 'react-router-dom'

import App from './App';
import Login from './components/Login';
import store from './store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path='/login' component ={ Login }/>
        <Route path='/' component ={ App }/>
      </Switch>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
);
registerServiceWorker();
