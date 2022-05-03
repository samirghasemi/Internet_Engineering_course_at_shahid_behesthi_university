import * as actionTypes from './shopping-types'
import {DELETE_FROM_CART} from "./shopping-types";

const INITIAL_STATE = {
    products: [
        {
            "id": 0,
            "category": "notebook",
            "price": 1490,
            "detail": "this is notebook number111",
            "img": "https://images-americanas.b2w.io/produtos/01/00/item/132381/3/132381386G1.png",
            "size": "10 x 1400, 00",
            "title": "Notebook Lenovo Ideapad 320 Intel® Core i5-7200u 8GB"
        },
        {
            "id": 1,
            "category": "notebook",
            "price": 2300,
            "detail": "this is notebook number2",
            "img": "https://images-americanas.b2w.io/produtos/01/00/item/132381/3/132381386G1.png",
            "size": "13 x 1300, 00",
            "title": "Notebook Lenovo Ideapad 350 Intel® Core i5-7200u 8GB"
        },
        {
            "id": 2,
            "category": "notebook",
            "price": 2100,
            "detail": "this is notebook number3",
            "img": "https://images-submarino.b2w.io/produtos/01/00/sku/34470/9/34470934G1.jpg",
            "size": "10 x 1200, 00",
            "title": "Notebook Dell Alienware - i7 16GB"
        },
        {
            "id": 3,
            "category": "notebook",
            "price": 2000,
            "detail": "this is notebook number111",
            "img": "https://images-submarino.b2w.io/produtos/01/00/sku/34470/9/34470934G1.jpg",
            "size": "10 x 1400, 00",
            "title": "Notebook Dell Alienware - i7 12GB"
        },
        {
            "id": 4,
            "category": "notebook",
            "price": 1900,
            "detail": "this is notebook number111",
            "img": "https://images-submarino.b2w.io/produtos/01/00/sku/34470/9/34470934G1.jpg",
            "size": "10 x 1100, 00",
            "title": "Notebook Dell Alienware - i7 8GB"
        },
        {
            "id": 5,
            "category": "notebook",
            "price": 1777,
            "detail": "this is notebook number111",
            "img": "https://images-americanas.b2w.io/produtos/01/00/item/132260/6/132260681G1.jpg",
            "size": "10 x 1400, 00",
            "title": "Notebook Samsung Expert X22 Intel Core 7 i5 8GB"
        },
        {
            "id": 6,
            "category": "smartphone",
            "price": 1000,
            "detail": "this is mobile number1",
            "img": "https://images-americanas.b2w.io/produtos/01/00/item/132651/7/132651745G1.jpg",
            "size": "11 x 395, 00",
            "title": "iPhone 8 Dourado 64GB Tela 4.7"
        },
        {
            "id": 7,
            "category": "smartphone",
            "price": 900,
            "detail": "this is mobile number1",
            "img": "https://images-americanas.b2w.io/produtos/01/00/item/132474/0/132474081G1.png",
            "size": "10 x 395, 00",
            "title": "Smartphone Motorola Moto G5s Plus"
        },
        {
            "id": 8,
            "category": "smartphone",
            "price": 800,
            "detail": "this is mobile number8",
            "img": "https://images-americanas.b2w.io/produtos/01/00/item/133453/1/133453185G1.jpg",
            "size": "12 x 395, 00",
            "title": "Smartphone Motorola Moto G4 Plus"
        },
        {
            "id": 9,
            "category": "smartphone",
            "price": 750,
            "detail": "this is mobile number1",
            "img": "https://images-americanas.b2w.io/produtos/01/00/item/133453/1/133453185G1.jpg",
            "size": "10 x 395, 00",
            "title": "Smartphone Motorola Moto G5 Plus"
        },
        {
            "id": 10,
            "category": "smartphone",
            "price": 500,
            "detail": "this is mobile number1",
            "img": "https://images-submarino.b2w.io/produtos/01/00/item/133666/1/133666164G1.jpg",
            "size": "10 x 345, 00",
            "title": "Smartphone Motorola Moto G6 Plus"
        },
        {
            "id": 11,
            "category": "smartphone",
            "price": 444,
            "detail": "this is mobile number1",
            "img": "https://images-americanas.b2w.io/produtos/01/00/item/132474/0/132474081G1.png",
            "size": "10 x 395, 00",
            "title": "Smartphone Motorola Moto Z3 Play"
        }
    ],
    cart: [],
    currentItem: null
};

const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            let item = state.products.find(prod => prod.id == action.payload.id)
            const inCart = state.cart.find(prod =>
                prod.id == action.payload.id ? true : false)
            return {
                ...state,
                cart: inCart ?
                    state.cart.map((item) =>
                        item.id == action.payload.id ?
                            {...item , qty: item.qty +1}
                            :
                            item
                    )
                    :
                    [...state.cart,{...item ,qty: 1}]
            }
        case actionTypes.REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter(item => item.id != action.payload.id)
            }
        case actionTypes.REMOVE_ALL_FROM_CART:
            return {
                ...state,
                cart: []
            }
        // case actionTypes.ADJUST_QTY:
        //     return {
        //         ...state,
        //         cart:
        //             state.cart.map((item) =>
        //                 item.id == action.payload.id ?
        //                     {...item , qty: action.payload.qty}
        //                     :
        //                     item
        //             )
        //     }
        case actionTypes.DELETE_FROM_CART:
            let item1 = state.cart.find(prod => prod.id == action.payload.id)
            return {
                ...state,
                cart: item1.qty==1 ?
                    state.cart.filter(item => item.id != action.payload.id)
                    :
                    state.cart.map((item1) =>
                        item1.id == action.payload.id ?
                            {...item1 , qty: item1.qty - 1}
                            :
                            item1
                    )
            }
        case actionTypes.LOAD_CURRENT_ITEM:
            return {
                ...state,
                currentItem: action.payload,
            }
        default:
            return state;
    }
}

export default shopReducer;