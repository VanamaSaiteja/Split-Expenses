let lastId = 0;

export const randomId = () => {
    return Math.floor(Math.random() * 1000) + ++lastId;
};

class SplitPaymentCalcClass {
    constructor(expenses) {
        this.expenses = expenses;
        this.total = this.calculate_total();
    }

    get_transactions() {
        const [bins, items] = this.calculate_bins_and_items();

        if (bins.length === 1) {
            const bin = bins[0];

            return items.map((item) => ({
                id: randomId(),
                from_friend: item.friend,
                to_friend: bin.friend,
                amount: item.amount.toFixed(2),
            }));
        }

        const result = [];

        items.forEach((item) => {
            let item_amount = item.amount;

            for (let i = 0, len = bins.length; i < len; i++) {
                const bin = bins[i];

                if (+bin.amount.toFixed(1) >= +item_amount.toFixed(1)) {
                    bin.amount -= item_amount;
                    result.push({
                        id: randomId(),
                        from_friend: item.friend,
                        to_friend: bin.friend,
                        amount: item_amount.toFixed(2),
                    });
                    return;
                }
            }

            bins.forEach((bin) => {
                if (item_amount <= 0 || bin.amount <= 0) return;

                let amount;

                if (+item_amount.toFixed(1) >= +bin.amount.toFixed(1)) {
                    item_amount -= bin.amount;
                    amount = bin.amount;
                } else {
                    bin.amount -= item_amount;
                    amount = item_amount;
                }

                result.push({
                    id: randomId(),
                    from_friend: item.friend,
                    to_friend: bin.friend,
                    amount: amount.toFixed(2),
                });
            });
        });

        return result;
    }

    calculate_bins_and_items() {
        const total = this.calculate_total();
        const total_people = this.calculate_people();
        const individual_share = total / total_people;

        let bins = [];
        let items = [];

        this.expenses.forEach((exp) => {
            if (exp.amount > individual_share) {
                bins.push({
                    friend: exp.friend,
                    amount: exp.amount - individual_share,
                });
            } else if (exp.amount < individual_share) {
                items.push({
                    friend: exp.friend,
                    amount: individual_share - exp.amount,
                });
            }
        });

        return [bins, items];
    }

    calculate_total() {
        return Object.values(this.expenses).reduce(
            (a, expense) => a + expense.amount,
            0
        );
    }

    calculate_people() {
        return this.expenses.length;
    }

    get_expenses() {
        return this.expenses;
    }

    get_total() {
        return this.total;
    }
}

export default SplitPaymentCalcClass;
