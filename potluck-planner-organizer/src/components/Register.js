import React, {useState} from 'react';
import { Link, useHistory } from "react-router-dom";
import axiosWithAuth from '../utils/axiosWithAuth';

function Register () {
    const [user, setUser] = useState("");
    const history = useHistory();
    const handleNameChange = event => {
      setUser({ ...user, username: event.target.value });
    };

    const handlePasswordChange = event => {
      setUser({ ...user, password: event.target.value });
    };

    const handleSubmit = event => {
      /*Code for Axios Post will go here*/
      event.preventDefault();
      console.log(user);

      axiosWithAuth()
      .post("/auth/register", user)
      .then((res) => {
        console.log("Register response: ", res.data);
        history.push("/");
      })

      console.log(user.username);
      console.log(user.password);
    };


    return (
        <div>
        <h1>Register</h1>

        <form onSubmit={event => handleSubmit(event)}>
        <label>
            Name:
            <input id="name" name="name" type="text" onChange={event => handleNameChange(event)}/>
                </label>


            <label>
            Username:
            <input id="username" name="username" type="text" onChange={event => handleNameChange(event)}/>
                </label>
        <br></br>

        <label>
          Password:
          <input id="password" name="password" type="password" onChange={event => handlePasswordChange(event)}/>
        </label>

        <label>
            Email:
            <input id="email" name="email" type="text" onChange={event => handleNameChange(event)}/>
                </label>

        <label>
            Phone:
            <input id="phone" name="phone" type="text" onChange={event => handleNameChange(event)}/>
                </label>


        <br></br>
        <Link to="/">
        <button type="submit" path="/">Create Account</button>
        </Link>

        </form>
        </div>
    )
}

export default Register;
