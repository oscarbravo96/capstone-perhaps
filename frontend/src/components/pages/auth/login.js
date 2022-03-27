import React, { useState } from 'react'
import { navigate } from 'hookrouter'
import Cookies from 'js-cookie'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username === '' || password === '') {
            setError(true)
            setErrorMessage('Error: all fields must be completed')
        } else {
            fetch('http://localhost:5000/user/verify', {
                method: "POST",
                credentials: 'same-origin',
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
            .then(response => response.json())
            .then(response => {
                if(response === 'User has NOT been verified') {
                    setError(true)
                    setErrorMessage("Error: user NOT verified")
                    console.log("work")
                } else if(response === "youve been verified") {
                    setError(false)
                    setErrorMessage('')
                    Cookies.set('username', username)
                    console.log("still works")
                    navigate('/')
                }
            })
        }
    }


    return (
        <div className="signup-container">
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Input Username" 
                name="username" 
                value={username} 
                onChange={(event) => setUsername(event.target.value)}/>
                <input 
                type="password" 
                placeholder="Input Password" 
                name="password" 
                value={password} 
                onChange={(event) => setPassword(event.target.value)}/>
                <button className="button">Login</button>
            </form>

        </div>
    )
}
