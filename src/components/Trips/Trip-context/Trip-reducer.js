import {
    addFriend,
    addTxn,
    removeTxn,
    removeFriend,
    updateFriendName,
} from "./Trip-reducer-functions";

export const initialState = {
    friends: [],
    txns: [],
    currency: 'INR'
};

function TripReducer(state, action) {
    switch (action.type) {
        case "ADD_FRIEND":
            action.friendInput.name = action.friendInput.name.trim();
            if (action.friendInput.name === "") {
                return state;
            }
            return {
                ...state,
                ...addFriend(state.friends, state.txns, action.friendInput),
            };

        case "REMOVE_FRIEND":
            return {
                ...state,
                ...removeFriend(state.friends, state.txns, action.friendId),
            };

        case "UPDATE_FRIEND":
            return {
                ...state,
                ...updateFriendName(
                    state.friends,
                    action.friendId,
                    action.friendName
                ),
            };

        case "ADD_TXN":
            return {
                ...state,
                ...addTxn(
                    state.friends,
                    state.txns,
                    action.friendId,
                    action.txnInput
                ),
            };

        case "REMOVE_TXN":
            return {
                ...state,
                ...removeTxn(state.txns, action.txnId),
            };

        case "UPDATE_TXN":
            const updatedTxns = state.txns.map((txn) => {
                if (txn.id === action.txnId) {
                    txn.amount = action.amount;
                    if( action.reason ) {
                        txn.reason = action.reason;
                    }
                }
                return txn;
            });
            return {
                ...state,
                txns: updatedTxns,
            };

        case "RESET":
            return {
                ...initialState,
                currency: state.currency
            };

        case "UPDATE_CURRENCY":
            return {
                ...state,
                currency: action.currency
            };

        case "ENTIRE_STATE":
            return {
                ...state,
                ...action.state
            };
    }

    return state;
}

export default TripReducer;
