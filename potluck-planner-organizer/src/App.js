import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './App.css';
import Login from './components/Login';

import PotluckContext from './contexts/PotluckContext';
import PrivateRoute from './components/PrivateRoute';


function App() {
  const [isLoggedIn, setIsLoggedIn] =useState(localStorage.getItem("UserToken") ? true : false);
  const [user, setUser] = useState("");



  return (
    <UserContext.Provider>
      <PotluckContext.Provider>
        <FoodContext.Provider>
        <div className="App">
          <Login />

          <Link to="/register"><button>
            Register
            </button>
            </Link>

          </div>
          </FoodContext.Provider>
        </PotluckContext.Provider>
      </UserContext.Provider>
  );
}

export default App;
