import React from "react";
const RatingCard = ({ image }) => {
    return (
        <div className="img-col">
            <div className="image-wrapper">
                <img src={image} alt="Brand Logo" />
            </div>
            <div className="rating">
                <i data-idx="1" className="rating__star star regular"></i>
                <i data-idx="2" className="rating__star star regular"></i>
                <i data-idx="3" className="rating__star star regular"></i>
                <i data-idx="4" className="rating__star star regular"></i>
                <i data-idx="5" className="rating__star star regular"></i>
            </div>
        </div>
    );
};

export default RatingCard;
