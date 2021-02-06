import React, { useState }from 'react';
import ReactDOM from 'react-dom';

function Login() {
  const [user, setUser] = useState("");

  const handleNameChange = event => {
    setUser({ ...user, username: event.target.value });
  };

  const handlePasswordChange = event => {
    setUser({ ...user, password: event.target.value });
  };
  /*Code for Axios Post will go here*/

  const handleSubmit = event => {

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
