import React from "react";


function Navbar() {
    const pageNames = ['Query Logs', 'Schema Tree', 'Settings'];
    const pages = [];
    for (let i = 0; i < pageNames.length; i++) {
        pages.push(<Page key={i} pageName={pageNames[i]}/>);
    };

    return (
        <>
            {pages}
        </>
    );

}

function Page({pageName}) {


    return (
        <h1>{pageName}</h1>
    );

}

export default Navbar;