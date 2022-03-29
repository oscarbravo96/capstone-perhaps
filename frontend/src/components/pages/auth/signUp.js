import React, { useState } from "react";
import Cookies from 'js-cookie';
import { navigate } from 'hookrouter';

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === '' || password === '' || confirmPassword === '') {
            setError(true);
            setErrorMessage('Error: all fields must be completed.')
        } else if(password !== confirmPassword) {
            setError(true);
            setErrorMessage('Error: Passwords must match!')
        } else {
            fetch('http://localhost:5000/user/add',{
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(res => res.json())
            .then(res => {
                if(res === "Error: the username you've entered has been taken") {
                    setError(true);
                    setErrorMessage("Error: the username you've entered has been taken");
                } else {
                    console.log("stops here")
                    setError(false);
                    setErrorMessage('');
                    Cookies.set('username', username);
                    navigate('/login');
                }
            })
        }
    }


    return(
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='Username' name='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type='text' placeholder='Password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type='text' placeholder='Confirm Password' name='confirmpassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                <button className="signup-btn">Submit</button>
            </form>
        </div>
    )
}