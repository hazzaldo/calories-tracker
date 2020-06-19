import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


function CreateMealLog() {

    const [ mealLogEntry, setMealLogEntry ] = useState({
        username: "",
        description: "",
        calories: 0,
        date: new Date(),
        existingUsers: []
    });

    useEffect(() => {
        setMealLogEntry(preValue => {
            return {
                ...preValue,
                existingUsers: ['some example user'],
                username: 'some example user'
            }
        });
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setMealLogEntry(preValue => {
            return {
                ...preValue,
                [name]: value
            }
        });
    }

    function handleDateChange(date) {
        setMealLogEntry(preValue => {
            return {
                ...preValue,
                date: date
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();

        const mealLog = {
            username: mealLogEntry.username,
            description: mealLogEntry.description,
            calories: mealLogEntry.calories,
            date: mealLogEntry.date
        }

        console.log(mealLog);

        setMealLogEntry(preValue => {
            return {
                ...preValue,
                username: "",
                description: "",
                calories: 0,
                date: new Date()
            }
        });

        window.location = '/';
    }

    function displayUsernames() {
        return mealLogEntry.existingUsers.map(user => {
            return <option
                key={user}
                values={user}>
                {user}
                </option>
        })
    }

    return (
        <div className='container form-container'>
            <h4>ADD A NEW MEAL LOG ENTRY</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select className="form-control" onChange={handleChange} name="username">
                        {displayUsernames()}
                    </select>
                </div>
                <div className="form-group">
                    <label>Meal description: </label>
                    <input className="form-control" type="text" onChange={handleChange} required name="description" value={mealLogEntry.description} placeholder="Enter meal description (e.g. Pizza)"/>
                </div>
                <div className="form-group">
                    <label>Calories (kcal): </label>
                    <input className="form-control" type="number" onChange={handleChange} name="calories" required value={mealLogEntry.calories}/>
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div className="form-group">
                    <DatePicker 
                        selected={mealLogEntry.date}
                        onChange={handleDateChange}
                    />
                    </div>
                </div>

                <div className="form-group">
                <button className="btn btn-primary" type="submit">Add meal log entry</button>
                </div>
            </form>
        </div>
    )
}

export default CreateMealLog;