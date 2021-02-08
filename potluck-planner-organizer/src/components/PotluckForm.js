import React, { useState, useContext, useEffect } from 'react';
import { useHistory }from 'react-router-dom';
import * as yup from 'yup';
import axiosWithAuth from '../utils/axiosWithAuth';
import PotluckContext from "../contexts/PotluckContext";

function PotluckForm(props) {
    console.log("PotluckForm props: ", props);
    const editData = props.location.state;
    const history = useHistory();
    const { isEditing, setIsEditing, user } = useContext(PotluckContext);
    const initialState = {
        potluckName: "",
        location: "",
        date: "",
        hostName: user.name,
    };
    const [potluck, setPotluck] = useState(editData || initialState);

    const [errors, setErrors] = useState(initialState);

    const formSchema = yup.object().shape({
        potluckName: yup.string().required("Potluck name is required."),
        location: yup.string().required("Location is required."),
        date: yup.string().required("Date is required")
    });

    useEffect(() => {
        formSchema.isValid(potluck).then((isFormValid) => {

        }, [potluck, formSchema])
    })

    const handleSubmit =(e) => {
        e.preventDefault();
        axiosWithAuth()
            .post(`/potlucks`, potluck)
            .then((res) => {
                setPotluck(initialState);
                history.push("/");
            })
            .catch((err) => console.log("New potluck error: ", err));
    };

    const handleEdit = (e) => {
        e.preventDefault();
        axiosWithAuth()
        .put(`/potlucks/${editData.id}`, potluck)
        .then((res) => {
            setIsEditing(false);
            history.push("/");
        })
        .catch((err) => console.log("Edit potluck error: ", err));
    };

    const validateChange = (e) => {
        yup
            .reach(formSchema, e.target.name)
            .validate(e.target.value)
            .then((inputIsValid) => {
                setErrors({ ...errors, [e.target.name]: ""});
            })
            .catch((error) => {
                setErrors({ ...errors, [e.target.name]: error.errors[0] });
            });
    };

    const handleChange = (e) => {
        e.persist();

        const newPotluck = {
            ...potluck, [e.target.name]: e.target.value,
        };
        validateChange(e);
        setPotluck(newPotluck);
    };

    return (
        <div className="container">
            <form onSubmit={isEditing ? handleEdit : handleSubmit}>
                <label htmlFor="potluckName">
                    Potluck Name:
                    <br />
                    <input id="potluckName" type="text" name="potluckName" onChange={handleChange} value={potluck.potluckName} />
                    {errors.potluckName.length > 0 ? <span className="error">{errors.potluckName}</span> : null}
                </label>
                <label htmlFor="location">
                    Location:
                    <br />
                    <input id="location" type="text" name="location" onChange={handleChange} value={potluck.location} />
                    {errors.location.length > 0 ? <span className="error">{errors.location}</span> : null}
                </label>
                <label htmlFor="date">
                    Date:
                    <br />
                    <input id="date" type="text" name="date" onChange={handleChange} value={potluck.date} />
                    {errors.date.length > 0 ? <span className="error">{errors.date}</span> : null}
                </label>
                <label htmlFor="hostName">
                    Host Name:
                    <br />
                    <input id="hostName" type="text" name="hostName" onChange={handleChange} value={potluck.hostName} />
                    {errors.hostName.length > 0 ? <span className="error">{errors.hostName}</span> : null}
                </label>
            </form>
        </div>
    );
}

export default PotluckForm;