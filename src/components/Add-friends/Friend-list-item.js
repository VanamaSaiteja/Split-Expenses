import React, { useState, useCallback } from "react";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Check from "@mui/icons-material/Check";
import Clear from "@mui/icons-material/Clear";
import { useTripContext } from "../Trips/Trip-context/Trip-context";

const sxAvatar = { fontSize: "18px", fontWeight: "400" };
const sxForm = { display: "flex" };

const FriendListItem = ({ friend }) => {
    const { removeFriend, updateFriendName } = useTripContext();
    const [editing, setEditing] = useState(false);
    const [newName, setNewName] = useState(friend.name);

    const onRemoveFriend = useCallback((id) => {
        if (window.confirm("Are you sure? This will remove all transactions as well.")) {
            removeFriend(id);
        }
    }, [removeFriend]);

    const updateName = () => {
        const trimmedNewName = newName.trim();
        if (!trimmedNewName || trimmedNewName === "") {
            return alert("Name cannot be empty");
        }
        updateFriendName(friend.id, trimmedNewName);
        setNewName(trimmedNewName);
        setEditing(false);
    };

    const handleNameUpdate = (e) => {
        setNewName(e.target.value);
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();
        updateName();
    };

    return (
        <Grid
            container
            gap="8px"
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
                <Grid
                    item
                    xs
                    gap="8px"
                    container
                    wrap="nowrap"
                    alignItems="center"
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

                    {editing ? (
                        <form
                            style={sxForm}
                            onSubmit={handleNameSubmit}
                        >
                            <TextField
                                autoFocus
                                autoComplete="false"
                                autoCapitalize="false"
                                autoCorrect="false"
                                value={newName}
                                onChange={handleNameUpdate}
                                size="small"
                            />
                            <IconButton
                                type="submit"
                            >
                                <Check />
                            </IconButton>
                            <IconButton
                                onClick={() => setEditing(false)}
                            >
                                <Clear />
                            </IconButton>
                        </form>
                    ) : (
                        <b>{friend.name}</b>
                    )}
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
                    <IconButton onClick={() => setEditing(true)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => onRemoveFriend(friend.id)}
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            )}
        </Grid>
    );
};

export default FriendListItem;
