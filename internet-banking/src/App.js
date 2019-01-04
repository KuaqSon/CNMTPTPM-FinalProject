import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import Layout from './layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Payments from './pages/Payments/Payments';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" render={({history}) => <Home history={history}/>} />
          <Route exact path="/login" render={({history}) => <Login history={history}/>} />
          <Layout>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/transactions" component={Transactions} />
            <Route exact path="/dashboard/payments" component={Payments} />
          </Layout>
        </Switch>
      </Router>
    );
  }
}

export default App;
