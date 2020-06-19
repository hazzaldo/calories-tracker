import React from 'react';
import { Link } from 'react-router-dom';

function MealLog(props){
    return (
        <tr>
            <td>{props.mealLog.username}</td>
            <td>{props.mealLog.description}</td>
            <td>{props.mealLog.calories}</td>
            <td>{props.mealLog.date.substring(0,10)}</td>
            <td>
                <Link to={"/edit/"+props.mealLog._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMealLog(props.mealLog._id)}}>Delete</a>
            </td>
        </tr>
    )
}

export default MealLog;