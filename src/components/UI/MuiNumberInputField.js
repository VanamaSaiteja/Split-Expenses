import React from "react";
import TextField from "@mui/material/TextField";

const MuiNumberInputField = React.forwardRef((props, ref) => (
    <TextField
        autoComplete="false"
        autoCapitalize="false"
        autoCorrect="false"
        inputRef={ref}
        size="small"
        type="number"
        inputProps={{
            step: "any",
        }}
        {...props}
        value={props.value ? (props.value <= 0 ? "" : props.value) : ""}
    />
));

export default MuiNumberInputField;
