import { Theme } from "@mui/material";

import Buttons from './Buttons';
import Tab from './Tab';

const Overrides = (theme) => {
    return Object.assign(
        Buttons(theme),
        Tab(theme)
    );
};

export default Overrides;
