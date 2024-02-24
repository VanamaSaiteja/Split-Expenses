import React from 'react';
import { useTripContext } from './Trip-context';

const usePayments = () => {
    const [total, setTotal] = React.useState();
    const [transactions, setTransactions] = React.useState();

    const { getPayments, txns: expenses } = useTripContext();

    React.useEffect(() => {
        const payInstance = getPayments();
        const txns = payInstance.getPayments();
        
        setTotal(payInstance.getTotal());
        setTransactions(txns);
    }, [getPayments]);

    return [total, transactions, expenses];
};

export default usePayments;
