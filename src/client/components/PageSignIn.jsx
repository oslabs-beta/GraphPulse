import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../styles/SignInPage.css"

function PageSignIn({ setIsGuest }) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        
        fetch('/signin', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        .then(async (res) => {
            if (res.status === 200) {
                // window.location.href = 'http://localhost:3000/home';
                setIsGuest(false);
                navigate('/home')
            } else {
                alert(`Incorrect sign in credentials or account not found`);
                console.log('Incorrect user or passowrd - signin');
                navigate('/');
            }
        })
        .catch((err) => {throw new Error(err);});
    }

    function handleGuestSignIn(e) {
        e.preventDefault();
        fetch('/guest')
            .then(res => {
                setIsGuest(true);
                if (res.status === 200) navigate('/home');
                else navigate('/');
            })
            .catch(err => { throw new Error(err) });
    }

    return (
        <div id="sign-in-page">
            <h1 id="sign-in-title">GraphPulse</h1>

            <div id="sign-in-input-container">
                <h2>Sign In</h2>
                <form id="sign-in-form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Username"
                        className="sign-in-input"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        className="sign-in-input"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button id="sign-in-btn">Sign In</button>
                </form>
                <p>Don't have an account?</p>
                <NavLink to={`/signup`} >
                    <button id="sign-up-redirect-btn">
                        Sign Up
                    </button>
                </NavLink>
                <p>or</p>
                <div onClick={handleGuestSignIn}>
                    <button id="sign-up-redirect-btn">
                        Use as guest
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PageSignIn;