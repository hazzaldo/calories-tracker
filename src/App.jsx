import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MealLogs from './components/MealLogs';
import CreateUser from './components/CreateUser';
import CreateMealLog from './components/CreateMealLog';
import EditMealLog from './components/EditMealLog';

function App() {
  return (
    <Router>
      <Navbar />
      <Route path="/" exact component={MealLogs} />
      <Route path="/user" component={CreateUser} />
      <Route path="/meal" component={CreateMealLog} />
      <Route path="/edit:id" component={EditMealLog} />
    </Router>
  );
}

export default App;
