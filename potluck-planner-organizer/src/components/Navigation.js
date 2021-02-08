import React, { useContext } from 'react';
import { NavLink }from 'react-router-dom';
import PotluckContext from '../contexts/PotluckContext';

const Navigation = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(PotluckContext);

    const logOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    };
    return (
        <nav>
            <div className="container">
                <div>
                    {isLoggedIn ? (
                        <NavLink to="/login" onClick={logOut}>
                            Log Out
                        </NavLink>
                    ) : (
                        <>
                        <NavLink to="/login">Log In</NavLink>
                        <NavLink to="/register">Register</NavLink>
                        </>
                    )}
                    <NavLink exact to="/">Potlucks</NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;