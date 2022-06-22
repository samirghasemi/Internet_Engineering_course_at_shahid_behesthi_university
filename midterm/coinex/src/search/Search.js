import {useState} from "react";
import backgroundImageDark from "../assets/banner.jpg"
import theme from "styled-theming";
import styled from "styled-components";
import Navbar from "./Navbar";
import Table from "./table";

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


function Search() {
    const [coins, setCoins] = useState([]);
    const fetchDataFromCoingecko = (txt) => {
        if (txt != '') {
            fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h&ids=' + txt)
                .then(res => res.json())
                .then(item => setCoins(item)
                ).catch(e => setCoins([]))
        }
    }

    return (
        <Container>
            <Navbar/>
            <div className='search-banner'>
                <h1>Search Coin</h1>
                <p>Get information From Here</p>
            </div>
            <Form>
                <h3 className='form-title'>Cryptocurrency Prices By Market Cap</h3>
                <input className='form-input' type="text" placeholder='Search For a Crypto Currency'
                       onChange={e => fetchDataFromCoingecko(e.target.value)}/>
                <Table coins={coins}/>
            </Form>
        </Container>
    );
}


export default Search;