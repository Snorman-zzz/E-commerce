import React from "react";
import { Box, Card, CardContent, InputBase, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "./review.scss";

const ReviewFilter = () => {
    return (
        <>
            {/* "Filter Review" on the top right */}
            <Box style={{ marginLeft: 5 }}>
                <div className="review_header">
                    <Typography variant="h5" component="h5" pl={1}
                                style={{ paddingLeft: 0, textAlign: "right" }}>
                        Filter Reviews
                    </Typography>
                </div>
            </Box>

            {/* Search box with the size 312x42 */}
            <Box mt={2}>
                <Card
                    sx={{
                        backgroundColor: "#fff",
                        width: "312px",
                        marginBottom: "0.625rem",
                        padding: "0.75rem",
                        border: "1px solid #bbb",
                        borderRadius: "0.25rem",
                        display: "flex",
                        alignItems: "center",
                        // boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <Box display="flex" alignItems="center">
                        {/* Search icon on the left */}
                        <div style={{ padding: "0 16px" }}>
                            <SearchIcon />
                        </div>

                        {/* "Searching..." following the search icon */}
                        <InputBase
                            placeholder="Searching..."
                            inputProps={{ "aria-label": "search" }}
                            fullWidth
                            sx={{
                                color: "inherit",
                                "& .MuiInputBase-input": {
                                    padding: "8px",
                                    transition: "width 0.3s",
                                    width: "100%",
                                },
                            }}
                        />
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default ReviewFilter;
