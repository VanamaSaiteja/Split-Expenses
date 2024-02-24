import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const initialState = {
    mode: "dark",
};

const AppContext = createContext(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within a AppProvider");
    }
    return context;
};

function AppProvider({ children }) {
    const [state, setState] = useState(initialState);

    useEffect(() => {
        const theme_mode = localStorage.getItem("theme_mode");

        if (theme_mode) {
            setState((s) => ({
                ...s,
                mode: theme_mode,
            }));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme_mode", state.mode);
    }, [state.mode]);

    const toggleThemeMode = useCallback(() => {
        setState({
            ...state,
            mode: state.mode === "light" ? "dark" : "light",
        });
    }, [state]);

    const value = useMemo(
        () => ({
            mode: state.mode,
            toggleThemeMode: toggleThemeMode,
        }),
        [state, toggleThemeMode]
    );

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export default AppProvider;
