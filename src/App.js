import "./App.css";

import React, { useState } from "react";
import News from "./components/News";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
const App = () => {
  const apiKey= process.env.REACT_APP_NEWS_API_KEY
  let category = 'general'
  let country = 'us'
  let pageSize = 12
  const [mode,setMode] = useState('light');

  const modeToggler=()=> {
    if(mode==='dark'){
      setMode('light');
      document.body.style.backgroundColor="white";
    }
    else{
      setMode('dark');
      document.body.style.backgroundColor="#042743";
    }
  } 
    return (
      <>
        <div>
          <Router>
          <NavBar mode={mode} apiKey={apiKey} modeToggler={modeToggler} />
          <Routes>
            <Route exact path='/' element={<News key="generalNews" mode={mode} apiKey={apiKey} pageSize={pageSize} category='general' country={country}/>}/>
            <Route exact path='/entertainment' element={<News key="entertainment" heading='NewsMonkey - Top Entertainment Headlines' mode={mode} apiKey={apiKey} pageSize={pageSize} category='entertainment' country={country}/>}/>
            <Route exact path='/business' element={<News key="business" heading='NewsMonkey - Top Business Headlines' mode={mode} apiKey={apiKey} pageSize={pageSize} category='business' country={country}/>}/>
            <Route exact path='/technology' element={<News key="technology" heading='NewsMonkey - Top Technology Headlines' mode={mode} apiKey={apiKey} pageSize={pageSize} category='technology' country={country}/>}/>
            <Route exact path='/sports' element={<News key="sports" heading='NewsMonkey - Top Sports Headlines' mode={mode} apiKey={apiKey} pageSize={pageSize} category='sports' country={country}/>}/>
            <Route exact path='/science' element={<News key="science"  heading='NewsMonkey - Top Science Headlines' mode={mode} apiKey={apiKey} pageSize={pageSize} category='science' country={country}/>}/>
            <Route exact path='/health' element={<News key="health" heading='NewsMonkey - Top Health Headlines' mode={mode} apiKey={apiKey} pageSize={pageSize} category='health' country={country}/>}/>
          </Routes>
          </Router>
        </div>
      </>
    );
}

export default App;

