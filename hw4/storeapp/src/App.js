import {BrowserRouter, Routes, Route , Switch} from "react-router-dom";
import React from 'react';

import './App.css';
import Cart from "./component/cart/Cart";
import NotFound from "./component/NotFound";
import Stuffs from "./component/stuff/Stuffs";
import Stuff from "./component/stuff/Stuff";
import Navbar from "./component/Navbar";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navbar/>
                <Switch>
                    <Route exact path="/" children={<Stuffs type={''}/>}/>
                    <Route path="/stuffs/:id" component={Stuff}/>
                    <Route exact path="/stuffs" children={<Stuffs type={''}/>}/>
                    <Route path="/smartphones" children={<Stuffs type={'smartphone'}/>}/>
                    <Route path="/laptops" children={<Stuffs type={'notebook'}/>}/>
                    <Route path="/cart" children={<Cart/>}/>
                    <Route component={NotFound} />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
