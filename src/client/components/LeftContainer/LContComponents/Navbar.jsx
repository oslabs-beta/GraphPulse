import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import "../../../styles/LeftContainer.css"


function Navbar() {
    return (
        <div id="navbar">
            <PageContainer />
        </div>
    );
}

function PageContainer() {
    const pageNames = ['home', 'signout'];
    const pageNamesDisplay = ['Home', 'Sign Out'];

    const pages = [];
    for (let i = 0; i < pageNames.length; i++) {
        pages.push(<Page key={i} pageName={pageNames[i]} pageNameDisplay={pageNamesDisplay[i]}/>);
    };

    return (
        <div id="page-container">
            {pages}
        </div>
    );
}

function Page({pageName, pageNameDisplay}) {

    // if new component pageName is 'signout', create special functionality within component before returning component
    if (pageName === 'signout') {
        const navigate = useNavigate();

        function handleSignout(e) {
            e.preventDefault();

            fetch('/home', {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
                // body: JSON.stringify({})
            })
            .then((res) => {
                if (res.status === 200) {
                    navigate('/');
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


    return (
        <>
            <NavLink
                id="page-link-nav"
                to={`/${pageName}`}
            >
                <button id="page-link">
                    <h1>{pageNameDisplay}</h1>
                </button>
            </NavLink>
        </>
    );
}

export default Navbar;
