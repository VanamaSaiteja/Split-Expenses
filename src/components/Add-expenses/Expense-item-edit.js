import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem"; // Add MenuItem import
import MuiNumberInputField from "../UI/MuiNumberInputField";

const ExpenseItemEdit = ({ open = true, title, amount, reason, close, save }) => {
    const [newAmount, setNewAmount] = useState(amount);
    const [newReason, setNewReason] = useState(reason);

    const onUpdatingAmt = (e) => {
        setNewAmount(Number(e.target.value));
    };

    const onReasonUpdate = (e) => {
        setNewReason(e.target.value);
    };

    const onUpdateAmtCancel = () => {
        close();
    };

    const onUpdateAmtSubmit = (e) => {
        e.preventDefault();

        if (!newAmount || newAmount <= 0) {
            alert("Invalid amount. Please enter a valid amount.");
            return;
        }

        save(newAmount, newReason);
        close();
    };

    useEffect(() => {
        setNewAmount(amount);
        setNewReason(reason);
    }, [open, amount, reason]);

    return (
        <Dialog open={open} onClose={close} scroll="paper" maxWidth="xs">
            <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <form onSubmit={onUpdateAmtSubmit}>
                    <Grid container alignItems="center" wrap="nowrap">
                        <Grid item>
                            <MuiNumberInputField
                                value={newAmount}
                                onChange={onUpdatingAmt}
                                autoFocus={true}
                                placeholder="Amount"
                                required
                            />
                        </Grid>
                        <Grid item>
                            <IconButton type="submit">
                                <Check />
                            </IconButton>
                            <IconButton onClick={onUpdateAmtCancel}>
                                <Clear />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <FormControl margin="dense" fullWidth>
                        <TextField
                            value={newReason}
                            size="small"
                            placeholder="Reason (optional)"
                            type="text"
                            onChange={onReasonUpdate}
                        />
                    </FormControl>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ExpenseItemEdit;
