import React from "react";
import { NavLink } from "react-router-dom";

import "../../../styles/staticComponents.css"


function Navbar() {
    const pageNames = ['querylogs', 'schematree', 'settings'];
    const pageNamesDisplay = ['Query Logs', 'Schema Tree', 'Settings'];

    const pages = [];
    for (let i = 0; i < pageNames.length; i++) {
        pages.push(<Page key={i} pageName={pageNames[i]} pageNameDisplay={pageNamesDisplay[i]}/>);
    };

    return (
        <>
            {pages}
        </>
    );
}


function Page({pageName, pageNameDisplay}) {

    return (
        <>
            <NavLink
                to={`/${pageName}`}
                id="pageLink"
            >
                <h1>{pageNameDisplay}</h1>
            </NavLink>
            <br></br>
        </>
    );
}

export default Navbar;