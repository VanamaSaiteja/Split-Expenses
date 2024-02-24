import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Stack from '@mui/material/Stack';
import PersonIcon from "@mui/icons-material/Person";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

const sxInputBox = {
    p: "2px 4px",
    mt: "1rem",
    display: "flex",
    alignItems: "center",
    width: "100%"
};

const sxInput = {
    ml: 1,
    flexGrow: 1
};

const AddFriend = () => {
    const { friends, addFriend } = useTripContext();
    const [name, setName] = useState("");

    const reset = () => {
        setName("");
    };

    const _addFriend = () => {
        const _name = name.toLowerCase();

        if (!_name) return;

        const exists = friends.find((friend) => friend.name.toLowerCase() === _name);

        if (
            !exists ||
            (exists && window.confirm("Name already exists! Continue?"))
        ) {
            addFriend({ name });
            reset();
        }
    };

    const onNameChangeEvent = (e) => {
        setName(e.target.value);
    };

    const onNameKeyDownEvent = (e) => {
        if (e.key.toLowerCase() === "enter") {
            _addFriend();
        }
    };

    const onAddFriendEvent = (e) => {
        _addFriend();
    };

    useEffect(() => {
        reset();
    }, [friends.length]);

    return (
        <Stack spacing={2}>
            <Paper component="div" sx={sxInputBox} square={true} variant="outlined">
                <IconButton>
                    <PersonIcon />
                </IconButton>
                <InputBase
                    onChange={onNameChangeEvent}
                    onKeyDown={onNameKeyDownEvent}
                    value={name}
                    sx={sxInput}
                    placeholder="Add friend"
                />
                <Button
                    type="button"
                    onClick={onAddFriendEvent}
                    aria-label="search"
                >
                    <Box fontSize="1.2rem">+</Box>
                </Button>
            </Paper>
        </Stack>
    );
};

export default AddFriend;
