import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {

    const [ user, setUser ] = useState({
        username: ""
    });

    function handleChange(event) {
        const { value } = event.target;

        setUser({
            username: value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const newUser = {
            username: user.username,
        }

        const res = await axios.post('http://localhost:4000/users', user);
        console.log(res.data);

        setUser({
            username: ""
        });
    }

    return (
        <div className='container form-container'>
            <h4>ADD A NEW USERNAME</h4>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input className="form-control" type="text" onChange={handleChange} required name="username" value={user.username} placeholder="Enter a new username"/>
                </div>

                <div className="form-group">
                    <button className="btn btn-primary" type="submit">Add username</button>
                </div>
            </form>
        </div>
    )
}

export default CreateUser;