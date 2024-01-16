import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "../styles/SignUpPage.css"

function PageSignUp() {

    return (
        <div id="sign-up-page">
            <div id="sign-up-box">
                <h2>Sign Up</h2>
                <form id="sign-up-form">
                    <input placeholder="Username"/>
                    <input placeholder="Password"/>
                    <button>Sign Up</button>
                </form>
                <h3>Already have an account?</h3>
                <NavLink to="/">Sign In</NavLink>
            </div>
        </div>
    );
}

export default PageSignUp;