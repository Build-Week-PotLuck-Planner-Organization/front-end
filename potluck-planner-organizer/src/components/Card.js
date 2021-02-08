import React, {useContext } from 'react';
import {useHistory } from 'react-router-dom';

import axiosWithAuth from '../utils/axiosWithAuth';
import PotluckContext from '../contexts/PotluckContext';

const Card = (props) => {
    const history = useHistory();
    const {potlucks, setPotlucks, setIsEditing} = useContext(PotluckContext);

    const deletePotluck = {id} => {
        axiosWithAuth()
            .delete(`/potlucks/${id}`)
            .then((res) => {
                const afterDelete = potlucks.filter((item) => item.id !== id);
                setPotlucks([...afterDelete]);
            })
            .catch((err) => console.log("Delete error: ", err));
    };

    return (
        <div className="card">
            <h3 className="potluckName">{props.potluck_name}</h3>
            <p className="details">{props.location}</p>
            <p className="details">{props.date}</p>
            <p className="host"></p>
            <button
                className="edit"
                onClick={() => {
                    setIsEditing(true);
                    history.pushState("/edit", {...props});
                }}>
                    Edit
                </button>{" "}
                <button className="delete" onClick={() => deletePotluck(props.id)}>
                    Delete
                </button>
        </div>
    );
};

export default Card