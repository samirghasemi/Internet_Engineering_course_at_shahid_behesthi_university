import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import backgroundImageDark from "../assets/background.png"
import backgroundImageLight from "../assets/background-light.jpg"
import theme from "styled-theming";

export const backgroundImage = theme("theme", {
    light: backgroundImageLight,
    dark: backgroundImageDark,
});

export const backgroundColor = theme("theme", {
    light: "#fff",
    dark: "#10002B",
});

export const textColor = theme("theme", {
    light: "#000",
    dark: "#fff",
});

const Container = styled.div`
  width: 20%;
  height: 50px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: space-between;
  color: ${textColor};
  border: solid 2px;
  border-radius: 20px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 20px;


`;
// const
const val = {
    image: "https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png?1547033579",
    name: 'Bitcoin',
    price: 29263
};
const Card = () => (
    <Container>
        <span>
            <img src={val.image} alt=""/>
        </span>
        <span>
            <p style={{fontWeight: "700"}}>{"$ "+ val.price}</p>
            <p>{val.name}</p>
        </span>
    </Container>
);



export default Card;