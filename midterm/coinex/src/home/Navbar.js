import './index.css';
// import DarkThemeButton from "../DarkThemeButton";
import theme from "styled-theming";
import styled from "styled-components";
import {TOGGLE_DARKTHEME} from "../redux/actions";
import {useDispatch} from "react-redux";

export const borderColor = theme("theme", {
    dark: "#fff",
    light: "#10002B",
});


const Button =styled.div`
  margin-right: 5%;
  border-radius: 20px;
  border-style: solid;
  border-width: 2px;
  border-color: ${borderColor};
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
        <div className='navbar'>
            <Button onClick={() => dispatch({type: TOGGLE_DARKTHEME})}>
                Change Theme
            </Button>
        </div>
    );
}
export default Navbar;