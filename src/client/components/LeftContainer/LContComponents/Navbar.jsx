import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../../../styles/LeftContainer.css"


function Navbar({ isGuest }) {
    return (
        <div id="navbar">
            <PageContainer isGuest={isGuest} />
        </div>
    );
}

function PageContainer({ isGuest }) {
    const pageNames = !isGuest ? ['home', 'signout'] : ['home'];
    const pageNamesDisplay = !isGuest ? ['Home', 'Sign Out'] : ['Home'];

    const pages = [];
    for (let i = 0; i < pageNames.length; i++) {
        pages.push(<Page key={i} pageName={pageNames[i]} pageNameDisplay={pageNamesDisplay[i]} isGuest={isGuest}/>);
    };

    return (
        <div id="page-container">
            {pages}
        </div>
    );
}

function Page({pageName, pageNameDisplay, isGuest}) {
    const navigate = useNavigate();

    // if new component pageName is 'signout', create special functionality within component before returning component
    if (pageName === 'signout') {
        function handleSignout(e) {
            e.preventDefault();

            fetch('/home', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((res) => {
                if (res.status === 200) {
                    navigate('/signin');
                }
            }) 
            .catch((err) => {throw new Error(err);})
        }

        return (
            <>
                <NavLink id="page-link-nav">
                    <button onClick={handleSignout} id="page-link">   
                        <h1>{pageNameDisplay}</h1>
                    </button>
                </NavLink>
            </>
        );
    }

    if(pageName === 'home') {
        function handleHome(e) {
            e.preventDefault();

            if (isGuest) {
                navigate('/');
            } else {
                fetch('/home', {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json'
                    }
                })
                .then((res) => {
                    if (res.status === 200) {
                        navigate('/');
                    }
                }) 
                .catch((err) => {throw new Error(err);})
            }
        }

        return (
            <>
                <NavLink id="page-link-nav">
                    <button onClick={handleHome} id="page-link">   
                        <h1>{pageNameDisplay}</h1>
                    </button>
                </NavLink>
            </>
        );
    }
}

export default Navbar;
