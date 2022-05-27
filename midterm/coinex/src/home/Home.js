import {Link} from "react-router-dom";
import Navbar from "./Navbar";
import styled from "styled-components";
import backgroundImageDark from "../assets/background.png"
import backgroundImageLight from "../assets/background-light.jpg"
import theme from "styled-theming";
import Card from "./Card";

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
  background-image: url(${backgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  max-width: 100%;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  justify-content: space-between;
  color: ${textColor};
`;
// const
const Home = () => (
    <Container>
        <Navbar/>
        <div className='home'>
            <div className='home-left-box'>
                <div className='home-left-box-inner'>
                    <h1>Search &</h1>
                    <h1>Buy <span>Crypto</span></h1>
                    <br/>
                    <p>Shahid Beheshti University</p>
                    <p>IE Final Project</p>
                    <p className='button'>
                        <Link to="/search" style={{textDecoration: 'none', color: '#fff'}}>
                            SEARCH MORE
                        </Link>
                    </p>

                </div>
            </div>
            <div className='home-right-box'>
                <div className='home-right-box-inner'>
                    <Card></Card>
                    <Card></Card>
                    <Card></Card>

                    {/*<p>hi!</p>*/}
                </div>
            </div>
        </div>
    </Container>
);


export default Home;