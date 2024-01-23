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
    const pageNames = ['home', 'settings', 'signout'];
    const pageNamesDisplay = ['Home', 'Settings', 'Sign Out'];

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
            <button onClick={handleSignout}>
                <div id="page-link">
                        <NavLink>
                            <h1>{pageNameDisplay}</h1>
                        </NavLink>
                    <br></br>
                </div>
    
            </button>
        );
    }


    return (
        <button>
            <div id="page-link">
                    <NavLink
                        to={`/${pageName}`}
                    >
                        <h1>{pageNameDisplay}</h1>
                    </NavLink>
                <br></br>
            </div>

        </button>
    );
}

export default Navbar;
