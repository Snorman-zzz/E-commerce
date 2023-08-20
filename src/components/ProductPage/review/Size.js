import {Box, Tooltip} from "@mui/material";

export const SmallSize = () => {
    return (
        <Tooltip title="Small">
            <span>
                <Box m={0.5} sx={{width: "18px", height: "5px", bgcolor: "#D5D5D5"}}></Box>
            </span>
        </Tooltip>
    );
}

export const ABitSmallSize = () => {
    return (
        <Tooltip title="A bit small">
            <span>
                <Box m={0.5} sx={{width: "18px", height: "5px", bgcolor: "#D5D5D5"}}></Box>
            </span>
        </Tooltip>
    );
}


export const TrueToSize = () => {
    return (
        <Tooltip title="TrueTosSize">
            <span>
                <Box m={0.5} sx={{width: "18px", height: "5px", bgcolor: "#000000"}}></Box>
            </span>
        </Tooltip>
    );
}

export const ABitLargeSize = () => {
    return (
        <Tooltip title="A bit Large">
            <span>
                <Box m={0.5} sx={{width: "18px", height: "5px", bgcolor: "#D5D5D5"}}></Box>
            </span>
        </Tooltip>
    );
}



export const LargerSize = () => {
    return (
        <Tooltip title="Large">
            <span>
                <Box m={0.5} sx={{width: "18px", height: "5px", bgcolor: "#D5D5D5"}}></Box>
            </span>
        </Tooltip>
    );
}
