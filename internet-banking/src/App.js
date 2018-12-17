import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import Layout from './layout/Layout';

class App extends Component {
  render() {
    return (
      <Layout>
        <Router>
          <div>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/dashboard/transactions" exact component={Transactions} />
          </div>
        </Router>
      </Layout>
    );
  }
}

export default App;
