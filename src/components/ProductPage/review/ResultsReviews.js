import React, { useState } from "react";
import "./review.scss";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ForumIcon from "@mui/icons-material/Forum";

export const ResultsReviews = () => {
    // Sample hard-coded reviews data
    const reviews = [
        {
            id: 1,
            name: "John Doe",
            rating: 4,
            title: "Great Product!",
            des: "This productDetails exceeded my expectations.",
            UsualSize: "UsualSize: M",
            SizePurchased: "SizePurchased: L",
        },
        // {
        //     id: 2,
        //     name: "Jane Smith",
        //     rating: 5,
        //     title: "Excellent Quality",
        //     des: "I love the quality of this productDetails. Highly recommended!",
        //     UsualSize: "UsualSize: M",
        //     SizePurchased: "SizePurchased: S",
        // },
    ];

    const sortOptions = [
        "Most Recent",
        "Most Helpful",
        "Highest to Lowest Rating",
        "Lowest to Highest Rating",
    ];

    const [selectedSortOption, setSelectedSortOption] = useState("Most Recent");

    const handleSort = (event) => {
        setSelectedSortOption(event.target.value);
        console.log("Sorting by:", event.target.value);
    };

    return (
        <Box width={1000} height={306.19} marginTop={10} >
            {/* "Sorted by: " and the dropdown menu */}
            <div className="review_header" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <span style={{ marginRight: "10px" }}>Sorted by:</span>
                <select
                    value={selectedSortOption}
                    onChange={handleSort}
                    style={{
                        minWidth: 100,
                        // appearance: "none",
                        border: "none",
                        // padding: "5px 25px 5px 5px",
                        background: "transparent",
                        color: "black",
                        outline: "none",
                        cursor: "pointer",
                        width:"100px",
                        fontWeight:"600"
                    }}
                >
                    {sortOptions.map((option, index) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <Box className="reviewStyle">
                {reviews &&
                    reviews.map((item) => {
                        return (
                            <Card
                                sx={{ m: "20px" }}
                                key={item.id}
                                style={{ marginRight: 0, marginLeft: 0, }}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            sx={{
                                                bgcolor: "#57585B",
                                                width: 30,
                                                height: 30,
                                            }}
                                            aria-label="recipe"
                                        >
                                            {item.name.charAt(0)}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings" style={{ display: "none" }}>
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={
                                        <>
                                            {/* Display the star icons based on the rating */}
                                            {Array.from(Array(item.rating), (e, i) => (
                                                <span key={i}>★</span>
                                            ))}
                                            {Array.from(Array(5 - item.rating), (e, i) => (
                                                <span key={i}>☆</span>
                                            ))}
                                        </>
                                    }
                                    subheader={item.name}
                                />

                                <CardContent>
                                    <Typography
                                        style={{
                                            fontSize: "20px",
                                            fontWeight: "600",
                                            marginTop: "5px",
                                        }}
                                    >
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2">{item.des}</Typography>
                                </CardContent>

                                <CardContent style={{ marginTop: "-10px" }}>
                                    <span>{item.UsualSize}</span>
                                    <span style={{ marginLeft: "20px" }}>
                    {item.SizePurchased}
                  </span>
                                </CardContent>

                                <CardContent style={{ marginTop: "-20px" }}>
                                    <ThumbUpOffAltIcon />
                                    <ForumIcon style={{ marginLeft: "20px" }} />
                                </CardContent>
                            </Card>
                        );
                    })}
            </Box>
        </Box>
    );
};

export default ResultsReviews;
