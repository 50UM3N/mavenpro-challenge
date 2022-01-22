import React from "react";
import RatingStar from "./RatingStar";
const RatingCard = ({ image, handleRating }) => {
    const giveRating = (rate) => {
        let name = image.split("/").pop().split(".")[0].replace(/%20/g, " ");
        handleRating(name, rate);
    };
    return (
        <div className="img-col">
            <div className="image-wrapper">
                <img src={image} alt="Brand Logo" />
            </div>
            <RatingStar giveRating={giveRating} />
        </div>
    );
};

export default RatingCard;
