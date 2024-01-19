import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";

import "../styles/SignInPage.css"

function PageSignIn() {

    return (
        <div id="sign-in-page">
            <div id="sign-in-box">
                <h2>Sign In</h2>
                <form id="sign-in-form">
                    <input placeholder="Username"/>
                    <input placeholder="Password"/>
                    <button>Sign In</button>
                </form>
                <h3>Don't have an account?</h3>
                <NavLink to={`/signup`} >Sign Up</NavLink>
            </div>
        </div>
    );
}

export default PageSignIn;