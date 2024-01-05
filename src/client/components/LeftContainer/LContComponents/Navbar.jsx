import React from "react";
import { NavLink } from "react-router-dom";

import "../../../styles/LeftContainer.css"


function Navbar() {
    return (
        <div id="navbar">
            <PageContainer />
        </div>
    );
}

function PageContainer() {
    const pageNames = ['home', 'settings'];
    const pageNamesDisplay = ['Home', 'Settings'];

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
