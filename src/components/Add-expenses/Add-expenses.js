import React, { useRef, useState } from "react";
import { useTripContext } from "../Trips/Trip-context/Trip-context";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import MuiNumberInputField from "../UI/MuiNumberInputField";
import ExpensesList from "./Expenses-list";

const AddExpenses = () => {
    const { friends, addTxn } = useTripContext();
    const amtInputRef = useRef(null);
    const [selectedFriend, setSelectedFriend] = useState(undefined);
    const [txnAmount, setTxnAmount] = useState(undefined);
    const [reason, setReason] = useState();

    const onTxnAmountChange = (e) => {
        setTxnAmount(Number(e.target.value));
    };

    const onFriendChange = (e) => {
        const id = parseInt(e.target.value);
        if (id) {
            setSelectedFriend(id);
        }
    };

    const onReasonChange = (e) => {
        setReason(e.target.value);
    };

    const onTxnSubmit = (e) => {
        e.preventDefault();

        if (!selectedFriend) {
            return alert("Please select a friend");
        }

        if (!txnAmount || txnAmount <= 0) {
            return alert("Invalid transaction amount");
        }

        addTxn(selectedFriend, {
            amount: txnAmount,
            reason
        });

        amtInputRef.current?.focus();
        amtInputRef.current?.select();
    };

    return (
        <div>
            <Box marginBottom=".875rem">
                <Typography
                    variant="h6"
                    fontWeight="bold"
                >
                    Add expenses
                </Typography>
                <Typography variant="subtitle2">
                    Select friend, input amount, and add expense
                </Typography>
            </Box>
            <form onSubmit={onTxnSubmit}>
                <Grid
                    container
                    spacing={1}
                    wrap="nowrap"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Grid
                        item
                        xs={7}
                        sm={8}
                    >
                        <FormControl
                            size="small"
                            fullWidth
                        >
                            <TextField
                                id="demo-customized-select"
                                value={String(selectedFriend ?? "0")}
                                select={true}
                                size="small"
                                onChange={onFriendChange}
                                required
                            >
                                <MenuItem value="0">
                                    <small>Friend</small>
                                </MenuItem>
                                {friends.map((friend) => (
                                    <MenuItem key={friend.id} value={friend.id}>
                                        {friend.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs={4}
                        sm={3}
                    >
                        <FormControl fullWidth>
                            <MuiNumberInputField
                                value={txnAmount}
                                onChange={onTxnAmountChange}
                                placeholder="Amount"
                                required
                            />
                        </FormControl>
                    </Grid>
                    <Grid
                        item
                        xs
                        textAlign="center"
                    >
                        <IconButton type="submit">
                            <AddCircleIcon color="primary" />
                        </IconButton>
                    </Grid>
                </Grid>
                <FormControl margin="dense" fullWidth>
                    <TextField
                        value={reason}
                        size="small"
                        placeholder="Reason (optional)"
                        type="text"
                        onChange={onReasonChange}
                    />
                </FormControl>
            </form>

            <Divider />

            <ExpensesList />
        </div>
    );
};

export default AddExpenses;
