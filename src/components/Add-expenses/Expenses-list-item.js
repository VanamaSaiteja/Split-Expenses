import React, { useState, useRef, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTripContext } from "../Trips/Trip-context/Trip-context";
import ExpenseItemEdit from "./Expense-item-edit";

const sxAvatar = { fontSize: "18px", fontWeight: "400" };

const ExpensesListItem = ({ txn }) => {
    const friend = txn.friend;
    const { updateTxn, removeTxn, toPrice } = useTripContext();
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);

    const onTxnRemove = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure?")) {
            removeTxn(txn.id);
        }
    };

    const startEditing = () => {
        setEditing(true);
        inputRef.current?.focus();
        inputRef.current?.select();
    };

    const updateExpense = (amount, reason) => {
        updateTxn(txn.id, amount, reason);
    };

    useEffect(() => {
        const resetField = (e) => {
            if (e.key.toLocaleLowerCase() === "escape") {
                setEditing(false);
            }
        };
        window.addEventListener("keyup", resetField);
        return () => {
            window.removeEventListener("keyup", resetField);
        };
    }, [txn]);

    return (
        <Grid
            container
            spacing="2"
            justifyContent="space-between"
            alignItems="center"
            wrap="nowrap"
        >
            <Grid
                item
                xs
                container
                alignItems="center"
                wrap="nowrap"
            >
                <Avatar
                    sx={{
                        ...sxAvatar,
                        backgroundColor: friend.color?.backgroundColor,
                        color: friend.color?.color,
                    }}
                >
                    {friend.initials}
                </Avatar>
                <Grid
                    item
                    xs
                    marginLeft="8px"
                >
                    <b>{friend.name}</b> paid {" "}
                    <b>{toPrice(txn.amount)}</b>
                    {txn.reason ? (
                        <div>
                            <small>({txn.reason})</small>
                        </div>
                    ) : null}
                </Grid>
            </Grid>
            {!editing && (
                <Grid
                    item
                    xs
                    textAlign="right"
                    justifyContent="flex-end"
                    container
                    alignItems="center"
                >
                    <IconButton onClick={() => startEditing()}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={onTxnRemove}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            )}
            {editing && (
                <ExpenseItemEdit
                    open={editing}
                    title={`${friend.name} paid ${toPrice(txn.amount)}`}
                    amount={txn.amount}
                    reason={txn.reason}
                    close={() => setEditing(false)}
                    save={updateExpense}
                />
            )}
        </Grid>
    );
};

export default ExpensesListItem;
