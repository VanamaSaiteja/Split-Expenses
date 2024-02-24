import {
    getInitialsFromName,
    getRandomColor,
    randomId,
} from "../../../utils/helpers";

export const addFriend = (
    friends,
    txns,
    friend
) => {
    const newFriend = {
        id: randomId(),
        ...friend,
        color: getRandomColor(),
        initials: getInitialsFromName(friend.name),
    };
    const newEmptyTxn = {
        id: randomId(),
        amount: 0,
        friend: newFriend,
    };

    return {
        friends: [...friends, newFriend],
        txns: [...txns, newEmptyTxn],
    };
};

export const removeFriend = (
    friends,
    txns,
    friendId
) => {
    return {
        friends: friends.filter((friend) => friend.id !== friendId),
        txns: txns.filter((txn) => txn.friend.id !== friendId),
    };
};

export const updateFriendName = (
    friends,
    friendId,
    friendName
) => {
    const uFriends = friends.map((friend) => {
        if (friend.id === friendId) {
            if (friend.name !== friendName) {
                friend.initials = getInitialsFromName(friendName);
            }
            friend.name = friendName;
        }
        return friend;
    });
    return { friends: uFriends };
};

export const addTxn = (
    friends,
    txns,
    friendId,
    txnInput
) => {
    const atFriend = friends.find((friend) => friend.id === friendId);
    if (atFriend) {
        const existingZeroAmtTxn = txns.find(
            (t) => t.friend.id === atFriend.id && t.amount === 0
        );

        if (existingZeroAmtTxn) {
            const atTxns = txns.map((t) => {
                if (t.friend.id === atFriend.id && t.amount === 0) {
                    t.amount = txnInput.amount;
                    if( txnInput.reason ) {
                        t.reason = txnInput.reason;
                    }
                }
                return t;
            });

            return { txns: atTxns };
        }

        return {
            txns: [
                ...txns,
                {
                    ...txnInput,
                    id: randomId(),
                    friend: atFriend,
                },
            ],
        };
    }
};

export const removeTxn = (
    txns,
    txnId,
) => {
    let map = {};
    txns.forEach(txn => {
        map[txn.friend.id] = 1 + (map[txn.friend.id] || 0);
    });

    return {
        txns: txns.reduce((acc, txn) => {
            if( txn.id === txnId ) {
                if( map[txn.friend.id] === 1 ) {
                    acc.push({
                        ...txn,
                        amount: 0,
                        reason: undefined
                    });
                }
            } else {
                acc.push(txn);
            }
            return acc;
        }, [])
    };
};
