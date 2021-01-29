import React from 'react';
import './App.css';
import Login from './Login'
import { Link } from "react-router-dom";







function App() {




  return (
    <div className="App">
      <Login />

      <Link to="/register"><button>
        Register
        </button>
        </Link>

      </div>
  );
}

export default App;
