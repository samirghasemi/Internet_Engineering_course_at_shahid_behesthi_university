import {BrowserRouter,Switch,Route} from "react-router-dom";
import Movies from './Movies'
import MovieDetail from './MovieDetail'
import NotFound from './NotFound'
import React from 'react';

export default function App() {
    return ( 
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Movies} />
                <Route path='/movies/:id' component={MovieDetail} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    )    
}
