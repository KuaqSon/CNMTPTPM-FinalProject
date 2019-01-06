import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Dashboard from './pages/Dashboard/Dashboard';
import Transactions from './pages/Transactions/Transactions';
import Layout from './layout/Layout';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Payments from './pages/Payments/Payments';
import Recipients from './pages/Recipients/Recipients';
import HistoryPage from './pages/History/History';
import Clients from './pages/Clients/Clients';
import NewClient from './pages/Clients/NewClient';
import Recharge from './pages/Clients/Recharge';

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
            <Route exact path="/dashboard/recipients" component={Recipients} />
            <Route exact path="/dashboard/history" component={HistoryPage} />
            <Route exact path="/dashboard/clients" component={Clients} />
            <Route exact path="/dashboard/clients/new" component={NewClient} />
            <Route exact path="/dashboard/clients/recharge/:clientId" component={Recharge} />
          </Layout>
        </Switch>
      </Router>
    );
  }
}

export default App;
