import * as React from "react";
import { SelectChangeEvent } from "@mui/material/Select";

/**
 * @typedef {import("@mui/material/Select").SelectChangeEvent} SelectChangeEvent
 * @typedef {(event: HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement) => void} MuiInputSelectType
 */
export const MuiInputSelectType = 
    React.ChangeEvent;
