import './index.css';
import theme from "styled-theming";
import styled from "styled-components";
import {TOGGLE_DARKTHEME} from "../redux/actions";
import {useDispatch} from "react-redux";

export const backgroundColor = theme("theme", {
    light: "#EEBC1D",
    dark: "#15161A",
});

export const textColor = theme("theme", {
    dark: "#EEBC1D",
    light: "#10002B",
});

const SearchNavbar =styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 100%;
  height: 10vh;
  background-color: ${backgroundColor};
  
`;

const Button =styled.div`
  margin-right: 8%;
  color: ${textColor};
  font-size: 15px;
  padding: 10px 20px 10px 20px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Logo =styled.div`
  margin-left: 8%;
  color: ${textColor};
  font-size: 20px;
  font-weight: bold;
  padding: 10px 20px 10px 20px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

function Navbar() {
    const dispatch = useDispatch();

    return (
        <SearchNavbar>
            <Logo>
                <p>IE Final Project</p>
            </Logo>
            <Button onClick={() => dispatch({type: TOGGLE_DARKTHEME})}>
                Change Theme
            </Button>
        </SearchNavbar>
    );
}
export default Navbar;