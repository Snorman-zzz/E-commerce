import React from "react";
import "./review.scss"; // Import the Review styles
import ReviewFilter from "./FilterReviews";
import ResultsReviews from "./ResultsReviews";
import TopReview from "./TopReview";
import { Grid } from "@mui/material";

const Review = () => {
    return (
        <div className="review" style={{ marginTop: 100, marginBottom: 100 }}>
            {/* TopReview on top */}
            <TopReview />

            {/* ReviewFilter on the left */}
            <div className="container">
                {/*<Grid container spacing={3}>*/}
                {/*    <Grid item xs={12} md={6}>*/}
                {/*        <ReviewFilter/>*/}
                {/*    </Grid>*/}
                {/*    <Grid item xs={12} md={6}>*/}
                {/*        <ResultsReviews />*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                <div className='review_filter'>
                    <ReviewFilter/>
                </div>
                <div className='result_Review'>
                    <ResultsReviews />
                </div>
            </div>
        </div>
    );
};

export default Review;
