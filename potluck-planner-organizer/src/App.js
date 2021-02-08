import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import PotluckList from './components/PotluckList';
import Navigation from './components/Navigation';
import PotluckForm from './components/PotluckForm';

// import UserContext from './contexts/UserContext';
import PotluckContext from './contexts/PotluckContext';
// import FoodContext from './contexts/FoodContext';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const [isLoggedIn, setIsLoggedIn] =useState(localStorage.getItem("token") ? true : false);
  const [user, setUser] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [potlucks, setPotlucks] = useState([
    {
      id: 0,
      potluckName: "Potluck Name",
      location: "Location",
      date: "date",
      hostName: "Host Name",
    },
  ]);



  return (
    <PotluckContext.Provider
      value={{
        user,
        setUser,potlucks,
        setPotlucks,
        isEditing,
        setIsEditing,
        isLoggedIn,
        setIsLoggedIn
      }}>
      <div className="App">
        <Navigation />

        <Switch>
          <privateRoute exact path="/" component={PotluckList} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/add" component={PotluckForm} />
          <PrivateRoute path="/edit" component={PotluckForm} />
        </Switch>
        </div>
      </PotluckContext.Provider>
  );
}

export default App;
