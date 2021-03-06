import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';


function EditMealLog(props){

    const [ mealLogEntry, setMealLogEntry ] = useState({
        username: "",
        description: "",
        calories: 0,
        date: new Date(),
        existingUsers: []
    });

    useEffect(() => {

        (async ()=> {
            try {
                const response = await axios.get('http://localhost:4000/users');
                if (response.data.length > 0) {
                    setMealLogEntry(preValue => {
                        return {
                            ...preValue,
                            existingUsers: response.data.map(user => user.username)
                        }
                    });
                } else {
                    console('No data found from server, for fetching all users');
                }
            } catch (err) {
                console.log(`Server request error fetching all users. Error: ${err}`);
            }
        })();
    }, []);

    useEffect(() => {

        (async ()=> {
            try {
                const response = await axios.get('http://localhost:4000/meals/'+props.match.params.id);
                const { username, description, calories, date } = response.data;
                setMealLogEntry(preValue => {
                    return {
                        ...preValue,
                        username: username,
                        description: description,
                        calories: calories,
                        date: new Date(date)
                    }
                });
            } catch (err) {
                console.log(`Server request error fetching meal log for edit. Error: ${err}`);
            } 
        })();
    }, [props.match.params.id]);

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

    async function handleSubmit(event) {
        event.preventDefault();

        const mealLog = {
            username: mealLogEntry.username,
            description: mealLogEntry.description,
            calories: mealLogEntry.calories,
            date: mealLogEntry.date
        }

        try {
            const res = await axios.put('http://localhost:4000/meals/'+props.match.params.id, mealLog);
            console.log(res.data);
        } catch (err) {
            console.log(`Server request error updating (PUT) meal log. Error: ${err}`);
        }
        
        setMealLogEntry(preValue => {
            return {
                ...preValue,
                username: "",
                description: "",
                calories: 0,
                date: new Date()
            }
        });
    }

    function displayUsernames() {
        return mealLogEntry.existingUsers && mealLogEntry.existingUsers.map(user => {
            return <option
                key={user}
                values={user}>
                {user}
                </option>
        })
    }

    return (
        <div className='container form-container'>
            <h4>EDIT MEAL LOG ENTRY</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select className="form-control" onChange={handleChange} name="username" value={mealLogEntry.username}>
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
                <button className="btn btn-primary" type="submit">Update meal log entry</button>
                </div>
            </form>
        </div>
    )
}

export default EditMealLog;