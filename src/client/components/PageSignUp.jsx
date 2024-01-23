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
            <div id="sign-up-box">
                <h2>Sign Up</h2>
                <form id="sign-up-form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                        value={username}
                    />
                    <input 
                        type="text"
                        placeholder="Email"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                    />
                    <input 
                        type="text"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                    />
                    <button>Sign Up</button>
                </form>
                <h3>Already have an account?</h3>
                <NavLink to="/">Sign In</NavLink>
            </div>
        </div>
    );
}

export default PageSignUp;