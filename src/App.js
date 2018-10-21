import React, { Component,Fragment } from 'react';
import Login from './pages/login'
import Home from './pages/home'
import store from './store'
import {Provider} from "react-redux";
import {BrowserRouter,Route,Switch} from "react-router-dom";
import AuthRoute from './utils/authrouter'

class App extends Component {
  render() {
    return (
      <Fragment>
          <Provider store={store}>
              <BrowserRouter>
                <div>
                    <AuthRoute/>
                    <Switch>
                        <Route path='/login' exact component={Login}/>
                        <Route  path='/'   component={Home}/>
                    </Switch>
                </div>
              </BrowserRouter>
          </Provider>
      </Fragment>
    );
  }
}

export default App;
