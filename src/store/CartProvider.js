import React, {useReducer} from 'react';
import CartContext from './cart-context';

const initialCartstate = {
    items: [],
    totalAmount: 0,
};

const cartReducerFn = (state, action) => {
    if (action.type === 'ADD_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.itemInCart.id,
        );
        const existingCartItem = state.items[existingCartItemIndex];

        let updateItems;

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity:
                    existingCartItem.quantity + action.itemInCart.quantity,
            };
            updateItems = [...state.items];
            updateItems[existingCartItemIndex] = updatedItem;
        } else {
            updateItems = state.items.concat(action.itemInCart);
        }

        const updateTotalAmount =
            state.totalAmount +
            action.itemInCart.price * action.itemInCart.quantity;

        return {
            items: updateItems,
            totalAmount: updateTotalAmount,
        };
    }

    if (action.type === 'DELETE_ITEM') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.itemId,
        );
        const existingCartItem = state.items[existingCartItemIndex];

        let updatedItems;
        if (existingCartItem.quantity === 1) {
            updatedItems = state.items.filter(
                (item) => item.id !== action.itemId,
            );
        } else {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1,
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        const updateTotalAmount = state.totalAmount - existingCartItem.price;

        return {
            items: updatedItems,
            totalAmount: updateTotalAmount,
        };
    }
    return initialCartstate;
};

const CartProvider = (props) => {
    const [cartItemState, dispatchCartActionFn] = useReducer(
        cartReducerFn,
        initialCartstate,
    );

    const AddCartItemsHandler = (item) => {
        dispatchCartActionFn({type: 'ADD_ITEM', itemInCart: item});
    };
    const DeleteCartItemsHandler = (id) => {
        dispatchCartActionFn({type: 'DELETE_ITEM', itemId: id});
    };

    const cartContext = {
        items: cartItemState.items,
        totalAmount: cartItemState.totalAmount,
        addItems: AddCartItemsHandler,
        deleteItem: DeleteCartItemsHandler,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;
