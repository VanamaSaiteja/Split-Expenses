import SplitPaymentCalculator from "../../../services/SplitPaymentCalculator";

export const getConsolidatedExpenses = (txns) => {
    const _txns = txns.reduce((acc, txn) => {
        const friend_id = txn.friend.id;
        const amount = parseFloat(txn.amount.toFixed(2));

        if (acc[friend_id]) {
            acc[friend_id]["amount"] += amount;
        } else {
            acc[friend_id] = { ...txn };
        }

        return acc;
    }, {});

    return Object.values(_txns);
};

export class Payments {
    constructor(payment) {
        this.payment = payment;
    }

    getTotal() {
        return this.payment.get_total();
    }

    getPayments() {
        return this.payment.get_transactions();
    }
}
