import React from "react";
import "./topReview.scss";
import {
    ABitLargeSize,
    ABitSmallSize,
    LargerSize,
    SmallSize,
    TrueToSize,
} from "./Size";

// Placeholder components for icons
const StarOutlinedIcon = () => <span>★</span>;
const StarHalfOutlinedIcon = () => <span>☆</span>;
const StarOutlineIcon = () => <span>☆</span>;

// Placeholder components for size fit
// const SmallSize = () => <span>Smaller</span>;
// const ABitSmallSize = () => <span>A Bit Small</span>;
// const TrueToSize = () => <span>True to Size</span>;
// const ABitLargeSize = () => <span>A Bit Large</span>;
// const LargerSize = () => <span>Larger</span>;

// Placeholder WriteReview component
const WriteReview = () => (
    <button
        className="writeReviewBtn"
        style={{
            color: "white",
            background: "black",
            width: "320px",
            height: "50px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "5px", // Add rounded corners
            border: "1px solid black",
        }}
    >
        Write a Review
    </button>
);

const TopReview = () => {
    return (
        <div className="topLineReview">
            <div className="container">
                <div className="container_review">
                    {/* "Reviews" on the top left */}
                    <div className="topLineReview_text">Reviews</div>

                    <div className="topLineReview_rating">
                        <div className="topLineReview_rating_first">
                            {/* "3.5" with stars */}
                            <div className="topLineReview_rating_first_text">3.5</div>
                            <div className="topLineReview_rating_first_star">
                <span>
                  <StarOutlinedIcon />
                </span>
                                <span>
                  <StarOutlinedIcon />
                </span>
                                <span>
                  <StarOutlinedIcon />
                </span>
                                <span>
                  <StarHalfOutlinedIcon />
                </span>
                                <span>
                  <StarOutlineIcon />
                </span>
                            </div>
                        </div>
                        {/* "Based on 41 Reviews" */}
                        <div className="topLineReview_rating_second">Based on 41 Reviews</div>
                    </div>

                    {/* "Fits true to size" */}
                    <div className="topLineReview_size">
                        <div className="topLineReview_size_text">Fits true to size</div>
                        {/* "Smaller...Larger" */}

                        <div className="topLineReview_size_sizeRating">
                            <div className="topLineReview_rating_second">
                                Smaller
                            </div>
                            <SmallSize />
                            <ABitSmallSize />
                            <TrueToSize />
                            <ABitLargeSize />
                            <LargerSize />
                            <div className="topLineReview_rating_second">
                                Larger
                            </div>
                        </div>

                    </div>

                    {/* "Write a Review" on the right */}
                    <WriteReview />
                </div>
            </div>
        </div>
    );
};

export default TopReview;
