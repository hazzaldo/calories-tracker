import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MealLogs from './components/MealLogs';
import CreateUser from './components/CreateUser';
import CreateMealLog from './components/EditMealLog';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={MealLogs} />
      <Route path="/user" component={CreateUser} />
      <Route path="/create" component={CreateMealLog} />
    </Router>
  );
}

export default App;
