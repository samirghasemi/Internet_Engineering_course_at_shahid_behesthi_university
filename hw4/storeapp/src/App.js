import {BrowserRouter, Routes, Route} from "react-router-dom";
import React from 'react';

import './App.css';
import Cart from "./component/Cart";
import NotFound from "./component/NotFound";
import Stuffs from "./component/Stuffs";
import Stuff from "./component/Stuff";
import Navbar from "./component/Navbar";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Routes>
                    <Route exact path="/" element={< Stuffs/>}/>
                    <Route exact path="/stuffs" element={< Stuffs/>}/>
                    <Route exact path="/smartphones" element={< Stuffs/>}/>
                    <Route exact path="/laptops" element={< Stuffs/>}/>
                    <Route path="/stuffs/:id" element={< Stuff/>}/>
                    <Route exact path="/cart" element={< Cart/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
