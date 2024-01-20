import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../styles/SignInPage.css"

function PageSignIn() {
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
        .then((res) => {
            if (res.status === 200) {
                // window.location.href = 'http://localhost:3000/home';
                navigate('/home')
            } else {
                console.log('Incorrect user or passowrd - signin');
                alert('Incorrect username or password');
                navigate('/signin');
            }
        })
        .catch((err) => {throw new Error(err);});
    }


    return (
        <div id="sign-in-page">
            <div id="sign-in-box">
                <h2>Sign In</h2>
                <form id="sign-in-form" onSubmit={handleSubmit}>
                    <input 
                        type="text"
                        placeholder="Username"
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        type="text"
                        placeholder="Password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button>Sign In</button>
                </form>
                <h3>Don't have an account?</h3>
                <NavLink to={`/signup`} >Sign Up</NavLink>
            </div>
        </div>
    );
}

export default PageSignIn;