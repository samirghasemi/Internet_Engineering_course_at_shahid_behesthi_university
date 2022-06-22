import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./home/Home";
import Search from "./search/Search";
import "./index.css"
import CoinF from "./search/CoinF";

const App = () => (
    <div className='container'>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/search" element={<Search/>}/>
            <Route path="/search/:id" element={<CoinF/>}/>
        </Routes>
    </div>
);

export default App;