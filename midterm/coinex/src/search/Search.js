import backgroundImageDark from "../assets/banner.jpg"
import theme from "styled-theming";
import styled from "styled-components";
import Navbar from "./Navbar";

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
  margin:  10px auto;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  color: ${textColor2};
  background: ${backgroundColor};
`;

const Search = () =>(
    <Container>
        <Navbar/>
        <div className='search-banner'>
            <h1>Search Coin</h1>
            <p>Get information From Here</p>
        </div>
        <Form>
            <h3 className='form-title'>Cryptocurrency Prices By Market Cap</h3>
            <input className='form-input' type="text" placeholder='Search For a Crypto Currency'/>
        </Form>
    </Container>
);

export default Search;