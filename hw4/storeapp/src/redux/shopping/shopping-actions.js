import * as actionTypes from './shopping-types'
export const addToCart = (itemID) => {
    return{
        type: actionTypes.ADD_TO_CART,
        payload:{
            id: itemID
        }
    }
}

export const removeFromCart = (itemID) => {
    return{
        type: actionTypes.REMOVE_FROM_CART,
        payload:{
            id: itemID
        }
    }
}

export const removeAllFromCart = () => {
    return{
        type: actionTypes.REMOVE_ALL_FROM_CART,
    }
}

export const deleteFromCart = (itemID) => {
    return{
        type: actionTypes.DELETE_FROM_CART,
        payload:{
            id: itemID
        }
    }
}

// export const adjustQTY = (itemID , value) => {
//     return{
//         type: actionTypes.ADJUST_QTY,
//         payload:{
//             id: itemID,
//             qty: value
//         }
//     }
// }

export const loadCurrentItem = (item) => {
    return{
        type: actionTypes.LOAD_CURRENT_ITEM,
        payload: item
    }
}
