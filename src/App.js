import React, { Component,Fragment } from 'react';
import Login from './pages/login'
import store from './store'
import {Provider} from "react-redux";
import {BrowserRouter,Route} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <Fragment>
          <Provider store={store}>
              <BrowserRouter>
                <div>
                    <Route path='/login' exact component={Login}/>
                </div>
              </BrowserRouter>
          </Provider>
      </Fragment>
    );
  }
}

export default App;
