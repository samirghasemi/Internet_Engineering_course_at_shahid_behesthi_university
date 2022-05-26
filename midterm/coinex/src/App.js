import React from "react";
import {Routes, Route, Link} from "react-router-dom";
import Home from "./home/Home";
import Search from "./search/Search";
import "./index.css"

const App = () => (
    <div className='container'>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
        </Routes>
    </div>
);

export default App;