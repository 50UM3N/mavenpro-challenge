import React from "react";
import RatingCard from "./RatingCard";
const RatingCardRow = ({ imageColumn, handleRating }) => {
    return (
        <div className="img-row">
            {imageColumn.map((item) => (
                <RatingCard
                    key={item.id}
                    image={item.url}
                    handleRating={handleRating}
                />
            ))}
        </div>
    );
};

export default RatingCardRow;
