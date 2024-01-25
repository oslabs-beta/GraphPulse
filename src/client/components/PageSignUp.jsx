import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../styles/SignUpPage.css"

function PageSignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('FROM HANDLE SUBMIT')

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            })
        })
        .then(async (res) => {
            if (res.status === 200) {
                const resJSON = await res.json();
                alert(`${resJSON.result}`);
                navigate('/home')
            }
        })
        .catch(err => {throw new Error(err);});
    }

    return (
        <div id="sign-up-page">
            <h1 id="sign-in-title">GraphPulse</h1>
            <div id="sign-up-input-container">
                <h2>Sign Up</h2>
                <form id="sign-up-form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Username"
                        id="sign-up-input"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                    />
                    <input 
                        type="text"
                        placeholder="Email"
                        id="sign-up-input"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        id="sign-up-input"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <button id="sign-up-btn">Sign Up</button>
                </form>
                <p>Already have an account?</p>

                <NavLink to="/">
                    <button id="sign-in-redirect-btn">
                        Sign In
                    </button>
                </NavLink>
            </div>
        </div>
    );
}

export default PageSignUp;