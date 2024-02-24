import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useTripContext } from "./Trip-context/Trip-context";

// const defaultCurrency = {
//     name: "Indian Rupee",
//     code: "INR"
// };

const TripHeader = () => {
    const { currency, reset, changeCurrency } = useTripContext();
    const [currencies, setCurrencies] = useState([]);

    const resetTrip = (e) => {
        e.preventDefault();
        if (window.confirm("Are you sure? All data will be lost.")) {
            reset();
        }
    };

    // const onCurrencyChange = (e, value) => {
    //     changeCurrency(value.code);
    // };

    const getSelectedCurrency = () => {
        const selected = currencies.find((c) => c.code === currency);
        return selected || defaultCurrency;
    };

    useEffect(() => {
        import("../../utils/currencies.json").then((currencies) =>
            setCurrencies(currencies.default)
        );
    }, []);

    return (
        <Grid
            container
            borderBottom={1}
            borderColor="divider"
            wrap="nowrap"
            alignItems="center"
            justifyContent="space-between"
        >
            <Grid item xs={6}>
                <IconButton onClick={resetTrip}>
                    <RefreshIcon />
                </IconButton>
            </Grid>
            {/* <Grid item xs={6}>
                <FormControl size="small" fullWidth>
                    {!currencies.length ? (
                        <p>Loading currencies...</p>
                    ) : (
                        <Autocomplete
                            disablePortal
                            options={currencies}
                            size="small"
                            getOptionLabel={(currency) => currency.name}
                            onChange={onCurrencyChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Select Currency"
                                    size="small"
                                />
                            )}
                            value={getSelectedCurrency()}
                        />
                    )}
                </FormControl>
            </Grid> */}
        </Grid>
    );
};

export default TripHeader;
