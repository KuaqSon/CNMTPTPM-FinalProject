import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import Layout from './layout/Layout';
import Home from './pages/Home/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Layout>
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/dashboard/transactions" component={Transactions} />
          </Layout>
        </Switch>
      </Router>
    );
  }
}

export default App;
