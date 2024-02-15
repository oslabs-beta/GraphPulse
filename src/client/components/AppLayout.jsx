import React, { useState }from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/containers/RightContainer"
import PageSignIn from "./PageSignIn";
import PageSignUp from "./PageSignUp";

import "../styles/MainContainer.css"

function AppLayout({uri, setUri}) {
    const [qInput, setQInput] = useState('');
    const [results, setResults] = useState('');
    const [mostRecentLatency, setRecentLatency] = useState(0);
    const [mostRecentDepth, setRecentDepth] = useState(0);

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
                                      setUri={setUri}
                                      results={results}
                                      setResults={setResults}
                                      setLatency={setRecentLatency}
                                      setDepth={setRecentDepth}
                                      />
                                    <RightContainer 
                                      results={results} 
                                      latency={mostRecentLatency}
                                      depth={mostRecentDepth}
                                      uri={uri}
                                      />
                                </div>
                            }
                        />
                </Routes>
            </Router>
        </>
    )
}

export default AppLayout;