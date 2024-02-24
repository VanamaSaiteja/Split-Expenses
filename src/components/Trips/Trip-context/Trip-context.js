import React, { useState, useRef, useCallback, useMemo, useEffect, createContext, useReducer, useContext } from "react";
import { numToPrice } from "../../../utils/helpers";
import TripReducer, { initialState } from "./Trip-reducer";
import SplitPaymentCalculator from "../../../services/SplitPaymentCalculator";
import { getConsolidatedExpenses, Payments } from "./Trip-utils";

const TripContext = createContext(undefined);
TripContext.displayName = "TripContext";

export const useTripContext = () => {
    const context = useContext(TripContext);
    if (context === undefined) {
        throw new Error("useTripsContext must be used within a TripProvider");
    }
    return context;
};

function TripProvider(props) {
    const [state, dispatch] = useReducer(TripReducer, initialState);
    const isMounted = useRef(false);
    const memoizedPayments = useRef();

    const addFriend = (friendInput) => dispatch({ type: "ADD_FRIEND", friendInput });
    const removeFriend = (friendId) => dispatch({ type: "REMOVE_FRIEND", friendId });
    const updateFriendName = (friendId, friendName) => dispatch({ type: "UPDATE_FRIEND", friendId, friendName });
    const addTxn = (friendId, txnInput) => dispatch({ type: "ADD_TXN", friendId, txnInput });
    const updateTxn = (txnId, amount, reason = '') => dispatch({ type: "UPDATE_TXN", txnId, amount, reason });
    const removeTxn = (txnId) => dispatch({ type: "REMOVE_TXN", txnId });
    const reset = () => dispatch({ type: "RESET" });
    const changeCurrency = (currency) => dispatch({ type: "UPDATE_CURRENCY", currency });

    const toPrice = useCallback(
        (price) => {
            return numToPrice(price, state.currency);
        },
        [state.currency]
    );

    useEffect(() => {
        memoizedPayments.current = undefined;
    }, [state.txns]);

    const getPayments = useCallback(() => {
        if (!memoizedPayments.current) {
            const payments = new SplitPaymentCalculator(getConsolidatedExpenses(state.txns));
            memoizedPayments.current = new Payments(payments);
        }
        return memoizedPayments.current;
    }, [state.txns]);

    const value = useMemo(
        () => ({
            ...state,
            addFriend,
            removeFriend,
            updateFriendName,
            addTxn,
            updateTxn,
            removeTxn,
            reset,
            changeCurrency,
            toPrice,
            getPayments
        }),
        [state, toPrice, getPayments]
    );

    const tripid = props.tripid;

    useEffect(() => {
        try {
            const lsState = localStorage.getItem(`trip-${tripid}`);
            if (lsState) {
                const savedState = JSON.parse(lsState);
                dispatch({ type: "ENTIRE_STATE", state: savedState });
                return;
            }
        } catch (e) {
            console.log(e);
        }

        isMounted.current = true;
    }, [tripid]);

    useEffect(() => {
        if (isMounted.current) {
            localStorage.setItem(`trip-${tripid}`, JSON.stringify(state));
        } else {
            isMounted.current = true;
        }
    }, [state, tripid]);

    return (
        <TripContext.Provider value={value} {...props} />
    );
}

export default TripProvider;
