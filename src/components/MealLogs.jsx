import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MealLog from './MealLog';

function MealLogs() {

    const [mealLogs, setMealLogs] = useState([]);

    useEffect(() => {

        (async ()=> {
            try {
                const response = await axios.get('http://localhost:4000/meals');
                if (response.data.length > 0) {
                    setMealLogs(response.data);
                } else {
                    console.log(`No meal logs data found.`)
                }
            } catch (err) {
                console.log(`Error fetching all meal logs: ${err}`);
            } 
        })();
    }, []);

    async function deleteMealLog(id) {
        try {
            const response = await axios.delete('http://localhost:4000/meals/'+id);
            console.log(response.data);
            setMealLogs(
                mealLogs.filter(mealLog => mealLog._id !== id)
            )
        } catch (err) {
            console.log(`Error deleting meal log: ${err}`);
        }
    }

    function displayMealLogs() {
        return mealLogs.map(currentMealLog => {
            return <MealLog 
            mealLog={currentMealLog}
            deleteMealLog={deleteMealLog}
            key={currentMealLog._id}/>
        })
    }

    return (
        <div className="logs-container">
            <h4>ALL MEAL LOGS</h4>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Calories</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    { displayMealLogs() }
                </tbody>
            </table>
        </div>
    )
}

export default MealLogs;