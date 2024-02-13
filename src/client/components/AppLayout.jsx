import React, { useState }from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/containers/RightContainer"
import PageSignIn from "./PageSignIn";
import PageSignUp from "./PageSignUp";

import "../styles/MainContainer.css"

function AppLayout({uri, setUri}) {
    const [qInput, setQInput] = useState('');
    const [queryInfo, setQueryInfo] = useState('');
    const [results, setResults] = useState('');

    return (
        <>
            <Router>
                <Routes>
                        <Route exact path="/" element={<PageSignIn />}/>
                        <Route exact path="/signup" element={<PageSignUp />}/>
                        <Route exact path="/home" element=
                            {
                                <div id="main-container">
                                    <LeftContainer
                                        qInput={qInput}
                                        setQInput={setQInput} 
                                        uri={uri}
                                        setUri={setUri}
                                        setQueryInfo={setQueryInfo}
                                        results={results}
                                        setResults={setResults}
                                    />
                                    <RightContainer queryInfo={queryInfo} results={results}/>
                                </div>
                            }
                        />
                </Routes>
            </Router>
        </>
    )
}

export default AppLayout;