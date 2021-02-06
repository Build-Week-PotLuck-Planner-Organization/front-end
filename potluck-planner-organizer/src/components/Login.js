import React, { useState }from 'react';
import ReactDOM from 'react-dom';
import axiosWithAuth from '../utils/axiosWithAuth';

function Login() {
  const [user, setUser] = useState("");

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
          localStorage.setItem("token", res.data.token);
//Need more info returned from login, at least user id so I can retrieve other user data
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
