import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes'
import Footer from './components/layout/Footer';

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setToken from './utilities/setToken';

import './style/App.scss';

const App = () => { 

  useEffect(() => {
    if(localStorage.token) {
      setToken(localStorage.token);
      store.dispatch(loadUser());
    }
    setToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return(
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route component={Routes} />
            </Switch>
          <Footer />
        </Fragment>
       </Router>
    </Provider>
)};

export default App;
