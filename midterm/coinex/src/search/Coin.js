import React from 'react';
import {useState} from "react";
import backgroundImageDark from "../assets/banner.jpg"
import theme from "styled-theming";
import styled from "styled-components";
import Navbar from "./Navbar";
import Table from "./table";
import {useParams} from "react-router-dom";

export const backgroundImage = theme("theme", {
    light: backgroundImageDark,
    dark: backgroundImageDark,
});

export const backgroundColor = theme("theme", {
    light: "#fff",
    dark: "#15161A",
});

export const textColor1 = theme("theme", {
    light: "#000",
    dark: "#fff",
});

export const textColor2 = theme("theme", {
    light: "#000",
    dark: "#fff",
});
const Container = styled.div`
  min-height: 100vh;
  max-width: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: flex-start;
  color: ${textColor1};
  background: ${backgroundColor};
`;

const Form = styled.div`
  width: 80%;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  color: ${textColor2};
  background: ${backgroundColor};
`;

class Coin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coin: {},
            url: '',
            title:'',
            desc:'',
            rank: '',
            price: '',
            cap:'',
            error: false
        }
    }

    fetchDataFromCoingecko = (txt) => {
        fetch('https://api.coingecko.com/api/v3/coins/' + txt)
            .then(res => res.json())
            .then(item => this.setState({title: item.name , url: item.image.large , desc: item.description.en,
                rank: item.market_cap_rank,
                price: item.market_data.current_price.usd,
                cap: item.market_data.market_cap.usd
                })
            ).catch(e => this.setState({error: true}))

    }


    componentDidMount() {
        this.fetchDataFromCoingecko(this.props.id)
    }

    render() {
        return (
            <Container>
                <Navbar/>
                <div className='coin'>
                    <img src={this.state.url} alt=""/>
                    <h1>{this.state.title}</h1>
                    <p>{this.state.desc}</p>
                    <h2>{"Rank: "+this.state.rank}</h2>
                    <h2>{"Current Price: $ "+this.state.price.toLocaleString()}</h2>
                    <h2>{"Market Cap: $"+parseInt(this.state.cap / 1000000).toLocaleString() + "M"}</h2>
                </div>
            </Container>
        );
    }
}

export default Coin;