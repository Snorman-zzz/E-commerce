import React from "react";
import "./ViewMoreProduct.scss";
import AddIcon from '@mui/icons-material/Add';

const ViewMoreProduct = () => {
    return (
        <div className="viewMoreProduct">
            <div className="viewing-info">
                <p>Viewing 60 of 160</p>
            </div>
            <div className="view-more-button">
                <button>
                    <AddIcon style={{color: 'red'}}/> VIEW MORE PRODUCTS
                </button>
            </div>
        </div>
    );
};

export default ViewMoreProduct;
