import React, { useState, useContext }from 'react';
import {useHistory } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import PotluckContext from '../contexts/PotluckContext';

function Login() {
  const [user, setUser] = useState("");
  const history = useHistory();
  const { setIsLoggedIn, setActiveUser } = useContext(PotluckContext);

  const handleNameChange = event => {
    setUser({ ...user, username: event.target.value });
  };

  const handlePasswordChange = event => {
    setUser({ ...user, password: event.target.value });
  };

  const handleSubmit = event => {
      /*Code for Axios Post will go here*/
      event.preventDefault();
      axiosWithAuth()
        .post("/auth/login", user)
        .then((res) => {
          localStorage.setItem("token", res.data.token)
        .then(
          axiosWithAuth()
          .get(`/auth/users/${res.data.id}`))
          .then localStorage.setItem("user", JSON.stringify({ id: res.data.id, name: res.data.username })
          );
          setActiveUser({ id: res.data.id, name: res.data.username });
          setIsLoggedIn(true);
          history.push("/");

        })
        .catch((err) => {
          console.log("Login error: ", err);
          localStorage.removeItem("token");
        });

    console.log(user.username);
    console.log(user.password);
  };

    return (
        <>
    <h1>Log In</h1>
      <form onSubmit={event => handleSubmit(event)}>
        <label>
          Username:
          <input id="username" name="username" type="text" onChange={event => handleNameChange(event)}/>
        </label>
        <br></br>

        <label>
          Password:
          <input id="password" name="password" type="password" onChange={event => handlePasswordChange(event)}/>
        </label>


        <br></br>
        <button type="submit">Sign in</button>


      </form>
      </>
    )
}


export default Login;
