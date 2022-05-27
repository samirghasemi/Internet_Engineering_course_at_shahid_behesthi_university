import React from 'react';
import {useState} from "react";
import backgroundImageDark from "../assets/banner.jpg"
import theme from "styled-theming";
import styled from "styled-components";
import Navbar from "./Navbar";
import Table from "./table";
import {useParams} from "react-router-dom";
import Coin from "./Coin";


function CoinF() {
    const [coin, setCoin] = useState([]);
    let { id } = useParams();
    return (
        <Coin id={id}/>
    );
}
export default CoinF;