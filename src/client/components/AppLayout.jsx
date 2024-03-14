import React, { useState }from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LeftContainer from "./LeftContainer/LeftContainer";
import RightContainer from "./RightContainer/containers/RightContainer"
import PageSignIn from "./PageSignIn";
import PageSignUp from "./PageSignUp";
import SplashPage from "../SplashPage";

import "../styles/MainContainer.css"

function AppLayout({uri, setUri, client}) {
    const [qInput, setQInput] = useState('');
    const [results, setResults] = useState('');
    const [mostRecentLatency, setRecentLatency] = useState(0);
    const [mostRecentDepth, setRecentDepth] = useState(0);
    const [isGuest, setIsGuest] = useState(false);

    return (
        <>
            <Router>
                <Routes>
                        <Route exact path="/" element={<SplashPage />}/>
                        <Route exact path="/signin" element={<PageSignIn setIsGuest={setIsGuest} />}/>
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
                                      isGuest={isGuest}
                                      client={client}
                                      />
                                    <RightContainer 
                                      results={results} 
                                      latency={mostRecentLatency}
                                      depth={mostRecentDepth}
                                      uri={uri}
                                      isGuest={isGuest}
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