import { useNavigate } from "react-router-dom";
import {addToList} from "../redux/actions";
import {useDispatch} from "react-redux";

function Table(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const coins = props.coins

    const saveId=(id)=>{
        dispatch(addToList(id))
        navigate("/search/"+id);
    }
    if (coins.length > 0) {
        return (
            <table className='search-table'>
                <thead>
                <tr style={{border: "none"}}>
                    <th>Coin</th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>Market Cap</th>
                </tr>
                </thead>
                <tbody>
                {coins.map(val => {
                    return (
                        <tr key={val.id}>
                            <td className='image-coin'>
                                <span><img src={val.image} alt=""/></span>
                                <span onClick={()=>saveId(val.id)}>
                                    <p style={{fontWeight:"700"}}>{val.symbol.toUpperCase()}</p>
                                    <p>{val.name}</p>
                                </span>
                            </td>
                            <td>{"$ "+val.current_price.toLocaleString()}</td>
                            <td style={{color: "red"}}>{val.price_change_percentage_24h}</td>
                            <td>{"$ "+parseInt(val.market_cap / 1000000).toLocaleString() + "M"}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        );

    } else {
        return;
    }
}

export default Table;