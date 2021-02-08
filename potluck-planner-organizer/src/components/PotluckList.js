import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import axiosWithAuth from '../utils/axiosWithAuth';
import PotluckContext from '../contexts/PotluckContext';
import Card from './Card';

const PotluckList = () => {
    const history = useHistory();
    const { potlucks, setPotlucks } = useContext(PotluckContext);

    const addPotluckRoute = () => {
        history.push("/add");
    };

    useEffect(() => {
        axiosWithAuth()
            .get("/api/potlucks")
            .then((res) => {
                setPotlucks(res.data)
            })
            .catch((err) => console.log("Potluck list error:", err));
    },
    // eslint=disable-next-line
    []
);

    return (
        <>
        <button className="newPotluck" onClick={addPotluckRoute}>
            Add New Potluck
        </button>
        <div className="allcards">
            {potlucks.map((item) => {
                return <Card key={item.id} {...item} />
            })}
        </div>
        </>
    );
};

export default PotluckList;