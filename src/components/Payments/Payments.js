import React, { useState, useEffect, Suspense } from "react";
import { useTripContext } from "../Trips/Trip-context/Trip-context";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import PaymentsList from "./Payments-list";

// const PaymentsShare = React.lazy(() => import("./Payments-share"));

const Payments = () => {
    const { friends, getPayments } = useTripContext();

    const [total, setTotal] = useState();
    const [transactions, setTransactions] = useState();
    const [filteredTxns, setFilteredTxns] = useState();
    const [friend, setFriend] = useState("0");
    const [share, setShare] = useState(false);

    const onFriendChange = (e) => {
        setFriend(e.target.value ?? "0");
        const friendId = Number(e.target.value);

        if (friendId && friendId > 0) {
            setFilteredTxns(
                transactions?.filter((txn) => txn.from_friend.id === friendId)
            );
        } else {
            setFilteredTxns(transactions);
        }
    };

    useEffect(() => {
        const payInstance = getPayments();
        const transactions = payInstance.getPayments();

        setTotal(payInstance.getTotal());
        setTransactions(transactions);
        setFilteredTxns(transactions);
    }, [getPayments]);

    return (
        <>
            <Box>
                <Box display="flex" justifyContent="space-between">
                    {/* <IconButton onClick={() => setShare(true)} disabled={share}>
                        <ShareIcon />
                    </IconButton> */}
                    <FormControl size="small">
                        <TextField
                            value={String(friend ?? "0")}
                            select
                            size="small"
                            onChange={onFriendChange}
                            required
                        >
                            <MenuItem value="0">
                                <small>All Friends</small>
                            </MenuItem>
                            {friends.map((friend) => (
                                <MenuItem key={friend.id} value={friend.id}>
                                    {friend.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </FormControl>
                </Box>
                {filteredTxns && <PaymentsList txns={filteredTxns} />}
                {total ? (
                    <p>
                        Total:{" "}
                        <b>
                            <em>{total}</em>
                        </b>
                    </p>
                ) : null}
            </Box>

            {/* <Suspense fallback={<div>Loading...</div>}>
                <PaymentsShare isOpen={share} closeModal={() => setShare(false)} />
            </Suspense> */}
        </>
    );
};

export default Payments;
